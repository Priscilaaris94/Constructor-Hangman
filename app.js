// this file requires the Word.js file 
var word = require('./Word');

// Game requires inquirer npm package to promt user to to enter a letter
var inquirer = require('inquirer');

// Game requirers colors npm package to give game color
var clc = require('cli-color');

// used to draw title
var figlet = require('figlet');

// create boxes in the terminal
const boxen = require('boxen');

// validation
var isLetter = require('is-letter')

// color for correct guess
var correct = color.green;

// color for incorrect guess
var incorrect = color.red;

var gameColor = clc.blueBright;

// if player guesses right, set variable to true, defult (false)
var guessedCorrectly = false;

// word bank
var words = ["Colorado", "Chicago", "California", "Canada"]

// choose random word
var randomWord;
var someWord;

// wins, losses, remaining guesses
var wins = 0;
var losses = 0;
var guessesRemaining = 15;
var playerGuess = "";

// letters already guessed
var lettersGuessedList = "";
var lettersGuessedListArray = [];

// # of underscores filled by letter
var slotsFilledIn = 0;

// start game
figlet("Hangman", function (err, data) {
    if (err) {
        console.log('error has occured');
        console.dir(err);
        return;
    }
    console.log(data)
});

function startGame() {
    guessedRemaining = 5;
    // choose random word from list
    chooseRandomWord();

    lettersGuessedList = "";
    lettersGuessedListArray = [];

}

function chooseRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    //  set random word to someWord
    someWord = new word(randomWord);
    // let player know the number of letter in the word
    console.log(gameColor("your word has" + randomWord.length + "letters."));
    // split the word and populate letter. (using word constructor)
    someWord.splitWord();
    someWord.generateLetters();
    guessLetter();
}

// prompt letting player to enter a letter
function guessLetter() {
    //  letting player know the still have guesses
    if (slotsFilledIn < someWord.letter.length || guessesRemaining > 0) {
        inquirer.prompt([

                {
                    name: "letter",
                    massage: "guess a letter",
                    // validation
                    validate: function (value) {
                        if (isLetter(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ]).then(function (guess) {
                    // capitulize all letter
                    guess.letter.toUpperCase();
                    console.log(gameColor("you guessed:" + guess.letter.toUpperCase()));

                    playerGuessedCorrectly = false;
                    // if letter has already been guessed let player know.
                    if (lettersGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
                        // when letter is guessed twice prompt inquire to tell play to guess again
                        console.log(gameColor('letter has already been guessed. Guess agian'));
                        console.log(gameColor('============================='));
                        guessLetter();

                    }

                    else if (lettersGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1){
                        // add letter to already guessed
                        lettersGuessedList =lettersGuessedList.concat(" " + guess.letter.toUpperCase());
                        lettersGuessedListArray.push(guess.letter.toUpperCase());
                        // diplay letters guess
                        console.log(boxen(gameColor('Letters guessed:') + lettersGuessedList, {padding: 2}));

                        // loop though all letters in the word, to determine if letter guessed matches letter in word

                        for (i = 0; i < someWord.letters.length; i++) {
                          if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessesRight === false){
                            //   set letterGuessedRight prperty for letter = true
                            someWord.letters[i].letterGuessesRight === true;
                            playerGuessedCorrectly = true;
                            someWord.underscores[i] = guess.letter.toUpperCase();
                            slotsFilledIn++
                          }  
                        }
                        console.log(gameColor('word'))
                    }