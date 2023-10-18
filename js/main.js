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
        enemie.moveRandomly();
    });
    gameBoard.printBoard();
}

setInterval(gameLoop,1000);
setInterval(startTimer,1000);
