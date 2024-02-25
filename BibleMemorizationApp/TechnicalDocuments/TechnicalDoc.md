# Solid Foundation Javascript Technical Documentation
### Tower building game designed by Iona Tramelli and Jaylyn Henegar 
[Back To Main Page](../README.md)

## Overview
This is the technical documentation for the Javascript used in our activity, Solid Foundation. The Javascript was split into a total of 5 different files to prevent having one long file. Each file has a section where all of the objects, variables, and functions in the file are covered in detail. Each section has its own table of contents listing which functions are located in that file and covered in that section. The Javascript also has comments written in the code to help provide extra clarity as to what the code is doing.

For information about design and styling click [here](./DesignDoc.md)
<br><br>

## Table Of Contents
- [Main.js](#mainjs)
- [Setup.js](#setupjs)
- [Gameplay.js](#gameplayjs)
- [DragNDrop.js](#dragndropjs)
- [Modes.js](#modesjs)
<br><br>

## Main.js
Main.js is the javascript file that handles intitializing objects, event listeners, scripts, and the session storage and descriptions for both difficulty levels and modes
- [Objects](#objects)
    - [verseObject](#verseobject)
    - [statsObject](#statsobject)
- [Functions](#functions)
    - [scripts](#scripts)
    - [setupEventListeners](#setupeventlisteners)
    - [setInitialSettings](#setinitialsettings)
    - [setDifficulty](#setdifficulty)
    - [setDifficultyDescription](#setdifficultydescription)
    - [setInitialDifficulty](#setinitialdifficulty)
    - [getDifficultyLevel](#getdifficultylevel)
    - [setMode](#setmode)
    - [setModeDescription](#setmodedescription)
    - [setInitialMode](#setinitialmode)
    - [getMode](#getmode)
<br><br>

### Objects
 ---  
### verseObject

<ins>Note:</ins> Currently both the ref and text are hardcoded to John 3:16

<ins>Note 2:</ins> This is where the fetched verse should go once connected to the backend and recieving verses from it

- ref: string reference of the memory verse
- text: string text of the memory verse
- answer key: initialized as an empty array that holds the array of verse pieces used for correctness checking
<br><br>

### statsObject
- difficultyLevel: string containing the difficulty level of the game. Set to "2", level 2, by default
    - Level 1 = "1"
    - Level 2 = "2"
    - Level 3 = "3"
- mode: string containing the number of the mode for the game to be played in. Set to "0", default mode, by default
    - Default = "0"
    - Time Track = "1"
    - Countdown = "2"
    - Reverse = "3"
    - Extra Words = "4"
    - Sudden Death = "5"
- score: integer holding the score for the game that is initialized to 0
- timer: timer string in the format "xx:xx:xx" that holds the elapsed or remaining time to be used on the end game screen
<br><br>

### Functions
---
### scripts
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Calls all the functions needed to setup the game so that the function calls do not have to sit in the HTML. 
- Functions called:
    - setupEventListeners: set up all of the event listeners for the page
    - getDifficultyLevel: get the difficulty level for the game to be played in
    - getMode: get the mode for the game to be played int
    - createWordBank: create the word bank for the game
    - scoreTracker: set up the score tracker so it is viewable to the user
    - isScrollable: check to see if the word bank is scrollable and if so, show the right arrow 
<br><br>

### setupEventListeners
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets up dragover and drop event listeners on the first dropbox, dragover event listeners on the play area to prevent scrolling when dragging over the boxes, scroll event listeners on the word bank so the arrows can be shown and hidden, and resize event listeners on the window so if it is resized and the word bank overflows or stop overflowing, the arrows can be shown or hidden. 
<br><br>

### setInitialSettings
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the initial settings for the game. Sets the initial difficulty and the initial mode. Also prevents selection (highlighting) of text as we had unexpected behavior happen when we selected text and dragged it around, messing with game behavior.
<br><br>

### setDifficulty
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The value of the difficulty as a string.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the difficultyLevel in statsObject to be the passed in value and sets the session storage to contain the difficulty level. Any value currently in the session storage is removed and the new item is added. If on the options page, then the difficulty description is set to match the chosen difficulty

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The value must be a string for this to work with session storage. The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages. 
<br><br>

### setDifficultyDescription
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Hides the current difficulty level description and displays the description for the chosen difficulty level. If the mode is extra words mode, mode 4, display the specific message for extra words mode.
<br><br>

### setInitialDifficulty
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the difficulty level so it can be displayed across all pages. If the session storage has not been set, then the session storage is set to the default difficulty level, "2". If the session storage has been set, the the data is retrieved from session storage and the difficulty dropdown is set to display the chosen difficulty level. Checks if we are on the options page to set the current difficulty description to match the chosen difficulty.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages.
<br><br>

### getDifficultyLevel
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Pulls the value for difficulty level out of session storage and sets statsObject.difficultyLevel to that value.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages.
<br><br>

### setMode
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The value for the mode as a string.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the mode in statsObject to be the passed in value and sets the seesion storage to contain the mode value. Any value currently in the session storage is removed and the new item is added. If on the options page, then the mode description is set to match the chosen mode.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages.
<br><br>

### setModeDescription
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Hides the current mode description and displays the description for the  chosen mode. If the mode is extra words mode, mode 4, hides the difficulty select dropdown.
<br><br>

### setInitialMode
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the mode so it can be used across all pages. If the session storage has not been set, then the session storage is set to the default mode, "0". If the session storage has been set, the the data is retrieved from session storage and the mode dropdown is set to display the chosen mode. Checks if we are on the options page to set the current mode description to match the chosen mode.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages.
<br><br>

### getMode
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Pulls the value for mode out of session storage and sets statsObject.mode to be that value. Calls modeSwitch to set up the gameplay based on the chosen mode.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The session storage allows for the data to be persistant across the whole session of the application, so it remains the same between different pages.
<br><br>

## Setup.js
Handles the gameplay setup by preparing the word bubbles and created the word bank.

- [Functions](#functions)
    - [createWordBank](#createwordbank)
    - [splitTheVerse](#splittheverse)
    - [shuffle](#shuffle)
    - [stripPunctuation](#strippunctuation)
    - [scrolling](#scrolling)
    - [isScrollable](#isscrollable)
<br><br>

### createWordBank
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Creates the word bubbles that end up in the word bank on the game page. Starts by spliting up the verse based on the chosen difficulty level. For levels 1 and 2, the verse is split into phrases using splitTheVerse() while for level 3 the verse is split into individual words. The pieces are added as items into the verseObject.answerKey array and gameVerse array. The pieces of the verse, located in the gameVerse array, are shuffled, if the difficulty is level 1 or 2.  While the pieces for level 3, located in the gameVerse array, is sorted alphabetically. Once the verse is split and shuffled or sorted, then each bubble is created using document.createElement("div") to dynamically create the HTML element. The bubbles are given a class of bubble and have the draggable attribute set to true. Event listeners for dragstart, dragend, touchstart, touchmove, and touchend are added to the bubble. The text content for the bubble is set to an item from gameVerse and the bubble is appended onto the HTML page inside of the word bank area. 
<br><br>

### splitTheVerse
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the number of characters for each phrase as charNum.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Splits the verse string into pieces on the character spaces based on the number of characters per phrase. Checks to see if a piece with charNum number of characters ends on a space or not. If it does end on a space, step through the string character by character until a space is reached. Break the string there and append the new piece to an array. Continue until the entire verse is broken up.

<ins>Returns:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;An array holding the pieces of the verse.
<br><br>

### shuffle
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The array to be shuffled.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Shuffles an array by randomly swapping items in the array.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;This is an algorithm based on the Knuth shuffling algorithm that shuffles the array in place. The array passed in as a parameter will be modified.
<br><br>

### stripPunctuation
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The string the punctuation will be stripped from.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Performs regex matching on punctuation characters and replaces them with an empty string.

<ins>Returns:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The string without its punctuation.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;This function is only called when splitting the verse into individual words which prevents "day" and "day," from being treated differently when performing correctness checking. This just helps make the game more accessable to users so they do not have to think about factoring in punctuation.
<br><br>

### scrolling
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Displays and hides the ghost arrows as the word bank is scrolled. Uses the maxScroll (which is scrollWidth - clientWidth - 1), which is the maximum amount the area can be scrolled, to determine where in the area the user has scrolled to. Arrows are displayed if there is overflow in that direction and the user can scroll more in that direction and the arrows are hidden if the word bank has been scrolled all of the way to that side. 
<br><br>

### isScrollable
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Checks to see if the word bank overflows and is able to be scrolled by checking to see if the scrollWidth - clientWidth is not equal to 0. If the result is not equal to 0, then the area is scrollable and the right ghost arrow is displayed. If the result is 0, then the right ghost arrow is hidden.
<br><br>

## Gameplay.js
Handles much of the game logic 

- [Variables](#variables)
    - [maxAttempts](#maxattempts)
- [Functions](#functions) 
    - [scoreTracker](#scoretracker)
    - [displayVerseRef](#displayverseref)
    - [displayVerseText](#displayversetext)
    - [showAnswer](#showanswer)
    - [hideAnswer](#hideanswer)
    - [createNewBox](#createnewbox)
    - [resetGame](#resetgame)
    - [setIncorrectBox](#setincorrectbox)
    - [replaceBubble](#replacebubble)
    - [overlappingBox](#overlappingbox)
    - [isCorrect](#iscorrect)
    - [displayEndTimer](#displayendtimer)
    - [showEndGameWindow](#showendgamewindow)
    - [endGameMessage](#endgamemessage)
<br><br>

### Variables
---
### maxAttempts
&nbsp;&nbsp;&nbsp;&nbsp;Holds the maximum number of attempts, currently 300, for sudden death mode.
<br><br>

### Functions
---
### scoreTracker
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The ID of the div where the score will be displayed.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Displays the score in the div passed in as a parameter. If the mode is 5 (sudden death mode), then only show the score. If the mode is not 5, then show the score out of the number of bubbles in the format score/number of bubbles. The score is displayed by setting the inner HTML of the element with the ID passed as a paramenter.
<br><br>

### displayVerseRef
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The ID of the div where the verse reference is to be displayed.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the inner HTMl of the element with the ID passed as a parameter to the reference of the verse from the verse object.
<br><br>

### displayVerseText
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The ID of the div where the verse text is to be displayed.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets the inner HTMl of the element with the ID passed as a parameter to the text of the verse from the verse object.
<br>
<br><br>

### showAnswer
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Called when the reveal answer button is pressed. Pauses the timer (relevant for modes with a timer) and displays the reveal answer window with the verse reference and text.
<br><br>

### hideAnswer
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Called when the reveal answer window is closed. Resumes the timer (relevant for modes with a timer) and hides the window.
<br><br>

### createNewBox
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the ID for the new box, newID.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Creates a new dropbox and adds it to the play area. A box is created and is put in the class dropbox and the class firstTry. The ID is set to newID and dragover and drop event listeners are set. If the game is playing in reverse mode, mode 3, then the box is prepended to the play area; otherwise, the box is appended. The box is also set to scroll into view which keeps the box in view on the play area even if the play area overflows and becomes scrollable. 
<br><br>

### resetGame
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the ID of the incorrect box.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Resets the game by removing all dropboxes except the first and unhiding all of the bubbles. The first dropbox is reset by removing the words from inside of the box, adding it to the classes dropbox and firstTry, and adding event listeners. All bubbles have the hidden attribute removed and are set back to draggable.

<ins>Note:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;This function is only used in sudden death mode, mode 5, to reset the game after an incorrect guess occurs. 
<br><br>

### setIncorrectBox
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the ID of the incorrect box and the element, the incorrect bubble that was dragged into the box.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Handles the event of an incorrect guess by the user. If the mode is sudden death mode, mode 5, then the number of attempts (score) is increased and displayed on the screen and the game is reset. For all of the other modes, the box that the incorrect bubble was dragged into is added to the class incorrect, allowing for the box to be given the sandy style that indicates incorrect to the user, and removed from the class firstTry since the user is no longer on their first attempt to place the correct word into the box. The dragged bubble is added to the class incorrectBubble which allows it to be replaced.
<br><br>

### replaceBubble
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the current incorrect dropbox where the replacement is going to happen.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Allows the user to replace the words in an incorrect dropbox with a different bubble from the word bank. Removes the class incorrect from dropbox to remove sand styling and gets the incorrect bubble. The incorrect bubble is unhidden so it is shown in the word bank again, set to draggable, and the class incorrectBubble is removed from it. 
<br><br>

### overlappingBox
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts boxRectangle which is the bounds of the current dropbox (from getBoundingClientRect()) and touch which is the current location of the touch on the screen.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Checks to see if the location of the touch is inside of the given location of the dropbox.

<ins>Returns:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;True if the touch is inside of the dropbox and false if not.
<br><br>

### isCorrect
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Takes four parameters. dropbox is the current correct dropbox, id is the id of the correct dropbox, newID is the id of the to-be-created dropbox, and bubble is the correct bubble that has been dragged into the box. 

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Handles the event that the bubble dragged into the current dropbox is correct. If the dropbox is in the class dropbox and the class firstTry, then the user got this correct on the first try. If the mode is not sudden death mode, mode 5, then the score is increased and the new score is displayed on the screen. The dropbox is added to the class correct to allow the correct rock styling to be added to it in order to indicate correctness to the user. If the id of the current dropbox is the same as the length of the answer key, then the user has completed the tower and won the game. If the game mode had a timer, then the timer is stopped and the end time saved. Confetti and the end game window are shown to the user. If the user has not yet completed the tower, then a new dropbox is created. 

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The confetti effect is from an external source found on GitHub since creating and animating confetti was out of scope for this project. https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js is the link to the Javascript file (this link is also in Game.html as a source at the top of the page).
<br><br>

### displayEndTimer
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Shows the timer, either time elapsed or remaing time, on the end game window. Stops the stopwatch and shows the endingTimeContainer on the window. If the mode is countdown mode, mode 2, then show "Remaining Time:" on the window instead of the default "Time:". Adds the time from the timer (stored in statsObject.timer) onto the window.
<br><br>

### showEndGameWindow
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;A boolean called timeOut that is set to true if the game is in countdown mode, mode 2, and time ran out. False otherwise. 

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets up and shows the end game window when the game is over. If the game was played in sudden death mode, mode 5, then the score is changed from the default of "Score:" to "Attempts Taken:". The verse and reference from verseObject are added to the end screen. The end game message is added to the screen and the window and overlay are shown on the page.
<br><br>

### endGameMessage
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;A boolean called timeOut that is set to true if the game is in countdown mode, mode 2, and time ran out. False otherwise. 

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Determines the appropriate end game message for the end game window based on the score for the game. The calculation is the score over the length of the answer key multipled by 100 which is the percent of boxes filled correctly on the first try. If the mode is sudden death mode, mode 5, then, if the max number of attemps was not reached, the percentage is 100 minus 10 multiplied by the number of attempts (the score). If timeOut is set to true, then the end game message is set to "Out of Time!". An encouraging message is displayed on the screen based on the calculated percentage.

<ins>Returns:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The end game message.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;For sudden death mode, mode 5, if the number of attempts is greater than 10, the percentage calculated will be negative. This does not affect the result as the check for the lowest percentage is less than 20 without a minimum. 
<br><br>

## DragNDrop.js
Handles the drag and drop functionality, both mouse events and touch events, for the bubbles and dropboxes.

- [Variables](#variables)
    - [movingBubble](#movingbubble)
    - [stayBubble](#staybubble)
    - [touch](#touch)
- [Functions](#functions) 
    - [dragOver](#dragover)
    - [dragStart](#dragstart)
    - [dragEnd](#dragend)
    - [drop](#drop)
    - [touchDragStart](#touchdragstart)
    - [touchDragMove](#touchdragmove)
    - [touchDrop](#touchdrop)

### Variables
---
### movingBubble
&nbsp;&nbsp;&nbsp;&nbsp;Variable that will hold the movingBubble, which is the ghost bubble that follows the touch during the drag and drop operation, for the touch drag and drop functionality. Initialized to null.
<br><br>

### stayBubble
&nbsp;&nbsp;&nbsp;&nbsp;Variable that will hold the stayBubble, which is the bubble that remains in the word bank while the touch drag and drop operation is happening, for the touch drag and drop functionality. Initialized to null.
<br><br>

### touch
&nbsp;&nbsp;&nbsp;&nbsp;Variable that will hold the touch, which is the touch on the screen from the touch event listeners, for the touch drag and drop functionality. Initialized to null.
<br><br>

### Functions
---
### dragOver
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Prevents the browser from performing its default behavior in a dragover event which allows the dropboxes to have elements dropped in them.

<ins>Notes:</ins>
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with drag/drop event handlers and used for mouse events.
<br><br>

### dragStart
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Called when a dragStart event is fired and handles when a bubble starts being dragged. The data inside of the bubble (the parts of the verse) are copied and the bubble is added to the class beingDragged.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with drag/drop event handlers and used for mouse events.
<br><br>

### dragEnd
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;If the drag ends without the bubble being dropped in a dropbox then the bubble is removed from class beingDragged since it is no longer being dragged. This allows bubbles to return to the word bank if they are not dropped in a dropbox.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with drag/drop event handlers and used for mouse events.
<br><br>

### drop
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Handles the drop event. Gets the bubble that is being dragged and the text from that element. If the dropbox has the classes "dropbox incorrect" (meaning that there is already a bubble in that box and that is was graded as incorrect), call replaceBubble() to allow the bubble inside of the incorrect dropbox to be replaced with the bubble being dropped. Set the innerHTML of the dropbox to be the text from the bubble and hide the bubble in the word bank, making it non-draggable so it appears like it no longer exists in the word bank. Checks for correctness by getting the ID of the dropbox the bubble is being dropped into and then comparing the text at verseObject.answerKy[ID] to the text in the dropbox. If the game is playing in reverse mode, mode 3, then compare the text to verseObject.answerKey[verseObject.answerKey.length - ID - 1] which is what allows that mode to have the user put in the verse backwards and grades it correctly if the first bubble dragged is the last piece of the verse. If the element is found to be correct, isCorrect() is called which sets up the box to be correct and display as correct to the user and the event listeners, dragover and drop, on the dropbox are removed so no more bubbles can be dragged into the dropbox. If the bubble happens to be incorrect, then setIncorrectBox is called which sets up the dropbox to be incorrect and display as incorrect to the user. Lastly, the bubble is removed from the class beingDragged.

<ins>Notes:</ins>
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with drag/drop event handlers and used for mouse events.
<br><br>

### touchDragStart
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Handles the start of a touch drag for a bubble. Get the touch and the bubble that is being touched. Sets that bubble to be stayBubble, which is the bubble that is going to remain in the word bank while the "drag" operation occurs. Creates a new element called movingBubble which is a copy of stayBubble. This is the ghost bubble that is going to follow the touch around the screen that is part of the class beingDraggedWithTouch. Sets the ghost bubble to be at the same location as the touch and set the opacity to 0.5 to make it look like a ghost drag bubble. Appends the movingBubble to the page and prevents the browser from performing its default actions so the whole drag and drop functions properly.

<ins>Notes:</ins>
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with touch event handlers and used for touch events.
<br><br>

### touchDragMove
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Gets the location of the touch and, as it moves across the screen, has the moving bubble follow the touch so it appears to the user like the bubble is being dragged. Prevents the browser from performing its default actions so the whole drag and drop functions properly.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with touch event handlers and used for touch events.
<br><br>

### touchDrop
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;The event from the event listener

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Handles the drop event for touch screens which occurs on the touchEnd event. Gets the current dropbox and the bounds for that dropbox with getBoundingClientRect(). Checks to see if the touch is overlapping with the dropbox. If it is overlapping, the touch is over the dropbox and should be dropped into the dropbox. The text content from the bubble is moved into the dropbox and the stayBubble in the word bank is hidden. If the dropbox's classname is "dropbox incorrect", allow the replace functionality to happen. Checks for correctness by getting the ID of the dropbox the bubble is being dropped into and then comparing the text at verseObject.answerKy[ID] to the text in the dropbox. If the game is playing in reverse mode, mode 3, then compare the text to verseObject.answerKey[verseObject.answerKey.length - ID - 1] which is what allows that mode to have the user put in the verse backwards and grades it correctly if the first bubble dragged is the last piece of the verse. If the element is found to be correct, the isCorrect() is called which sets up the dropbox to be correct and display as correct to the user. If the bubble happens to be incorrect, then setIncorrectBox() is called which sets up the dropbox to be incorrect and display as incorrect to the user. Removes movingBubble from the class beingDraggedWithTouch and removes movingBubble from the page.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Associated with touch event handlers and used for touch events.
<br><br>

## Modes.js
Handles mode specific game functionality (mostly timer related functions).

- [Variables](#variables)
    - [timer](#timer)
    - [startingTime](#startingtime)
    - [seconds](#seconds)
    - [minutes](#minutes)
    - [hours](#hours)
    - [remainingHours](#remaininghours)
    - [remainingMins](#remainingmins)
    - [remainingSecs](#remainingsecs)
    - [extraWordBank](#extrawordbank)
- [Functions](#functions) 
    - [modeSwitch](#modesswitch)
    - [addExtraWords](#addextrawords)
    - [startCountdownMode](#startcountdown)
    - [displayTimer](#displaytimer)
    - [stopwatch](#stopwatch)
    - [countdown](#countdown)
    - [startStopwatch](#startstopwatch)
    - [startCountdown](#startcountdown)
    - [stopStopwatch](#stopstopwatch)
    - [pauseTimer](#pausetimer)

### Variables
---
### timer
&nbsp;&nbsp;&nbsp;&nbsp;The interval ID returned by setInterval used for the timer and countdown. Initialized to null.
<br><br>

### startingTime
&nbsp;&nbsp;&nbsp;&nbsp;The starting time that is set for the countdown. Initialized to 0.
<br><br>

### seconds
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the seconds count for the timer.
<br><br>

### minutes
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the minutes count for the timer.
<br><br>

### hours
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the hours count for the timer.
<br><br>

### remainingHours
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the remaining hours count for the countdown timer.
<br><br>

### remainingMins
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the remaining minutes count for the countdown timer.
<br><br>

### remainingSecs
&nbsp;&nbsp;&nbsp;&nbsp;The variable used for the remaining seconds count for the countdown timer.
<br><br>

### extraWordBank
&nbsp;&nbsp;&nbsp;&nbsp;The array of other words from the Bible that are used as the extra words for extra words mode, mode 4.
<br><br>

### Functions
---
### modeSwitch
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Performs mode specific game setup for modes 1, 2, and 5 (time track mode, countdown mode, and sudden death mode). For time track (mode 1), the timer is displayed underneath the score and the stopwatch is started. For countdown mode (mode 2), the window with the countdown time dropdown and the game screen overlay is shown. For sudden death mode (mode 5), the reveal answer button is hidden and the score label is changed from saying "Score:" to "Attempts:".
<br><br>

### addExtraWords
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;An array of the individual words of the verse that the extra words will be added to.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Selects random words from the extra word bank array that are not already in the verse and add them to the verse array so that they can be added to the word bank. The number of extra words added is determined by taking the ceiling of the length of the verse list divided by three and then adding 2 to that number. Although if this number is somehow longer than the length of the extra word bank array, then all of the words from the bank are added as extras. The extra word bank array is shuffled and looped through until the number of extra words added is reached. Words that were already in the verse are not added into the verse. Words will only appear in the word bank more than once if they are in the verse more than once.
<br><br>

### startCountdownMode
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Sets up the countdown timer. Gets the chosen time from the dropdown menu (options are 30s, 45s, 60s, and 90s) and creates a starting time variable. Starting time is divided up to get the hours, minutes, and seconds from it. The countdown timer is displayed on the screen and the countdown is started. The time select window and overlay are hidden so the game can begin.
<br><br>

### displayTimer
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Accepts the current hours, minutes, and seconds that will be displayed.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Displays the timer or countdown on the gameplay screen. Pads the hours, minutes, and seconds with 0s if the number is under 10 to keep the format of the timer xx:xx:xx. Adds the hours, minutes, and seconds to the HTML of the page in the proper format.
<br><br>

### stopwatch
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Runs the stopwatch. The entire functionality is based on adding 1 to seconds and then checking to see if seconds is equal to 60. If it is, then seconds is reset to 0 and minutes is incremented by 1. If minutes is equal to 60, then minutes is reset to 0 and hours is incremented by one. displayTimer() is called at the end of the function to show the new updated time on the game page.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Runs every second with an interval from setInterval().
<br><br>

### countdown
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Runs the countdown timer. Decrements the startingTime (the entirety of the time to countdown in seconds) and then splits it up into hours, minutes, and seconds. displayTimer() is called to display the remaining time. If the starting time drops below 0, then the end game window appears displaying an out of time message, ending the game.

<ins>Notes:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Runs every second with an interval from setInterval(0).
<br><br>

### startStopwatch
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Starts the stopwatch by setting a one second time interval using setInterval(). If the timer, the ID of the time interval, is already set, clear it out. Set the timer to call stopwatch() every second.
<br><br>

### startCountdown
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Starts the countdown by setting a one second time interval using setInterval(). If the timer, the ID of the time interval, is already set, clear it out. Set the timer to call countdown() every second.
<br><br>

### stopStopwatch
<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Saves the remaining or elapsed time to statsObject.timer (to be used on the end game screen) and clears the interval, stopping the stopwatch/countdown.
<br><br>

### pauseTimer
<ins>Parameters:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;A Boolean, pause, that determines if the timer is being paused or resumed. True means the timer is being paused and false means the timer is being resumed.

<ins>Description:</ins> 
<br>&nbsp;&nbsp;&nbsp;&nbsp;Pauses/resumes the timer. If the mode is countdown mode, mode 2, and the timer is being paused, the interval is cleared using clearInterval(). If the timer is being resumed, startCountdown() is called, restarting the countdown with the saved time in startingTime. If the mode is time track mode, mode 1, and the timer is being paused, the the interval is cleared using clearInterval(). If the timer is being resumed, startStopwatch() is called restarting the timer using the saved values in seconds, minutes, and hours.
