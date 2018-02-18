var inquirer = require('inquirer');

var colors = require('colors');

var word = require('./Word');

var randomWords = require ('random-words')

// setting variables for game
var guesses = 5;

var word = '';

var correctGuess = false;


// starting game 
function initGame() {

    guesses = 5

    // var randomNum = Math.floor(Math.random() * words.length)

    word = new Word (randomWords())

    word.createLetters()

}


function playGame () {

    rightGuess = false;

    var wordDis = ''

    //display letters and blankspaces

    word.letters.forEach(function(letterObj){

        wordDis += letterObj.showing + ' '

    })

    console.log('\n' + wordDis)


// prompting player to guess letter
    inquirer.prompt([

        {

            name: 'letter',

            message: 'Guess a letter: '

        }

    ]).then(function(answer){

        guesses --

        word.checkLetters(answer.letter)

        if(word.guessedCorrect){

            var correctWord = ''

            word.letters.forEach(function(letterObj){

                correctWord+= letterObj.showing + ' '

            })

            console.log(correctWord.green)

            console.log("You got it dude!".blue)


            playAgain()

        }else if(guesses === 0){

            console.log('KO'.red)

            playAgain()

        }else{

            console.log('\nRemaining Guesses: ' + guesses)

            playGame()

        }

    })

}


function resetGame () {

    inquirer.prompt([

        {

            type: 'confirm',

            message: 'restart',

            name: 'resetGame',

            default: true

        }

    ]).then(function(answer){

        if(answer.resetGame){

            initGame()

            playGame()

        }

    })

}



initGame()

playGame()