const wordPairs = [
  ["induce", "uncover"],
  ["hypothermia", "hypothesis"],
  ["unfair", "undercover"],
  ["hypocrisy", "hypothesize"],
  ["unify", "underneath"],
];

let currentRound = 1;
let totalScore = 0;
let roundScore = 0;

generateRound();

function generateRound() {
  const shuffledWordPairs = wordPairs.slice();
  shuffle(shuffledWordPairs);

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  for (let i = 0; i < shuffledWordPairs.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    const word1 = shuffledWordPairs[i][0];
    const word2 = shuffledWordPairs[i][1];

    const word1Element = document.createElement("span");
    word1Element.classList.add("word");
    word1Element.textContent = word1;

    const word2Element = document.createElement("span");
    word2Element.classList.add("word");
    word2Element.textContent = word2;

    row.appendChild(word1Element);
    row.appendChild(word2Element);

    gameBoard.appendChild(row);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click", checkMatches);

function checkMatches() {
  const gameBoard = document.getElementById("game-board");
  const rows = gameBoard.querySelectorAll(".row");

  let matchedWords = 0;

  // Check for matches across multiple rows
  for (let i = 0; i < rows.length - 1; i++) {
    const rowWords = rows[i].querySelectorAll(".word");
    const word1 = rowWords[0].textContent;

    for (let j = i + 1; j < rows.length; j++) {
      const nextRowWords = rows[j].querySelectorAll(".word");
      const word2 = nextRowWords[0].textContent;

      if (isMatchingWordPart(word1, word2)) {
        matchedWords++;

        rowWords[0].classList.add("matched");
        nextRowWords[0].classList.add("matched");
      }
    }
  }

  // Calculate score based on the number of matched words
  roundScore = matchedWords * 10;
  totalScore += roundScore;

  updateScoreboard();
}

function isMatchingWordPart(word1, word2) {
  const wordPart1 = extractWordPart(word1);
  const wordPart2 = extractWordPart(word2);

  return wordPart1 === wordPart2;
}

function extractWordPart(word) {
  const prefixes = ["un-", "hypo-", "pre-", "dis-", "in-", "im-", "de-"];
  const suffixes = ["-ity", "-ness", "-tion", "-ation", "-ment", "-age"];

  for (const prefix of prefixes) {
    if (word.startsWith(prefix)) {
      return prefix;
    }
  }

  for (const suffix of suffixes) {
    if (word.endsWith(suffix)) {
      return suffix;
    }
  }

  // If no matching prefix or suffix, return the whole word
  return word;
}

const nextRoundButton = document.getElementById("next-round-button");
nextRoundButton.addEventListener("click", nextRound);

function nextRound() {
  currentRound++;
  roundScore = 0;

  updateScoreboard();
  generateRound();
}

const start
