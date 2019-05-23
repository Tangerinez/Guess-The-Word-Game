var Letter = function(character) {
  this.character = character;
  // accuracy of guess is initially set as false and only changes to true if user guesses the correct letter
  this.accuracy = false;
  // checkChar function checks if user's input is a matching letter
  this.checkChar = function(guess) {
    if (guess.toLowerCase() === this.character.toLowerCase()) {
      this.accuracy = true;
    }
  };
  // if the guess was true, since accuracy is now true, the character is returned at that instance
  this.displayChar = function() {
    if (this.accuracy === true) {
      return this.character;
    } else {
      return "_";
    }
  };
};

module.exports = Letter;
