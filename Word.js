// constructing of letters to create word and varify if letter guessed is correct
var letter = require('./Letter')


function Word (word) {

    this.word = word;

    this.letters = [];

    this.guessedCorrect = false;

    
    this.createLetters = function () {
        var that = this

        var let = this.word.split("")

        let.forEach(letter => {

            var newLetter = new Letter(letter)

            that.letters.push(newLetter)

        });

    }


    this.checkLetters = function (guessedLetter) {

        var that = this

        var counter = 0

        this.letters.forEach(letterObj => {

            letterObj.check(guessedLetter)

            //if a letter is guessed add 1

            if(letterObj.guessed === true){

                counter ++

            }

        })

        //correct word has been guessed

        if(counter === that.letters.length){

            that.guessedRight = true

        }
       

    }


}


module.exports = word



