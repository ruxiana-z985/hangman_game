const timerElement = document.getElementById('timer');
const body = document.querySelector('body');
const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const dashMother = document.createElement('div');
const div = document.querySelectorAll('div');

dashMother.classList.add('dashmother');
body.appendChild(dashMother);
let sampleWords = ['apple', 'banana', 'fox', 'trespassing', 'tranquility', 'helpless', 'wizard'];

let timer; // Variable to hold the timer ID
let selectedWord; // Variable to hold the selected word

button1.addEventListener('click', function () {
    let time = 0;

    // Clear any existing timer
    clearInterval(timer);

    timer = setInterval(() => {
        timerElement.textContent = time;
        time++;

        if (time === 60) {
            clearInterval(timer);
        }
    }, 1000);
});

button2.addEventListener('click', function () {
    // Clear dashes
    dashMother.innerHTML = ''; // More efficient than looping through all divs

    // Clear existing timer when generating a new word
    clearInterval(timer);
    timerElement.textContent = ''; // Reset the timer display

    // Randomly select a new word
    let index = Math.floor(Math.random() * sampleWords.length);
    selectedWord = sampleWords[index]; // Store the selected word

    // Generate dashes for the selected word
    for (let j = 0; j < selectedWord.length; j++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('mydashes');
        newDiv.textContent = '_____';
        dashMother.appendChild(newDiv);
    }

    const mydashes = document.querySelectorAll('.mydashes');

    // For debugging: Display the selected word in the console
    console.log(`Selected word: ${selectedWord}`);

    document.addEventListener('keydown', function (e) {
        const letter = e.key.toLowerCase(); // Get the pressed key and convert to lowercase

        // Check if the letter is in the selected word
        for (let k = 0; k < selectedWord.length; k++) {
            if (letter === selectedWord[k]) {
                mydashes[k].textContent = selectedWord[k]; // Update the corresponding dash
            }
        }
    });
});
