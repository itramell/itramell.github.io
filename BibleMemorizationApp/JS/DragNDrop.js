// DragNDrop.js
// Drag and drop event handlers for touch screen and mouse
// Gameplay logic in Gameplay.js

// SET VARIABLES (FOR TOUCH)
let movingBubble = null;
let stayBubble = null;
let touch = null;

// MOUSE EVENT HANDLERS (DRAG AND DROP EVENT LISTENERS) 

// WHEN AN ELEMENT IS DRAGGED OVER A DROP BOX, THIS PREVENTS THE BROWSER FROM DOING ITS DEFAULT BEHAVIOR    
function dragOver(event) {
    event.preventDefault();
}

// WHEN A BUBBLE STARTS BEING DRAGGED, COPY ITS TEXT CONTENT AND ADD TO beingDragged CLASS
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.textContent)
    event.target.classList.add("beingDragged");
}

// IF A BUBBLE DRAG ENDS WITHOUT IT BEING DROPPED, REMOVE THE BUBBLE FROM beingDragged CLASS
function dragEnd(event) {
    event.target.classList.remove("beingDragged");
}

// HANDLES THE DROP EVENT
function drop(event) {
    event.preventDefault();
    const draggableElement = document.getElementsByClassName("beingDragged");  // get the element being dragged
    const element = draggableElement[0];
    const data = event.dataTransfer.getData("text");    // get the text out of the dragged element

    // If the bubble is incorrect, replace the bubble with new text and allow the box to be regraded
    if(event.target.className =="dropbox incorrect") {
        replaceBubble(event.target);
    }

    event.target.innerHTML = data;    // add bubble text into drop box

    // make the element non-draggable and hide it from the word bank
    element.setAttribute("draggable", "false");
    element.setAttribute("hidden", "true");

    // Correctness checking
    let id = event.target.id;
    let newID = event.target.id;
    // if correct
    if((statsObject.mode != "3" && data == verseObject.answerKey[id])
        || (statsObject.mode == "3" && data == verseObject.answerKey[verseObject.answerKey.length - id - 1])) {
        // set element class to correct
        let correctBox = document.getElementById(id);
        isCorrect(correctBox, id, newID, element);

        // remove event listeners so other things cannot be added to the box
        event.target.removeEventListener("dragover", dragOver);
        event.target.removeEventListener("drop", drop);
    }

    // if incorrect
    else {
        setIncorrectBox(id, element);
    }
    element.classList.remove("beingDragged");
} 

// TOUCH SCREEN EVENT HANDLERS (TOUCH EVENT LISTNERS)

// HANDLES THE START OF THE DRAG EVENT
function touchDragStart(event) {
    touch = event.targetTouches[0];
    // set the bubble that is going to remain in the bank
    stayBubble = event.target;

    // create the bubble that will move with the drag
    movingBubble = document.createElement("div");

    movingBubble.textContent= stayBubble.textContent;
    movingBubble.classList.add("bubble");

    movingBubble.classList.add("beingDraggedWithTouch");

    // set up the bubble that will move
    movingBubble.style.left = touch.pageX-25 + 'px';
    movingBubble.style.center = touch.pageY-25 + 'px';
    movingBubble.style.opacity = 0.5;

    // put the bubble that moves onto the screen
    document.getElementById("wordBank").appendChild(movingBubble);

    event.preventDefault();
}

// MOVE THE BUBBLE WITH THE TOUCH
function touchDragMove(event) {
    touch = event.targetTouches[0];

    movingBubble.style.left = touch.pageX-25 + 'px';
    movingBubble.style.top = touch.pageY-25 + 'px';

    event.preventDefault();
}

// DROP THE BUBBLE
function touchDrop(event) {
    let box = document.getElementsByClassName("dropbox")[0];
    let boxRectangle = box.getBoundingClientRect();
    
    // check to see if the bubble is over the dropbox
    var overlap = overlappingBox(boxRectangle, touch);
  
    if(overlap) {
        box.innerHTML = movingBubble.textContent;
        stayBubble.setAttribute("hidden", "true");

        // replace functionality
        if(box.className =="dropbox incorrect") {
            replaceBubble(box);
        }

        let id = box.id;
        let newID = box.id;

        // if correct
        if((statsObject.mode != "3" && movingBubble.textContent == verseObject.answerKey[id])
        || (statsObject.mode == "3" && movingBubble.textContent == verseObject.answerKey[verseObject.answerKey.length - id - 1])) {
                isCorrect(box, id, newID, stayBubble);
        }
        // if incorrect
        else {
            setIncorrectBox(id,stayBubble);
        }
    }
    // remove the bubble that was dragged so there is not a duplicate bubble
    movingBubble.classList.remove("beingDraggedWithTouch");
    movingBubble.remove();
}

