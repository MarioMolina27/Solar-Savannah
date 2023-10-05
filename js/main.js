import Board from './objects/board.js';
import Pacman from './objects/pacman.js';
import * as all from "./config.js";
import { inputDetected } from './input.js';

const pacmanPlayer = new Pacman();
createHearts(pacmanPlayer);
const gameBoard = new Board(all.layout, all.grid,pacmanPlayer);
gameBoard.printBoard();


document.addEventListener('keydown', function(event) {
    inputDetected(event, gameBoard.pacman);
});


function createHearts(pacmanPlayer)
{
    const pacmanLifes = document.querySelector(".pacman-lifes");
    for(let i =1;i<=pacmanPlayer.lifes;i++)
    {
        const heart = document.createElement('img');
        heart.classList.add("heart");
        heart.src = './media/img/heart.png';
        heart.alt = '';
        pacmanLifes.appendChild(heart);
    }
}

function gameLoop()
{
    gameBoard.printBoard();
}

setInterval(gameLoop,1000);
