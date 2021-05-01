'use strict'; // r e a l  programming

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu , Play ],
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let oceanSpeed = 4;

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER;
/*
CMPM 120
Matthew Hoover
Alejandro Silva
Ivan Martinez-Arias

In(Fin)ite Math // fix game title?
May 3rd 2021

Creative Tilt Justification
*/