//When constructed, it takes in a difficulty, creates a question, and stores its information
//For now, only math of 2 numbers with 3 answers
//four tiers of difficulty, each of which includes the previous
//Creates a "e", or the full equation (mostly for debugging), and a "q", the equation without the answer (displayed in game)
//Behind these is two constants, a true result, and two fakes.
class Question{
    constructor(difficulty){
        this.type = Phaser.Math.Between(0,difficulty+2);
        switch(this.type){
            case 0:
                this.addition();
                break;
            case 1:
                this.subtraction();
                break;
            case 2:
            case 3:
                this.multiplication();
                break;
            default:
                this.division();
        }
        this.check_equation();
    }

    //Addition creates 2 numbers, finds the correct result, then varies it for the fakes
    addition(){
        this.constant1 = Phaser.Math.Between(-9,9);
        this.constant2 = Phaser.Math.Between(-9,9);
        this.result = this.constant1 + this.constant2;
        do{
            this.fake1 = this.result + Phaser.Math.Between(-5,5);
        } while(this.fake1 == this.result)
        do{
            this.fake2 = this.result + Phaser.Math.Between(-5,5);
        } while(this.fake2 == this.result || this.fake2 == this.fake1);
        this.e = this.constant1 + " + " + this.constant2 + " = " + this.result;
        this.q = this.constant1 + " + " + this.constant2 + " =";
        // sets correct answer if player gets question wrong
        correctAnswerText = this.e;
    }

    //Subtraction, same as addition, but the second number cannot be negative for clarity
    subtraction(){
        this.constant1 = Phaser.Math.Between(-9,9);
        this.constant2 = Phaser.Math.Between(1,9);
        this.result = this.constant1 - this.constant2;
        do{
            this.fake1 = this.result + Phaser.Math.Between(-5,5);
        } while(this.fake1 == this.result)
        do{
            this.fake2 = this.result + Phaser.Math.Between(-5,5);
        } while(this.fake2 == this.result || this.fake2 == this.fake1);
        this.e = this.constant1 + " - " + this.constant2 + " = " + this.result;
        this.q = this.constant1 + " - " + this.constant2 + " =";
        // sets correct answer if player gets question wrong
        correctAnswerText = this.e;
    }

    //Multiplication.  Fakes are based on the other numbers, not the result
    multiplication(){
        this.constant1 = Phaser.Math.Between(-9,9);
        this.constant2 = Phaser.Math.Between(-9,9);
        this.result = this.constant1 * this.constant2;
        do{
            this.fake1 = this.constant1 * Phaser.Math.Between(-9,9);
        } while(this.fake1 == this.result)
        do{
            this.fake2 = this.constant2 * Phaser.Math.Between(-9,9);
        } while(this.fake1 == this.result || this.fake2 == this.fake1)
        this.e = this.constant1 + " * " + this.constant2 + " = " + this.result;
        this.q = this.constant1 + " * " + this.constant2 + " =";
        // sets correct answer if player gets question wrong
        correctAnswerText = this.e;
    }

    //Division.  Works backwards, making a multiplcation problem, then presenting it as division.
    division(){
        this.result = Phaser.Math.Between(-9,9);
        this.constant1 = Phaser.Math.Between(1,9);
        this.constant2 = this.result * this.constant1;
        do{
            this.fake1 = Phaser.Math.Between(-9,9);
        } while(this.fake1 == this.result);
        do{
            this.fake2 = Phaser.Math.Between(-9,9);
        } while(this.fake1 == this.result || this.fake2 == this.fake1);
        this.e = this.constant2 + " / " + this.constant1 + " = " + this.result;
        this.q = this.constant2 + " / " + this.constant1 + " =";
        // sets correct answer if player gets question wrong
        correctAnswerText = this.e;
    }

    check_equation(){
        console.log("Correct Answer:" + this.result);
        console.log(this.constant1);
        console.log(this.constant2);
        console.log(this.e);
        console.log(this.fake1);
        console.log(this.fake2);
    }
}