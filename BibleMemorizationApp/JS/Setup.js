// Setup.js
// Create word bank and drop boxes

// CREATE THE WORD BANK FROM THE VERSE BASED ON THE CHOSEN DIFFICULTY LEVEL
function createWordBank() {
    let gameVerse;

    // Split the verse into chunks based on the difficulty level

    // Level 2 = Medium sized chunks
    if(statsObject.difficultyLevel == "2" && statsObject.mode != "4") {
        verseObject.answerKey = splitTheVerse(Math.ceil(verseObject.text.length/10));
        // Shuffle the array so the word bank is random (does not shuffle verseObject.answerKey)
        gameVerse = JSON.parse(JSON.stringify(verseObject.answerKey));  //deep copy the array so the original is not shuffled
        shuffle(gameVerse);

    }
    // Level 3 = Individual words
    // also used for extra words mode no matter what level was chosen
    else if(statsObject.difficultyLevel == "3" || statsObject.mode == "4") {
        let str = stripPunctuation(verseObject.text);
        verseObject.answerKey = str.split(" ");
        gameVerse = JSON.parse(JSON.stringify(verseObject.answerKey));
        if(statsObject.mode == "4") {    // if extra words mode, add extra words to game verse
            addExtraWords(gameVerse);
        }
        // sorts the array into alphabetical order
        gameVerse.sort(function (a,b) {
            return a.localeCompare(b);
        });
    }
    // Level 1 = Larger chunks 
    else {
        verseObject.answerKey = splitTheVerse(Math.ceil(verseObject.text.length/5));
        // Shuffle the array so the word bank is random (does not shuffle verseObject.answerKey)
        gameVerse = JSON.parse(JSON.stringify(verseObject.answerKey));  //deep copy the array so the original is not shuffled
        shuffle(gameVerse);
    }

    // Create a bubble div with the word/phrase and add it to the html page of the game
    for(let i = 0; i < gameVerse.length; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.setAttribute("draggable", "true");
        // Mouse event handlers
        bubble.addEventListener("dragstart", dragStart);
        bubble.addEventListener("dragend", dragEnd);
        // Touch event handlers
        bubble.addEventListener("touchstart", touchDragStart);
        bubble.addEventListener("touchmove", touchDragMove);
        bubble.addEventListener("touchend", touchDrop)
        // add the text to the bubble
        bubble.textContent = gameVerse[i];
        // add the bubble to the word bank
        document.getElementById("wordBank").appendChild(bubble);
    }
}

// SPLITS VERSES UP INTO CHUNKS OF SIZE CHARNUM AND RETURNS AN ARRAY OF THE PIECES 
// Splits verse at the spaces so that words are not broken up between bubbles
function splitTheVerse(charNum) {
    let start = 0;
    let end = 0;
    let endOfString = 0;
    let verseArray = [];

    while(true){
        end = start+charNum;
        while(verseObject.text.charAt(end) != " ") {
            if(end > verseObject.text.length) {
                end = verseObject.text.length;
                endOfString = 1;
                break;
            }
            end++;
        }
        verseArray.push(verseObject.text.slice(start, end));
        start = end+1;
        if(endOfString == 1) {
            break;
        }
    }
    return verseArray;
} 

// RANDOMLY SHUFFLES AN ARRAY 
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

// STRIPS THE PUNCTUATION FROM THE VERSE SO THAT THE INDIVIDUAL WORDS DO NOT HAVE PUNCTUATION
function stripPunctuation(str) {
    return str.replace(/[!"#$%&()*+,./:;<=>?@[\]^_`{|}~]/g, ''); 
}

// CHANGES THE ARROWS AS THE WORD BANK IS SCROLLED
function scrolling() {
    let wordBank = document.getElementById("wordBank");
    let maxScroll = wordBank.scrollWidth - wordBank.clientWidth - 1;

    // display left arrow if the user scrolled right
    if(wordBank.scrollLeft != 0) {
        document.getElementById("leftArrow").style.display = "flex";
    }
    // hide left arrow if at the left side of the word bank
    if(wordBank.scrollLeft == 0) {
        document.getElementById("leftArrow").style.display = "none";
    }
    // hide right arrow if at the right side of the word bank
    if(wordBank.scrollLeft >= (maxScroll-1)) {
        document.getElementById("rightArrow").style.display = "none";
    }
    // display right arrow if the user scrolled left
    if(wordBank.scrollLeft < maxScroll) {
        document.getElementById("rightArrow").style.display = "flex"; 
    } 
}

// CHECKS TO SEE IF THE WORD BANK IS SCROLLABLE AND ADD RIGHT ARROW IF NEEDED
// if the window is resized this function is called so it can add or remove the right arrow as needed
function isScrollable() {
    let wordBank = document.getElementById("wordBank");
    let maxScroll = wordBank.scrollWidth - wordBank.clientWidth;
    if(maxScroll != 0) document.getElementById("rightArrow").style.display = "flex"; 
    if(maxScroll == 0) document.getElementById("rightArrow").style.display = "none"; 
}