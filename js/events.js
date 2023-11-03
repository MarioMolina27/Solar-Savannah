import{gameLoopInterval,timerInterval,totalPoints,totalPowerUps} from './main.js'
export function nextObjectEvent(num,board)
{
    const score = document.querySelector(".pacman-score p:last-child");
    switch (num) {
        case 0:
            board.pacman.score += 1;
            const scoreText = board.pacman.score + " pt";
            score.innerHTML = `${board.pacman.score} pt`;
            if(board.pacman.score === totalPoints && board.pacman.powerUpPicked === totalPowerUps)
            {
                board.pacman.canMove = false; 
                gameOver("YOU WIN");
            }
            break;
        case 6:
            if(!board.pacman.powerUpActive)
            {
                board.pacman.canMove = false; 
                setTimeout(() => {
                    board.pacman.canMove = true; 
                }, 1000);
                board.pacman.currentLifes--;
                board.pacman.createHearts();
                board.pacman.returnOriginalPosition();
    
                if(board.pacman.currentLifes === 0)
                {
                    board.pacman.canMove = false; 
                    gameOver("YOU LOSE");
                }
            }
            break;
        case 3:
            board.pacman.powerUpPicked += 1;
            if(board.pacman.score === totalPoints && board.pacman.powerUpPicked === totalPowerUps)
            {
                board.pacman.canMove = false; 
                gameOver("YOU WIN");
            }
            else
            {
                board.pacman.powerUpActive = true;
                console.log("activado el power up");
                setTimeout(function () {
                    board.pacman.powerUpActive = false;
                    console.log("ya no tienes el powerUp");
                }, 30000); 
            }
    }
}


function gameOver(finishStatus)
{
    let gameOverScreen = document.getElementById('gameOverScreen');
    let mapElement = document.querySelector('.map');
    let altura = mapElement.offsetHeight;
    let ancho = mapElement.offsetWidth;
    gameOverScreen.style.width = ancho + 'px';
    gameOverScreen.style.height = altura + 'px';

    let title = gameOverScreen.querySelector('#gameOverScreen h2');
    gameOverScreen.style.display ="flex";
    title.innerHTML = finishStatus;
    clearInterval(gameLoopInterval);
    clearInterval(timerInterval);


    let resetBtn = document.querySelector('.js-restart-btn');
    resetBtn.addEventListener('click', function(event) {
        window.location.reload();
    });
}