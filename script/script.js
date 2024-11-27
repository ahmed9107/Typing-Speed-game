// Array Of Words
const easyLvlWords = [
  "Hello",
  "Code",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Coding",
  "Funny",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Encore",
  "trade",
  "Free",
];

let normalLvlWords = [
  "Synonym",
  "Javascript",
  "Linkedin",
  "Leetcode",
  "Internet",
  "Paradigm",
  "Styling",
  "Cascade",
  "Working",
  "Playing",
  "Conscious",
  "Sentient",
  "Partible",
  "Luminary",
  "Interpreter",
  "Telephony",
  "Finally",
  "Admissible",
  "Penetrable",
  "Reseat",
]

let hardLvlWords = [
  "Javascript",
  "Linkedin",
  "Paradigm",
  "Conscious",
  "Partible",
  "Luminary",
  "Interpreter",
  "Admissible",
  "Penetrable",
  "Consummate",
  "Overpower",
  "Illuminant",
  "Insouciance",
  "Heartbroken",
  "Kind-hearted",
  "Supramundane",
  "Programming",
  "Destructuring",
  "Documentation",
  "Dependencies",
]

// Setting Levels
const lvls = {
  "Easy"  : 7,
  "Normal": 5,
  "Hard"  : 3
};

// Default level
let defaultLevel        = "Normal";
let defaultLevelSeconds = lvls[defaultLevel];

// Selectors
let startBtn      = document.querySelector(".start");
let wordDisplay   = document.querySelector(".the-word");
let lvlNameSpan   = document.querySelector(".message .lvl");
let secondsSpan   = document.querySelector(".message .seconds");
let upcomingWords = document.querySelector(".upcoming-words");
let input         = document.querySelector(".input");
let timeLeftSpan  = document.querySelector(".time span");
let scoreGot      = document.querySelector(".score .got");
let scoreTotal    = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

lvlNameSpan.innerHTML   = defaultLevel;
secondsSpan.innerHTML   = defaultLevelSeconds;
timeLeftSpan.innerHTML  = defaultLevelSeconds;
scoreTotal.innerHTML    = medmLvlWords.length;

// Disable paste event
input.onpaste = function () {
  return false;
}

// Start Game
startBtn.onclick = function () {
  this.remove();
  input.focus();
  generateWord();
}

function generateWord() {
  // Get random word from words array:
  let randomWord = "";
  geneWordBasedOnLvl(randomWord);
  wordDisplay.innerHTML = randomWord;
  // Get random word index:
  let randomWordIdx = words.indexOf(randomWord);
  // Remove random word from words array:
  medmLvlWords.splice(randomWordIdx, 1);
  // Empty upcoming words:
  upcomingWords.innerHTML = "";
  // Generate upcoming words:
  for (let i = 0; i < medmLvlWords.length; i++) {
    // Create div element:
    let div = document.createElement("div");
    let txt = document.createTextNode(medmLvlWords[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function geneWordBasedOnLvl(randomWord) {
  if (defaultLevel === "Easy") {
    randomWord = easyLvlWords[Math.floor(Math.random() * easyLvlWords.length)];
  } else if((defaultLevel === "Normal")) {
    randomWord = normalLvlWords[Math.floor(Math.random() * normalLvlWords.length)];
  } else {
    randomWord = hardLvlWords[Math.floor(Math.random() * hardLvlWords.length)];
  }
  return randomWord;
}

function removeRandomWordFromArray(randomWord, randomWordIdx) {
  if (defaultLevel === "Easy") {
    randomWordIdx = easyLvlWords.indexOf(randomWord);
    return easyLvlWords.splice(randomWordIdx, 1);
  } else if((defaultLevel === "Normal")) {
    randomWordIdx = normalLvlWords.indexOf(randomWord);
    return normalLvlWords.splice(randomWordIdx, 1);
  } else {
    randomWordIdx = hardLvlWords.indexOf(randomWord);
    return hardLvlWords.splice(randomWordIdx, 1);
  }
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (wordDisplay.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        if (medmLvlWords.length > 0) {
          // Call Generate Word Function
          generateWord();
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}