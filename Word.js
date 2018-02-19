// constructing of letters to create word and varify if letter guessed is correct
var Letter = require('./Letter')


var Word = function(word) {

    this.word = word;

    this.letters = [];

    this.underscores = [];

    this.splitWord = function() {
        this.letters = this.word.split("");
        numberUnderscoresNeeded = this.letters.length;
        console.log(this.underscores.join(" "));
    }

    this.generateLetters = function() {
        for (i = 0; i < this.letters.length; i++){
        this.letter[i] = new Letter (this.letters[i]);
        this.letters[i].showCharacter();
        }
    }
}

// Export the Word constructor (reference it in app.js)
module.exports = Word;