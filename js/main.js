import Board from './objects/board.js';
import Pacman from './objects/pacman.js';
import * as config from "./config.js";
import { inputDetected } from './input.js';
import {startTimer} from './timer.js';
import * as utilities from './utilities.js'


export let gameLoopInterval;
export let timerInterval;
export const gameBoard = new Board(config.layout, config.grid, new Pacman(), utilities.findEnemies());

export let totalPoints;
export let totalPowerUps;

let btnPlay = document.querySelector(".play-game-btn");
let gameContainer = document.querySelector(".game-container");
let speechBubble = document.getElementById("speech-txt");
let characterSpeech = document.getElementById("character-speech");


btnPlay.addEventListener("click", function()
{
    characterSpeech.style.width ="30%";
    speechBubble.innerText = "Començem!";
    gameContainer.style.display = "flex";
    gameBoard.pacman.createHearts();

    gameBoard.printBoard();


    let items = utilities.countItems();
    totalPoints = items[0];
    totalPowerUps = items[1];


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
});

