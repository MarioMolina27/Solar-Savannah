import Board from './objects/board.js';
import Pacman from './objects/pacman.js';
import * as all from "./config.js";
import { inputDetected } from './input.js';
import {startTimer} from './timer.js';
import Enemy from './objects/enemy.js';

const pacmanPlayer = new Pacman();
let enemies = findEnemies();
const gameBoard = new Board(all.layout, all.grid,pacmanPlayer);
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
    for (let y = 0; y < all.layout.length; y++) {
        for (let x = 0; x < all.layout[y].length; x++) {
            if (all.layout[y][x] === 6) {
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
    enemies.forEach(enemie => {
        if(enemie.isAlive)
        {
            enemie.moveRandomly();
        }
    });
    gameBoard.printBoard();
}


function countItems() {
    const totalItems = [0,0];
  
    for (let i = 0; i < all.layout.length; i++) 
    {
      for (let j = 0; j < all.layout[i].length; j++) 
      {
        if (all.layout[i][j] === 0) 
        {
          totalItems[0]++;
        } 
        else if (all.layout[i][j] === 3) 
        {
          totalItems[1]++;
        }
      }
    }
    return totalItems;
}

gameLoopInterval = setInterval(gameLoop,1000);
timerInterval = setInterval(startTimer,1000);
