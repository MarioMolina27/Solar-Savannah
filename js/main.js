import Board from './objects/board.js';
import Pacman from './objects/pacman.js';
import * as config from "./config.js";
import { inputDetected } from './input.js';
import {startTimer} from './timer.js';
import Enemy from './objects/enemy.js';

const pacmanPlayer = new Pacman();
let enemies = findEnemies();
const gameBoard = new Board(config.layout, config.grid ,pacmanPlayer,enemies);
gameBoard.pacman.createHearts();
gameBoard.printBoard();



let items = countItems();

export let gameLoopInterval;
export let timerInterval;
export const totalPoints = items[0];
export const totalPowerUps = items[1];

console.log("Points: " + totalPoints);
console.log("PowerUps: " + totalPowerUps);

document.addEventListener('keydown', function(event) {
    inputDetected(event, gameBoard.pacman);
});


function findEnemies() {
    const enemies = [];
    let num = 1;
    for (let y = 0; y < config.layout.length; y++) {
        for (let x = 0; x < config.layout[y].length; x++) {
            if (config.layout[y][x] === config.enemie) {
                const enemy = new Enemy(num);
                enemy.x = x;
                enemy.y = y;
                enemies.push(enemy);
                num++;
            }
        }
    }

    return enemies;
}

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


function countItems() {
    const totalItems = [0,0];
  
    for (let i = 0; i < config.layout.length; i++) 
    {
      for (let j = 0; j < config.layout[i].length; j++) 
      {
        if (config.layout[i][j] === 0) 
        {
          totalItems[0]++;
        } 
        else if (config.layout[i][j] === 3) 
        {
          totalItems[1]++;
        }
      }
    }
    return totalItems;
}

gameLoopInterval = setInterval(gameLoop,config.gameLoopDuration);
timerInterval = setInterval(startTimer,config.gameLoopDuration);