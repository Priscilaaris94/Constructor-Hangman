// this file requires the Word.js file 
var word = require('./Word');

// Game requires inquirer npm package to promt user to to enter a letter
var inquirer = require('inquirer');

// Game requirers colors npm package to give game color
var color = require('cli-color');

// create boxes in the terminal
const boxen = require('boxen');

// validation
var isLetter = require('is-letter')

// color for correct guess
var correct = color.green;

// color for incorrect guess
var incorrect = color.red; 

// if player guesses right, set variable to true, defult (false)
var guessedCorrectly = false;

// word bank
var words = ["Colorado", "Chicago", "California", "Canada"]

// choose random word
var randomWord;
var someWord;

var wins = 0;
var losses = 0;
var guessesRemaining = 15;

varplayerGuess = "";

// letters already guessed
var lettersGuessedList = "";
var lettersGuessedListArray = [];
