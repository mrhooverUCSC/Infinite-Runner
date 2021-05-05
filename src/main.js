'use strict'; // r e a l  programming

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu , Tutorial , Play , GameOver ],
    physics: {
        default: 'arcade',
        arcade:{
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

let game = new Phaser.Game(config);

// scores
let currentScore = 0;       // stores current score
let currentTime = 0;        // stores lasted time
let highScore = 0;          // stores highest score earned
let highestTimeLasted = 0;  // stores highest time lasted

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let oceanSpeed = 4;

// keeps track of the current correct answer for game over scene
let correctAnswerText;
let promptShowing;  // if there is a prompt, do not show text on game over scene

// controls
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER, keyR;
/*
CMPM 120
Iron Sites
Matthew Hoover
Alejandro Silva
Ivan Martinez-Arias

InFinite Math
May 4th 2021

Creative Tilt Justification:
When deciding on a theme, we were telling ourselves to think simple and one of us thought of the ocean
being considered endless. So we decided to stick with it and as obstacles, we thought of the idea to think
critically while dodging things as the player moves around the game. Thinking of something simple, we went with
small math problems to shoot out as the inspiration for the rough idea came to us from Danganronpa 2's Logic Dive
and how they threw questions at the player.

-> Does your game... do something technically interesting? Are you particularly proud of a programming technique
you implemented? Did you look beyond the class examples and learn how to do something new? (5)
    We implemented a class Question that is taken a number that represents difficulty and depending on the result
will generate a random question with a couple fake answers that are close to the real answer. When receiving the
correct answer, we have a range estimate of the answer so that it can still seem believable to the player to make
sure the player is certain with their answer. We did Division backwards, generating the "answer" and the second
input first, using those to generate the first input. It's just a multiplication problem that never gets divided
by 0 or a non-whole number so that it feels like a genuine answer. For multiplication and division, instead of
generating a random number, we changed one of the inputs a little so the fake answer is always related to one
of the inputs instead of something random or a prime number. In the class we used do-while loops which is something
we never fully understood until now and felt appropriate to use here. 

-> Does your game... have a great visual style? Does it use music or art that you're particularly proud of?
Are you trying something new or clever with the endless runner form? (5)
    We stuck with a simple artstyle for our game since we went with an ocean themed endless runner. All of the assets
we are proud of as we sketched each drawing both in paper and digitally, as well as create music and audio from the
experience of messing around with Bfxr and from a past UC course that taught Algorithm Music for Games. We wanted to
have a take in the genre where rather than  dodging a single simple obstacle throughout the entire game, we present
different phases of the runner where it switches from dodging to decision making to choose the correct answer.
*/