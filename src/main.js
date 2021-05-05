'use strict'; // r e a l  programming

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu , Tutorial , Play , GameOver ],
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
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
*/