// Modes.js
// Handles each mode

// Variables
let timer = null;   
let startingTime = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let remainingHours = 0;
let remainingMins = 0;
let remainingSecs = 0;

// Word bank of words that could be chosen as extras for extra word mode
// If words here are also in the verse, they will not appear in the word bank more than once
// Words will only appear in the word bank more than once if they are in the verse more than once (see addExtraWords)
let extraWordBank = ["Son", "children", "God", "Word", "peace", "glory", "therefore", "voice", "gold", "Israel", "time", "love",
                    "city", "know", "might", "power", "day", "fish", "disciple", "apostle", "boat", "sea", "follow", "perfect", "hope", "believe",
                    "gospel", "faith", "Lord", "eternal", "patience", "kindness", "goodness", "holy", "Spirit", "storm", "meditate", "delight", 
                    "come", "wings", "fruit", "brothers", "trials", "rejoice", "Christ", "loved", "loving", "peaceful", "meditating"];

// MODE SWITCH - picks which mode was chosen and does setup for the mode
// Modes 0, 3, and 4 do not need any setup here
function modeSwitch() {
    switch(statsObject.mode) {
        case "1":
            // display the timer
            document.getElementById("timerContainer").style.display = "flex";
            startStopwatch()
            break;
        case "2":
            // display the window that gets the time the user wants for their countdown
            document.getElementById("countdownWindow").style.display = "flex";
            document.getElementById("countdownOverlay").style.display = "block"
            break;
        case "5":
            // hide the reveal answer button
            document.getElementById("revealAnswerButton").setAttribute("hidden","true");
            // make score say attempts: instead of score:
            document.getElementById("scoreLabel").innerHTML = "Attempts:"
            break;
        default:
            break;
    }
}

// ADD RANDOM EXTRA WORDS TO THE SPLIT VERSE
function addExtraWords(verse) {
    let extraWordCount = 0;
    let numExtraWords = Math.ceil(verse.length/3)+2;    // decide how many extra words to put into the verse based on the number of words in the verse
    if(numExtraWords > extraWordBank) numExtraWords = extraWordBank.length; // if extra words required happens to be longer than the word bank, then use the whole word bank
    shuffle(extraWordBank); // make the chosen words more random
    for(let i = 0; i < extraWordBank.length; i++) { // find words from the list that are not already in the verse
        if(!verse.includes(extraWordBank[i])) {
            verse.push(extraWordBank[i]);
            extraWordCount++;
            if(extraWordCount == numExtraWords) break;
        }
    }
}

// START COUNTDOWN MODE
function startCountdownMode() {
    startingTime = document.getElementById("timeSelect").value;

    // so that the timer shows up right after the button is closed
    remainingHours = Math.floor(startingTime / 3600);
    remainingMins = Math.floor(startingTime / 60);
    remainingSecs = startingTime % 60; 

    displayTimer(remainingHours, remainingMins, remainingSecs);

    // start the actual countdown
    startCountdown();
    document.getElementById("timerContainer").setAttribute("style", "display:flex");
    document.getElementById("countdownWindow").style.display = "none";
    document.getElementById("countdownOverlay").style.display = "none"
}

// STOPWATCH/COUNTDOWN FUNCTIONS

// Displays the timer on the screen (makes it in the format xx:xx:xx so it looks good)
function displayTimer(hours, minutes, seconds) {
    // adds 0 as padding if the number is under 10 (so 09 instead of just 9)
    let h = hours < 10 ? "0" + hours: hours; 
    let m = minutes < 10 ? "0" + minutes: minutes;
    let s = seconds < 10 ? "0" + seconds: seconds;

    document.getElementById("timer").innerHTML = h + ":" + m + ":" + s; 
}

// Runs the stopwatch functionality
function stopwatch() {    
    seconds++;
    if(seconds == 60) {
        seconds = 0;
        minutes++;
        if(minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    displayTimer(hours, minutes, seconds);
}


// Runs the coundown functionality
function countdown() {
    startingTime--;

    remainingHours = Math.floor(startingTime / 3600);
    remainingMins = Math.floor(startingTime / 60);
    remainingSecs = startingTime % 60;

    displayTimer(remainingHours, remainingMins, remainingSecs);

    if (startingTime < 0) showEndGameWindow(true);
}

// Starts the stopwatch
function startStopwatch() {
    if(timer != null ) clearInterval(timer);
    timer = setInterval(stopwatch, 1000);
}

// Starts the countdown timer
function startCountdown() {
    if(timer != null ) clearInterval(timer);
    timer = setInterval(countdown, 1000);
}

// Stop the stopwatch and save value to display on end of game screen
function stopStopwatch() {
    statsObject.timer = document.getElementById("timer").innerHTML;
    clearInterval(timer);
}

// PAUSES AND RESETS THE TIMER/COUNTDOWN
function pauseTimer(pause) {
    // countdown
    if(statsObject.mode == "2") {
        if(pause == true) { // pausing
            clearInterval(timer);
        }
        else {  // restarting
            startCountdown();
        }
    }
    // timer
    else if(statsObject.mode == "1") {
        if(pause == true) { // pausing
            clearInterval(timer);
        }
        else {  // restarting
            startStopwatch();
        }
    }
}