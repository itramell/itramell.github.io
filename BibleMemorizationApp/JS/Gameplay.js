// Gameplay.js
// Gameplay logic
// Drag and drop handlers in DragNDrop.js

// maxAttempts for sudden death mode
let maxAttempts = 300;

// CREATE THE SCORE TRACKER
function scoreTracker(id) {
    if(statsObject.mode == "5") {
        document.getElementById(id).innerHTML = statsObject.score
    }
    else {
        document.getElementById(id).innerHTML = statsObject.score+"/"+verseObject.answerKey.length
    }
}

// DISPLAY VERSE REFERENCE 
function displayVerseRef(id) {
    document.getElementById(id).innerHTML = verseObject.ref;
}

// DISPLAY VERSE TEXT
function displayVerseText(id) {
    document.getElementById(id).innerHTML = verseObject.text;
}

// REVEAL ANSWER WINDOW FUNCTIONS
function showAnswer() {
    pauseTimer(true);
    displayVerseRef("verseRef");
    displayVerseText("verseText");
    document.getElementById("revealAnswerWindow").style.display = "flex";
    document.getElementById("revealAnswerOverlay").style.display = "block";
}
  
function hideAnswer() {
    pauseTimer(false);
    document.getElementById("revealAnswerWindow").style.display = "none";
    document.getElementById("revealAnswerOverlay").style.display = "none"
}

// CREATES THE NEXT DROP BOX FOR THE TOWER
function createNewBox(newID) {
    const box = document.createElement("div");
    box.classList.add("dropbox");
    box.classList.add("firstTry");
    box.setAttribute("id", newID);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("drop", drop);
    if(statsObject.mode != "3") document.getElementById("playArea").prepend(box);
    else document.getElementById("playArea").append(box);
    box.scrollIntoView({behavior: "instant"});
}

// RESETS THE TOWER FOR SUDDEN DEATH MODE  
function resetGame(id) {
// remove all of the additional dropboxes and reset box 0
    for(let i = 0; i<=id; i++) {
        let box = document.getElementById(i);
        if(i != 0) box.remove();
        else if(i == 0) {
            box.innerHTML = "";
            box.className = "";
            box.classList.add("dropbox");
            box.classList.add("firstTry");
            box.addEventListener("dragover", dragOver);
            box.addEventListener("drop", drop);
        }
    }
    // unhide all of the bubbles and make them draggable again
    let bubbles = document.getElementsByClassName("bubble");
    for(let i = 0; i<bubbles.length; i++) {
        if(bubbles[i].hidden == true) {
            bubbles[i].removeAttribute("hidden");
            bubbles[i].setAttribute("draggable", "true");
        }
    }
}

// SETS UP THE INCORRECT BOXES
function setIncorrectBox(id, element) {
    if(statsObject.mode == "5") {   // Sudden Death mode
        // reset the game without loading a new page
        statsObject.score++;
        scoreTracker("scoreTracker");
        // max attempts
        if(statsObject.score > maxAttempts) showEndGameWindow(false);
        resetGame(id);
        return;
    }
    // set the element class to "incorrect"
    let incorrectBox = document.getElementById(id);
    incorrectBox.classList.remove("firstTry");
    incorrectBox.classList.add("incorrect");
    // set the bubble class to incorrectBubble
    element.classList.add("incorrectBubble");
}

// HANDLES REPLACE BUBBLE FUNCTIONALITY
function replaceBubble(box) {
    box.classList.remove("incorrect");
    const wrongElement = document.getElementsByClassName("incorrectBubble");
    wrongElement[0].removeAttribute("hidden");
    wrongElement[0].setAttribute("draggable", "true");
    wrongElement[0].classList.remove("incorrectBubble");
}

// CHECKS TO SEE IF THE TOUCH IS OVER THE DROPBOX
function overlappingBox(boxRectangle, touch) {
    var overlap =!(boxRectangle.right < touch.pageX ||
        boxRectangle.left > touch.pageX ||
        boxRectangle.bottom < touch.pageY ||
        boxRectangle.top > touch.pageY);
    return overlap
}

// ALL CORRECTNESS LOCIG
function isCorrect(dropbox, id, newID, bubble) {
    // check if first try
    if(dropbox.className == "dropbox firstTry" && statsObject.mode!="5") {
        statsObject.score++;
        scoreTracker("scoreTracker");
    }

    // set box to correct
    dropbox.classList.add("correct");

    // check for a win
    if(id == verseObject.answerKey.length-1) {
        scoreTracker("endingScore");
        if(statsObject.mode == "1" || statsObject.mode == "2") displayEndTimer();
        confetti({
            particleCount: 400,
            spread: 200
          });
          showEndGameWindow(false);
    }

    // show the next box
    newID++;
    if(newID < verseObject.answerKey.length) {
        createNewBox(newID, bubble);
    }
}

// DISPLAYS A TIMER ON THE END GAME WINDOW
function displayEndTimer() {
    stopStopwatch();
    document.getElementById("endingTimeContainer").style.display="flex";
    if(statsObject.mode == "2") {
        document.getElementById("timeLabel").innerHTML = "Remaining Time:";
    }
    let endTime = document.getElementById("endingTime");
    endTime.innerHTML = statsObject.timer;
}

// DISPLAYS THE END GAME WINDOW
function showEndGameWindow(timeOut) {
    if(statsObject.mode == "5") document.getElementById("endScoreLabel").innerHTML = "Attempts Taken:"
    displayVerseRef("endVerseRef");
    displayVerseText("endVerseText")
    document.getElementById("gameEndMessage").innerHTML = endGameMessage(timeOut);
    document.getElementById("endGameWindow").style.display = "flex";
    document.getElementById("endGameOverlay").style.display = "block";
}

// PICKS OUT AN END GAME MESSAGE BASED ON THE SCORE
function endGameMessage(timeOut) {
    let percentRight = (statsObject.score/verseObject.answerKey.length) * 100;
    if(statsObject.mode == "5") {   // for sudden death mode (0 attempts = 100%, 1 attempt = 90%, etc)
        if(statsObject.score > maxAttempts) {
            scoreTracker("endingScore");
            return "Out of Attempts!";
        }
        percentRight = 100 - 10 * statsObject.score;    
    }
    if(timeOut) {   // if countdown mode timer runs out of time
        scoreTracker("endingScore");
        return "Out of Time!";
    }
    else if(percentRight < 20) {
        return "Keep Going!";
    }
    else if(percentRight < 40) {
        return "Nice Effort!";
    }
    else if(percentRight < 60) {
        return "Great Progress!";
    }
    else if(percentRight < 80) {
        return "Amazing Work!";
    }
    else if(percentRight < 100) {
        return "Awesome Job!";
    }
    else return "Nailed It!!";
}