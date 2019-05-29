var Letter = require("./Letter");

function Word(word) {
  this.word = word;
  this.correctLettersArray = [];

  this.createLetters = function() {
    var wordArray = this.word.split("");
    for (var i = 0; i < wordArray.length; i++) {
      var oneLetter = new Letter(wordArray[i]);
      this.correctLettersArray.push(oneLetter);
    }
  };

  this.userGuess = function(guess) {
    for (var x = 0; x < this.correctLettersArray.length; x++) {
      this.correctLettersArray[x].checkChar(guess);
    }
  };

  this.renderLetter = function() {
    var stringWord = "";
    for (var j = 0; j < this.correctLettersArray.length; j++) {
      stringWord += this.correctLettersArray[j].displayChar();
    }
    return stringWord;
  };
}

module.exports = Word;
