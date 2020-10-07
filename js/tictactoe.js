//JS page 255

// keep track of player turn
let activePlayer = "X";
// store an array of moves, used to see win condition
let selectedSquares = [];

//function for placing and X or O in square
function placeXOrO (squareNumber) {
    // this condition ensures a sqaure has not been selected
    // .some() method is to check each element of the selected square to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this receives the HTML element that was clicked
        let select = document.getElementById(squareNumber);
        //sees whos turn it is and sets the image that corrisponds to who turn it is
        if (activePlayer === "X") {
            select.style.backgroundImage = 'url("images/x2.png")';
        } else {
            select.style.backgroundImage = 'url("images/o2.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //this calls function to check win condition
        checkWinConditions ();
        //this condition is for changing active player
        if (activePlayer === "X") {
            activePlayer = "O";
        } else {
            activePlayer = "X";
        }
        
        //this plays the placement sound
        audio('./media/place2.mp3');
        //this checks to see if its the other players turn(the computer)
        if(activePlayer === "O") {
            //disables clikcing while the computer takes their turn
            disableClick();
            //this waits one second before placing image for computer turn
            setTimeout(function (){ computersTurn(); }, 1000);
        }
        //to return true is needed for computerturn to work
        return true;


    }
    //this function selects a randome sqaure to fill
    function computersTurn() {
        let success = false;
        //stores a randome variable 0-8
        let pickASquare;
        //allows while to to keep trying of the selected number is already chosen
        while(!success) {
            //randome number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if returns true, then square has not been selected
            if (placeXOrO(pickASquare)) {
                //this calls the function
                placeXOrO(pickASquare);
                //this changes the boolean and ends the loop
                success = true;
            };
        }
    }
}

//this function parses the selectedSquares array to seach for win conditions.
//drawWinLine function is called to draw a line if the condition is met.
function checkWinConditions() {
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100);}
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304);}
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508);}
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558);}
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558);}
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558);}
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90);}
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520);}
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100);}
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304);}
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508);}
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558);}
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558);}
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558);}
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90);}
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520);}
    //this function is for a tie if all squares are selected and no winner
    else if (selectedSquares.length >= 9) {
        //plays the tie sound
        audio('./media/tie2.mp3');
        //sets a second timer before resetGame() is called
        setTimeout(function () { resetGame(); }, 1000)
    }

    //checks to see if an array includes 3 strings
    //it is used to check for each win cinditoon form above
    function arrayIncludes(squareA, squareB, squareC) {
        //set variables to see win condition
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included int he our array true statment,
        //and if the else if condition executes, the drawWinLine function will start.

        if (a === true && b === true && c === true) {return true;}
    }
}

//this function makes the body element temp unclickable
function disableClick() {
    //this dissables clicking in body
    body.style.pointerEvents = 'none';
    //makes  a seocnd timer and allows clicking again after that second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
//this function takes a string parameter of the path set earlier for placment sound
function audio(audioURL) {
    //creating a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays our audio sound
    audio.play();
}
//this uses the canvas to daw a line
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //gives access to the canvas hmtl element
    const canvas = document.getElementById('win-lines');
    //gives access to properties and methods for canvas
    const c = canvas.getContext('2d');
    //where to start line x axis
    let x1 = coordX1,
        //where to start line y axis
        y1 = coordY1,
        //wehre to end x
        x2 = coordX2,
        //where to end y
        y2 = coordY2,
        //sets a temp x and y axis and update in animation loop
        x = x1,
        y = y1;

    //this function interacts with canvas
    function animateLineDrawing() {
        //variable  creates loop for when the games ends it restarts.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //cleas content for next loop
        c.clearRect(0, 0, 608, 608);
        //starts a new path
        c.beginPath();
        //moves a string line from start to end
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        //sets width of line
        c.lineWidth = 10;
        //color of line
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        //this daws the line
        c.stroke();
        //this checks to see if we reached the end point
        if (x1 <= x2 && y1 <= y2) {
            //adds 10 the previous x and y points
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            //cancels animation if reach the end points
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        //this is set for the other diagonal win condition (6, 4, 2)
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }

    }

    //this function clears the canvas after a win
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    //turns off clicking during win sound playing
    disableClick();
    //win sound
    audio('./media/winGame2.mp3');
    //calls the animation for line
    animateLineDrawing();
    //resets game and allows for clicking again
    setTimeout(function () { clear(); resetGame(); }, 1000);

}

//this function resets the game
function resetGame() {
    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //gets html element of i
        let square = document.getElementById(String(i));
        //removes the background images
        square.style.backgroundImage = '';
    }
    //this resets the array so it is empty again.
    selectedSquares = [];
}