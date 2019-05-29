var Word = require("./word.js");
var inquirer = require("inquirer");
var chalk = require("chalk");

var wordList = ["refrigerator", "tofu", "candy", "car", "mister"];

var correctWord = new Word(
  wordList[Math.floor(Math.random() * wordsList.length)]
);
correctWord.createLetters();
var guessesLeft = 10;
var lettersGuessedSoFar = [];

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

      // Only decrement guessesRemaining on an incorrect guess
      if (!correctWord.correctWord.includes(data.guess)) {
        guessesLeft--;
      }

      lettersGuessedSoFar.push(data.guess);

      for (var i = 0; i < correctWord.correctLettersArray.length; i++) {
        correctWord.correctLettersArray[i].checkChar(data.guess);
      }

      if (
        correctWord.renderLetter().toLowerCase() ==
        correctWord.correctWord.toLowerCase()
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
