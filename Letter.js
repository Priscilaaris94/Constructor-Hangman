var Letter = function(character) {
    // string value to store underlying charater 
    this.character = character.toUpperCase();
    // boolean value ot store if letter has been guessed
    this.letterGuessedRight = false;
    // function: returns the underlying chatarter if letter has been guessed,
    // or an underscore if letter has not yet been guess
    this.showCharacter = function(){
        if (this.letterGuessedRight){
            console.log(this.character);
        }
        else{
            console.log("");
        }
    }
}

// Exports Letter constructor( refernced by Word.js)
module.exports = Letter