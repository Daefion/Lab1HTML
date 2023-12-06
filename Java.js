
const openmodalButtons = document.querySelectorAll('[data-modal-target]')
const closemodalButtons = document.querySelectorAll('[data-closemodal]')
const overlay = document.getElementById('overlay')

openmodalButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        const modal = document.querySelector(button.dataset.modalTarget)
        openmodal(modal)
        
    })
})

closemodalButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        const modal = button.closest('.modal')
        closemodal(modal)
    })
})

function openmodal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closemodal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

/*Game code */


/* Test Sprite*/
var startBtn = document.getElementById('startBtn');
var restartBtn = document.getElementById('restartBtn');
var currentButtonIndex = 0; // Initial button index
var columns = 3; // Number of columns in the grid
var keyIsPressed = false; // Flag to track whether a key is currently being pressed
const pauseBtn = document.getElementById("pauseBtn");
var ele = document.getElementById('timer')
var sprite = this.document.getElementById('sprite');
var star =document.getElementById('star');
var ptc = document.getElementById('PTC')
var clock = document.getElementById('clock')

var isPaused = true;
const startingMinutes = 1;
let time = startingMinutes * 60;
var t = window.setInterval(function() {
    if(!isPaused) {
      
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
  
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      ele.innerHTML = `${minutes} : ${seconds}`;
      time--;
    }
    if (time < 0) {
        // Time is up, reset the game
        EndGame();
    }
},1000);

let score = 0;

function Score() {
    if (star.currentButtonIndex === currentButtonIndex) {
        score += 50;
        updateStarPosition(star); 
    }
    if (clock.currentButtonIndex === currentButtonIndex && clock.style.visibility == 'visible'){
        time+=5;
        clock.style.visibility = 'hidden';
    }
    
    ptc.innerHTML = `Pontuação: ${score}`;
}

function EndGame() {
    currentButtonIndex = 0;
    score = 0;
    time = startingMinutes * 60;
    isPaused = true;

    
    updateSpritePosition();
    ptc.innerHTML = `Pontuação: ${score}`;
    ele.innerHTML = `${startingMinutes}:00`;

    // Hide and show elements
    sprite.style.visibility = 'hidden';
    star.style.visibility = 'hidden';
    clock.style.visibility = 'hidden';
    startBtn.style.visibility = 'visible';
    restartBtn.style.visibility = 'hidden';
    pauseBtn.innerHTML = 'Pause';

}

/*
var Sred = document.getElementById('Sred');
var Sdef = document.getElementById('Sdef');
var Sblue = document.getElementById('Sblue');

var Rbtn = document.getElementById('SbtnR')
var Dbtn = document.getElementById('SbtnD')
var Bbtn = document.getElementById('SbtnB')*/

document.getElementById('startBtn').addEventListener('click', function () {
    currentButtonIndex = 0; // Set the initial button index to 0
    updateSpritePosition();
    sprite.style.visibility = 'visible';
    star.style.visibility = 'visible';
    star.style.zIndex = '998'; // Show the sprite when the Start button is clicked
    sprite.style.zIndex = '999'; // Ensure the sprite is on top
    startBtn.style.visibility = 'hidden';
    restartBtn.style.visibility = 'visible';
    isPaused=false;
    updateStarPosition(star);
});


document.getElementById('restartBtn').addEventListener('click', function () {
    currentButtonIndex = 0; // Set the initial button index to 0
    updateSpritePosition();
    updateStarPosition(star);
    time=60;
    score=0;
    Score();
});


 document.getElementById('pauseBtn').addEventListener('click', function (){
    pauseBtn.innerHTML = "UnPause";
    isPaused=true;
    
});

document.getElementById('pauseBtn').addEventListener('dblclick', function (){
    pauseBtn.innerHTML = "Pause";
    isPaused=false;
    
});


/*
Rbtn.addEventListener('click', function(){
    sprite.src = 'sprites/idleR.png';
});

Dbtn.addEventListener('click', function(){
    sprite.src = 'sprites/idle.png';
});

Bbtn.addEventListener('click', function(){
    sprite.src = 'sprites/idleB.png';
});
*/



document.addEventListener('keydown', function (event) {
    if (!keyIsPressed) {
        keyIsPressed = true;
        handleKeyPress(event);
    }
});

document.addEventListener('keyup', function () {
    keyIsPressed = false;
});




function handleKeyPress(event) {
    var buttons = document.getElementsByClassName('button-option');
    var buttonCount = buttons.length;

    var newButtonIndex;

    switch (event.key) {
        case 'w':
            newButtonIndex = currentButtonIndex - columns;
            break;
        case 'a':
            newButtonIndex = currentButtonIndex - 1;
            break;
        case 's':
            newButtonIndex = currentButtonIndex + columns;
            break;
        case 'd':
            newButtonIndex = currentButtonIndex + 1;
            break;
    }

    // Check if the new button index is within the valid range and if there is a button at the new index
    if (isValidMove(currentButtonIndex, newButtonIndex, buttonCount, buttons)) {
        currentButtonIndex = newButtonIndex;
        updateSpritePosition();
    }

    
}

function isValidMove(currentIndex, newIndex, buttonCount, buttons) {
    // Check if the new index is within the valid range
    if (newIndex >= 0 && newIndex < buttonCount) {
        var currentRow = Math.floor(currentIndex / columns);
        var newRow = Math.floor(newIndex / columns);
        var currentCol = currentIndex % columns;
        var newCol = newIndex % columns;

        // Check if the move is within the same row or column
        if (currentRow === newRow || currentCol === newCol) {
            // Check if there is a button at the new index
            if (!buttons[newIndex].classList.contains('occupied')) {
                return true;
            }
        }
    }

    return false;
}


function updateSpritePosition() {
    var button = document.getElementsByClassName('button-option')[currentButtonIndex];
    var buttonRect = button.getBoundingClientRect();

    // Center sprite on the button
    sprite.style.top = buttonRect.top + (buttonRect.height - sprite.clientHeight) / 2 + 'px';
    sprite.style.left = buttonRect.left + (buttonRect.width - sprite.clientWidth) / 2 + 'px';

    Score();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateStarPosition(star) {
    var newStarButtonIndex;

    do {
        newStarButtonIndex = getRandomIntInclusive(0, 8);
        if (Math.random() < 0.02) {
            updateClockPosition(clock);
            clock.style.zIndex = '998';
            clock.style.visibility = 'visible';
        }
    }while (newStarButtonIndex === currentButtonIndex);

    star.currentButtonIndex = newStarButtonIndex;

    var starButton = document.getElementsByClassName('button-option')[newStarButtonIndex];
    var starButtonRect = starButton.getBoundingClientRect();




    star.style.top = starButtonRect.top + (starButtonRect.height - star.clientHeight) / 2 + 'px';
    star.style.left = starButtonRect.left + (starButtonRect.width - star.clientWidth) / 2 + 'px';
}

function updateClockPosition(clock) {
    var newClockButtonIndex;

    do {
        newClockButtonIndex = getRandomIntInclusive(0, 8);
    } while (newClockButtonIndex === currentButtonIndex );


    clock.currentButtonIndex = newClockButtonIndex;

    var clockbutton = document.getElementsByClassName('button-option')[newClockButtonIndex];
    var clockbuttonRect = clockbutton.getBoundingClientRect();

    // Center sprite on the button
    clock.style.top = clockbuttonRect.top + (clockbuttonRect.height - clock.clientHeight) / 2 + 'px';
    clock.style.left = clockbuttonRect.left + (clockbuttonRect.width - clock.clientWidth) / 2 + 'px';


}






