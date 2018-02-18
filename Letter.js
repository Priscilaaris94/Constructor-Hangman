// creating letter function to replace space with letter
function letter (letter) {
    
        this.letter = letter;
    
        this.showing = "__";
    
        this.guessed = false;
     
    
        this.check = function(guessedLetter){
    
            if(this.letter === guessedLetter){
    
                this.showing = this.letter
    
                this.guessed = true;
    
            }
    
        }
    
    }
    
      
    module.exports = letter;

