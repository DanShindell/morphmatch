// script.js

const wordPairs = [
    ["induce", "uncover"],
    ["hypothermia", "hypothesis"],
    ["unfair", "undercover"],
    ["hypocrisy", "hypothesize"],
    ["unify", "underneath"],
];

const gameBoard = document.getElementById('game-board');
const scoreValue = document.getElementById('score-value');
let score = 0;

// Generate word elements and add them to the game board
for (let i = 0; i < wordPairs.length; i++) {
    const wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.textContent = wordPairs[i][0];
    wordElement.addEventListener('click', handleWordClick);
    gameBoard.appendChild(wordElement);
}

// Function to handle word clicks
function handleWordClick(event) {
    const clickedWord = event.target;
    clickedWord.classList.toggle('matched');
}

// Function to check matches
function checkMatches() {
    let matchedCount = 0;

    for (let i = 0; i < gameBoard.childNodes.length; i++) {
        const wordElement = gameBoard.childNodes[i];
        const matchedWord = wordElement.textContent;

        for (let j = i + 1; j < gameBoard.childNodes.length; j++) {
            const otherWordElement = gameBoard.childNodes[j];
            const otherWord = otherWordElement.textContent;

            if (matchedWord === otherWord) {
                wordElement.classList.add('matched');
                otherWordElement.classList.add('matched');
                matchedCount++;
            }
        }
    }

    score += matchedCount * 10;
    scoreValue.textContent = score;
}
