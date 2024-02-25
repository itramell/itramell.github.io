// Main.js
// Initializes objects, handles difficulty levels and modes, and scrolling 

// VERSE OBJECT 
// contains reference of verse, the text of verse, and the answer key array that contains the broken up array in order
var verseObject = {
    ref: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life",
    answerKey: [],
}

// STATES OBJECT
// contains the difficulty level, the mode, the score, and the result of the timer
// Mode 0 = Default
// Mode 1 = Time Track
// Mode 2 = Countdown
// Mode 3 = Reverse
// Mode 4 = Extra Words
// Mode 5 = Sudden Death
var statsObject = {
    difficultyLevel: "2",
    mode: "0",
    score: 0,
    timer: 0,
}

// CALLS ALL SCRIPTS FOR GAME.HTML TO SETUP THE PAGE
function scripts() {
    setupEventListeners();  // Sets up all of the event listeners
    getDifficultyLevel(); // Very important - gets difficulty level from storage for the gameplay
    getMode();  // get the mode the game is to be played in
    createWordBank(); // creates the word bank
    scoreTracker("scoreTracker"); // Set up score tracker
    isScrollable(); // if the wordBank is scrollable, show right arrow
}

// SETS UP EVENT LISTENERS FOR THE GAME PAGE
function setupEventListeners() {
    // set up the first dropbox to listen for drop events
    document.getElementById("0").addEventListener("dragover", dragOver);
    document.getElementById("0").addEventListener("drop", drop);

    // Prevent the play area from scrolling when dragging bubbles
    document.getElementById("playArea").addEventListener("dragover", dragOver); 
    // if the word bank is scrolled, show/hide arrows
    document.getElementById("wordBank").addEventListener("scroll", scrolling);  
    // if the window is resized, check again to see if the area is scrollable
    window.addEventListener("resize", isScrollable); 

}

// SET INITIAL SETTINGS THAT SETS THE INITIAL DIFFICULTY AND THE INITAL MODE
function setInitialSettings() {
    setInitialDifficulty();
    setInitialMode();
    // keeps text from being selected (highlighted) on game page
    if(document.getElementById("gameplayPage")) {
        window.addEventListener("selectstart", function(event) {
            event.preventDefault();
        });
    }
}

// UPDATES difficultyLevel IN statsObject TO SELECTED DIFFICULTY
function setDifficulty(val) { // val must be a string for this to work with sessionStorage.
    statsObject.difficultyLevel = val;
    sessionStorage.removeItem("level");
    sessionStorage.setItem("level", val);
    // Checks if we are on the options page to set the current difficulty description
    if(document.URL.includes("Options.html")) {
        setDifficultyDescription();
    }
}

// UPDATE DIFFUCULTY DESCRIPTION
function setDifficultyDescription() {
    // hide the current difficulty description
    const previousDifficulty = document.getElementsByClassName("currentDifficulty");
    previousDifficulty[0].classList.remove("currentDifficulty");  
    // if extra words mode, display the message for extra words mode
    if (statsObject.mode == "4") {
        document.getElementById("extraWordsModeDifficulty").classList.add("currentDifficulty");
    }
    // display the description for the chosen difficulty
    else {
        switch (statsObject.difficultyLevel) {
            case "1":
                document.getElementById("difficultyLevel1").classList.add("currentDifficulty");
                break;
            case "2":
                document.getElementById("difficultyLevel2").classList.add("currentDifficulty");
                break;
            case "3":
                document.getElementById("difficultyLevel3").classList.add("currentDifficulty");
                break;
            default:
                break;
        }
    }    
}

// SETS DIFFICULTY SELECT TO SHOW SELECTED ACROSS PAGES
function setInitialDifficulty() {
    // Checks if the session has already started, if not set the sessionStorage
    if(sessionStorage.getItem("level") == null) {
        sessionStorage.setItem("level", "2");
    }
    else {
        statsObject.difficultyLevel = sessionStorage.getItem("level");
        const $select = document.querySelector('#difficultySelect'); // These lines cause the difficulty select to show proper selection across all pages
        if ($select != null) {                                       // if they have the selection drop-down.
            $select.value = sessionStorage.getItem("level"); 
        }
    }
    // Checks if we are on the options page to set the current difficulty description
    if(document.URL.includes("Options.html")) {
        setDifficultyDescription();
    }
}

// GETS THE DIFFICULTY LEVEL TO SELECTED FOR USE IN ACTUAL GAME
function getDifficultyLevel() {
    statsObject.difficultyLevel = sessionStorage.getItem("level");
}

// UPDATES THE MODES
function setMode(mode) {
    statsObject.mode = mode;
    sessionStorage.removeItem("mode");
    sessionStorage.setItem("mode", mode);
    // Checks if we are on the modes page to set the current mode description
    if(document.URL.includes("Options.html")) {
        setModeDescription();
    }
}

// UPDATES MODE DESCRIPTION
function setModeDescription() {
    // hide the current description
    const previousMode = document.getElementsByClassName("currentMode");
    previousMode[0].classList.remove("currentMode");
    document.getElementById("difficultySelectContainer").removeAttribute("hidden");    
    // display the description for the chosen mode
    switch (statsObject.mode) {
        case "0":
            document.getElementById("defaultDescription").classList.add("currentMode");
            break;
        case "1":
            document.getElementById("timeTrackDescription").classList.add("currentMode");
            break;
        case "2":
            document.getElementById("countdownDescription").classList.add("currentMode");
            break;
        case "3":
            document.getElementById("reversedDescription").classList.add("currentMode");
            break;
        case "4":
            document.getElementById("extraWordsDescription").classList.add("currentMode");
            document.getElementById("difficultySelectContainer").setAttribute("hidden", "true");  // hide difficulty select box
            break;
        case "5":
            document.getElementById("suddenDeathDescription").classList.add("currentMode");
            break;
        default:
            break;
    }
    setDifficultyDescription();
}

// SETS THE INITAL MODE SELECTED FOR THE GAME
function setInitialMode() {
    // Checks if the session has already started, if not set the sessionStorage
    if(sessionStorage.getItem("mode") == null) {
        sessionStorage.setItem("mode", "0");
    }
    else {
        statsObject.mode = sessionStorage.getItem("mode");
        const $select = document.querySelector('#modeSelect'); // These lines cause the mode select to show proper selection across all pages if 
        if ($select != null) {                                 // they have the selection drop-down.
            $select.value = sessionStorage.getItem("mode"); 
        }        
    }
    // Checks if we are on the modes page to set the current mode description
    if(document.URL.includes("Options.html")) {
        setModeDescription();
    }  
}

// RETRIEVES THE MODE FROM SESSION STORAGE AND CALLS MODE SWITCH TO HANDLE THE MODE
function getMode() {
    statsObject.mode = sessionStorage.getItem("mode");
    modeSwitch();
}