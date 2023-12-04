import { gameBoard, gameLoopInterval, timerInterval, totalPoints, totalPowerUps } from './main.js'
import * as config from './config.js'
import {interval} from './input.js'

let timeout;
let powerupSound = new Audio('../media/aud/poweup.mp3');
let pointSound = new Audio('../media/aud/point.wav');
let gameOverSound = new Audio('../media/aud/gameOver.mp3');
let killEnemySound = new Audio('../media/aud/enemy-eat.mp3');

export function nextObjectEvent(num, board) {
    switch (num) 
    {
        case config.point:
            board.pacman.score += 1;
            board.pacman.pointsPicked += 1;
            pointSound.play();
            refreshScoreScreen(board);
            if (board.pacman.pointsPicked === totalPoints && board.pacman.powerUpPicked === totalPowerUps) 
            {
                clearTimeout(timeout);
                board.pacman.canMove = false;
                gameOver(config.WIN_TXT);
            }
            break;
        case config.enemie:
            if (!board.pacman.powerUpActive) 
            {
                clearInterval(interval);
                gameOverSound.play();
                board.pacman.canMove = false;
                setTimeout(() => {
                    board.pacman.canMove = true;
                }, 1000);
                board.pacman.currentLifes--;
                board.pacman.createHearts();
                board.pacman.returnOriginalPosition();

                if (board.pacman.currentLifes === 0) 
                {
                    clearTimeout(timeout);
                    board.pacman.canMove = false;
                    gameOver(config.LOSE_TXT);
                }
            }
            else
            {
                killEnemySound.play();
                board.pacman.score += 20;
                refreshScoreScreen(board);
            }
            break;
        case config.powerup:
            powerupSound.play();
            board.pacman.powerUpPicked += 1;
            if (board.pacman.pointsPicked === totalPoints && board.pacman.powerUpPicked === totalPowerUps) 
            {
                clearTimeout(timeout);
                board.pacman.canMove = false;
                gameOver(config.WIN_TXT);
            }
            else 
            {
                pickPowerup(board);
            }
    }
}

export function pickPowerup(board) 
{
    if (!board.pacman.powerUpActive) 
    {
        board.pacman.powerUpActive = true;
        console.log("activado el power up");
        document.querySelector('.screen').classList.add('active');
        timeout = setTimeout(function () {
            board.pacman.powerUpActive = false;
            document.querySelector('.screen').classList.remove('active');
            console.log("ya no tienes el powerUp");
        }, config.powerUpDuration);
    }
    else 
    {
        clearTimeout(timeout);
        console.log("tiempo augmentado");
        timeout = setTimeout(function () {
            board.pacman.powerUpActive = false;
            document.querySelector('.screen').classList.remove('active');
            console.log("ya no tienes el powerUp");
        }, config.powerUpDuration);
    }
}

function gameOver(finishStatus) 
{
    document.querySelector('.screen').classList.remove('active');
    let gameOverScreen = document.getElementById('gameOverScreen');
    let mapElement = document.querySelector('.map');
    let altura = mapElement.offsetHeight;
    let ancho = mapElement.offsetWidth;
    gameOverScreen.style.width = ancho + 'px';
    gameOverScreen.style.height = altura + 'px';

    let title = gameOverScreen.querySelector('#gameOverScreen h2');
    gameOverScreen.style.display = "flex";
    title.innerHTML = finishStatus;
    clearInterval(gameLoopInterval);
    clearInterval(timerInterval);


    let resetBtn = document.querySelector('.js-restart-btn');
    resetBtn.addEventListener('click', function (event) {
        window.location.reload();
    });

    if (finishStatus === config.WIN_TXT) 
    {
        document.getElementById('speech-txt').innerHTML = "FELICITATS!";
    }
    else if(finishStatus === config.LOSE_TXT)
    {
        document.getElementById('speech-txt').innerHTML = "HO SENTO!";
    }
}

function refreshScoreScreen(board)
{
    const score = document.querySelector(".pacman-score p:last-child");
    score.innerHTML = `${board.pacman.score} pt`;
}