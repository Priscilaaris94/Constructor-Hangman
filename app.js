// this file requires the Word.js file 
var word = require('./Word');

// Game requires inquirer npm package to promt user to to enter a letter
var inquirer = require('inquirer');

// Game requirers colors npm package to give game color
var color = require('cli-color');

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

var gameColor = color.blueBright;

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

// game title
figlet("Hangman", function (err, data) {
    if (err) {
        console.log('An error has occured');
        console.log(err);
        return;
    }
    console.log(data)
    console.log("Theme is states that start with letter C.")
    confirmGame();
});

// function to prompt the player to enter their info to confirm game.
function confirmGame() {
    var startGame = [{
            type: 'text',
            name: 'playerName',
            message: 'What is your name?'
        },
        {
            type: 'confirm',
            name: 'readyToPlay',
            message: 'would you like to play?',
            default: true
        }
    ];

    inquirer.prompt(startGame).then(answers => {
        //If the player confirms: they want to play, start game.
        if (answers.readyToPlay) {
            console.log(gameColor("Let get ready to rumble, " + answers.playerName + ". Let's do this..."));
            playGame();
        } else {
            //If the player decides: not to play, exit game.
            console.log(gameColor("See ya, " + answers.playerName));
            return;
        }
    });
}

// function to start playing
function playGame() {
    guessesRemaining = 5;
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
    console.log(gameColor("your word has\n " + randomWord.length + "\n letters."));
    // split the word and populate letter. (using word constructor)
    someWord.splitWord();
     someWord.generateLetters();
    guessLetter();
}

// prompt letting player to enter a letter
function guessLetter() {
    //  letting player know they still have guesses
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

            } else if (lettersGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
                // add letter to already guessed
                lettersGuessedList = lettersGuessedList.concat(" " + guess.letter.toUpperCase());
                lettersGuessedListArray.push(guess.letter.toUpperCase());
                // diplay letters guess
                console.log(boxen(gameColor('Letters guessed:') + lettersGuessedList, {
                    padding: 2
                }));

                // loop though all letters in the word, to determine if letter guessed matches letter in word

                for (i = 0; i < someWord.letters.length; i++) {
                    if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessesRight === false) {
                        //   set letterGuessedRight prperty for letter = true
                        someWord.letters[i].letterGuessesRight === true;
                        playerGuessedCorrectly = true;
                        someWord.underscores[i] = guess.letter.toUpperCase();
                        slotsFilledIn++
                    }
                }
                console.log(gameColor('guess word:'));
                someWord.splitWord();
                someWord.generateLetters();

                if (playerGuessedCorrectly) {
                    console.log(correct('you got it dude!'));
                    console.log(gameColor('=============================='));
                    checkIfPlayerWon();
                } else {
                    console.log(incorrect('wrong dude!'));
                    guessesRemaining--;
                    console.log(gameColor("you have" + guessesRemaining + "guesses remaining."));
                    console.log(gameColor("============================================="));
                    checkIfPlayerWon();

                }
            }
        });
    }
}

//function will check if the player won or lost after user guesses a letter.
function checkIfPlayerWon() {

    //When number of guesses remaining is 0, end game.
    if (guessesRemaining === 0) {

        console.log(gameColor("====================================================================="));

        console.log(incorrect('KO'));

        console.log(gameColor("The correct state was: " + randomWord));

        //Increment loss counter by 1
        losses++;

        //Display wins and losses totals.

        console.log(gameColor("Wins: " + wins));

        console.log(gameColor("Losses: " + losses));

        console.log(gameColor("====================================================================="));

        //Ask player if they want to play again. Call playAgain function.
        playAgain();

    }



    //else if the number of slots/underscores that are filled in with a letter equals the number of letters in the word, the user won.
    else if (slotsFilledIn === someWord.letters.length) {

        console.log(gameColor("====================================================================="));
        console.log(correct("YOU WON DUDE!"));

        //Increment win counter by 1
        wins++;

        //Display total wins and losses
        console.log(gameColor("Wins: " + wins));

        console.log(gameColor("Losses: " + losses));

        console.log(gameColor("====================================================================="));

        //Ask player if they want to play again. Call playAgain function.

        playAgain();

    } else {

        //If player did not win or lose after a guess, keep running inquirer.
        guessLetter("");

    }
}

//function that will ask player if they want to reset when game is over.
function playAgain() {

    var resetGame = [

        {

            type: 'confirm',

            name: 'playAgain',

            message: 'Do you want to reset game?',

            default: true

        }

    ];

    inquirer.prompt(resetGame).then(playerWantsTo => {

        if (playerWantsTo.playAgain) {

            //Empty array with letters already guessed
            lettersGuessedList = "";

            lettersGuessedListArray = [];

            //Set number of slots filled in with letters back to zero 
            slotsFilledIn = 0;

            console.log(gameColor("Let's do this!"));

            //start a new game.
            startGame();
        } else {
            aqs
            //player is done playing (end game)
            console.log(gameColor("bye for now!"));

            return;

        }

    });

}