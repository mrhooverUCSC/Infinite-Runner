'use strict'; // r e a l  programming

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu , Play , GameOver ],
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
let highScore = 0;
let timeLasted = 0;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let oceanSpeed = 4;

// keeps track of the current correct answer for game over scene
let correctAnswerText;
let promptShowing = false;  // if there is a prompt, do not show text on game over scene

// controls
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER;
/*
CMPM 120
Matthew Hoover
Alejandro Silva
Ivan Martinez-Arias

In(Fin)ite Math // fix game title?
May 3rd 2021

Creative Tilt Justification:
*/