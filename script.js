const timerElement = document.getElementById('timer');
const body = document.querySelector('body');
const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const dashMother = document.createElement('div');
const mysvgs = document.querySelectorAll('.mysvg');
let sampleWords = ['apple', 'banana', 'fox', 'trespassing', 'tranquility', 'helpless', 'wizard'];

let timer; // Variable to hold the timer ID
let selectedWord; // Variable to hold the selected word
let count = 0; // Track incorrect guesses

dashMother.classList.add('dashmother');
body.appendChild(dashMother);

// Function to start the timer
function startTimer() {
    let time = 0;
    clearInterval(timer);

    timer = setInterval(() => {
        timerElement.textContent = time;
        time++;

        if (time === 60) {
            clearInterval(timer);
        }
    }, 1000);
}

// Function to reset the game
function resetGame() {
    dashMother.innerHTML = ''; // Clear dashes
    mysvgs.forEach(svg => {
        svg.style.cssText = 'stroke: grey; stroke-width: 1; fill: none;'; // Reset SVG styles
    });
    count = 0; // Reset incorrect guesses count
    timerElement.textContent = ''; // Reset timer display
}

// Function to generate a new word and dashes
function generateWord() {
    resetGame();

    let index = Math.floor(Math.random() * sampleWords.length);
    selectedWord = sampleWords[index];

    for (let j = 0; j < selectedWord.length; j++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('mydashes');
        newDiv.textContent = '_____';
        dashMother.appendChild(newDiv);
    }
    
    console.log(`Selected word: ${selectedWord}`);
}

// Function to handle key presses
function handleKeyPress(e) {
    const letter = e.key.toLowerCase();
    const mydashes = document.querySelectorAll('.mydashes');

    let isGuessCorrect = false;

    for (let k = 0; k < selectedWord.length; k++) {
        if (letter === selectedWord[k]) {
            mydashes[k].textContent = selectedWord[k];
            isGuessCorrect = true;
        }
    }

    if (!isGuessCorrect) {
        count++;
        if (count <= mysvgs.length) {
            mysvgs[count - 1].style.cssText = "stroke-width: 3; stroke: black; fill: red;";
        }

        if (count === mysvgs.length) {
            dashMother.innerHTML = '';
            dashMother.textContent = "Game over! You unfortunately couldn't prevent his hanging.";
            const announce = document.querySelector('.timeannounce');
            announce.textContent = `Your record is: ${timerElement.textContent}`;
            clearInterval(timer);
        }
    }
}

// Event Listeners
button1.addEventListener('click', startTimer);
button2.addEventListener('mousedown', () => {
    generateWord();
    document.addEventListener('keydown', handleKeyPress);
});
