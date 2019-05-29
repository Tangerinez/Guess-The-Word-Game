var Word = require("./components/Word");
var inquirer = require("inquirer");

var wordList = [
  "refrigerator",
  "tofu",
  "candy",
  "car",
  "mister",
  "nasty",
  "basketball",
  "immolate",
  "crib",
  "competition",
  "queen",
  "lawyer",
  "brash",
  "flavor",
  "crack",
  "top",
  "drum",
  "easy",
  "hat",
  "bitter",
  "filthy",
  "imbibe",
  "breezy",
  "book",
  "habitual",
  "compel",
  "sand",
  "petite",
  "boot",
  "vanish",
  "earsplitting",
  "science",
  "apathetic",
  "dispensable",
  "hair",
  "rat",
  "pump",
  "renounce",
  "sort",
  "earn",
  "dashing",
  "resist",
  "harmony",
  "invincible",
  "inspire",
  "utopian",
  "astonishing",
  "macho",
  "banish",
  "overconfident",
  "functional",
  "gusty",
  "omit",
  "leather",
  "interesting",
  "converse",
  "bit",
  "occur",
  "breakfast",
  "key",
  "aboriginal",
  "terrific",
  "vigorous",
  "mailbox",
  "flee",
  "wacky",
  "squealing",
  "implant",
  "discover",
  "breakable",
  "uttermost",
  "hideous",
  "jittery",
  "disgusted",
  "vacuous",
  "attraction",
  "husky",
  "puzzling",
  "workable"
];

var correctWord = new Word(
  wordList[Math.floor(Math.random() * wordList.length)]
);
correctWord.createLetters();
var guessesLeft = 10;
var lettersGuessedSoFar = [];

console.log("\nWelcome to Hangman CLI!");

function mainGame() {
  inquirer
    .prompt([
      {
        name: "guess",
        prefix: "",
        message:
          "\nWord: " +
          correctWord.renderLetter() +
          "\n\nGuesses remaining: " +
          guessesLeft +
          "\nIncorrect guesses so far: " +
          lettersGuessedSoFar.join(" ") +
          "\n" +
          "Guess a letter:"
      }
    ])
    .then(function(data) {
      // Validate user input
      if (data.guess === "") {
        console.log("Please enter a letter!");
        return mainGame();
      } else if (data.guess.length > 1) {
        console.log(" Please guess one letter at a time.");
        return mainGame();
      } else if (lettersGuessedSoFar.includes(data.guess)) {
        console.log(
          "You already guessed this letter. Please choose another letter."
        );
        return mainGame();
      }

      // Only decrement guessesLeft on an incorrect guess
      if (!correctWord.word.includes(data.guess)) {
        guessesLeft--;
      }

      lettersGuessedSoFar.push(data.guess);

      for (var i = 0; i < correctWord.word.length; i++) {
        correctWord.correctLettersArray[i].checkChar(data.guess);
      }

      if (
        correctWord.renderLetter().toLowerCase() ==
        correctWord.word.toLowerCase()
      ) {
        endGame("win"); // create function
        return;
      }

      if (guessesLeft == 0) {
        endGame("loss"); // create function
        return;
      }
      mainGame();
    });
}

function endGame(result) {
  if (result === "win") {
    console.log("\nYou won!");
    console.log(
      "You guessed " +
        correctWord.word.toUpperCase() +
        " with " +
        guessesLeft +
        " guesses remaining." +
        "\n"
    );
  } else {
    console.log("\nYou lost...");
    console.log("The correct word was: " + correctWord.word + ".\n");
  }

  correctWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
  correctWord.createLetters();
  guessesLeft = 10;
  lettersGuessedSoFar = [];

  inquirer
    .prompt([
      {
        message: "Would you like to play again?",
        name: "confirm",
        type: "confirm"
      }
    ])
    .then(function(response) {
      if (response.confirm) {
        console.log("\nGreat! Generating a new word...");
        mainGame();
      } else {
        console.log("\nHope you see you next time!\n");
        return;
      }
    });
}
mainGame();
