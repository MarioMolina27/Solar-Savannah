import Board from './objects/board.js';
import Pacman from './objects/pacman.js';
import * as config from "./config.js";
import { inputDetected } from './input.js';
import {startTimer} from './timer.js';
import * as utilities from './utilities.js'


export let gameLoopInterval;
export let timerInterval;
export const gameBoard = new Board(config.layout, config.grid, new Pacman(), utilities.findEnemies());

gameBoard.pacman.createHearts();
gameBoard.printBoard();


let items = utilities.countItems();
export const totalPoints = items[0];
export const totalPowerUps = items[1];


console.log("puntos necesarios: "+items[0]);
console.log("power necesarios: "+items[1]);

document.addEventListener('keydown', function(event) {
    inputDetected(event, gameBoard.pacman);
});


function gameLoop()
{
    gameBoard.enemies.forEach(enemie => {
        if(enemie.isAlive)
        {
            enemie.moveRandomly();
        }
    });
    gameBoard.printBoard();
}


gameLoopInterval = setInterval(gameLoop,config.gameLoopDuration);
timerInterval = setInterval(startTimer,config.gameLoopDuration);