//When constructed, it takes in a difficulty, creates a question, and stores its information
//For now, only addition of 2 numbers with 3 answers
//Later, at least four tiers of difficulty, each of which includes the previous
//  0: addition and subtraction
//  1: multiplication
//  2: division
//  3: greatly increase range of questions
class Question{
    constructor(){
        this.addend1 = Phaser.Math.Between(1,9);
        this.addend2 = Phaser.Math.Between(1,9);
        this.result = this.addend1 + this.addend2;
        this.e = this.addend1 + " + " + this.addend2 + " = " + this.result;
    }

    equation(){
        console.log(this.e);
    }
}