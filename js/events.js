import{gameLoopInterval,timerInterval,totalPoints,totalPowerUps} from './main.js'
export function nextObjectEvent(pacmanPlayer,num)
{
    const score = document.querySelector(".pacman-score p:last-child");
    switch (num) {
        case 0:
            pacmanPlayer.score += 1;
            const scoreText = pacmanPlayer.score + " pt";
            score.innerHTML = `${pacmanPlayer.score} pt`;
            if(pacmanPlayer.score === totalPoints && pacmanPlayer.powerUpPicked === totalPowerUps)
            {
                pacmanPlayer.canMove = false; 
                gameOver("YOU WIN");
            }
            break;
        case 6:
            pacmanPlayer.canMove = false; 
            setTimeout(() => {
                pacmanPlayer.canMove = true; 
            }, 1000);
            pacmanPlayer.currentLifes--;
            pacmanPlayer.createHearts();
            pacmanPlayer.returnOriginalPosition();

            if(pacmanPlayer.currentLifes === 0)
            {
                pacmanPlayer.canMove = false; 
                gameOver("YOU LOSE");
            }
            break;
        case 3:
            pacmanPlayer.powerUpPicked += 1;
            if(pacmanPlayer.score === totalPoints && pacmanPlayer.powerUpPicked === totalPowerUps)
            {
                pacmanPlayer.canMove = false; 
                gameOver("YOU WIN");
            }
    }
}


function gameOver(finishStatus)
{
    let gameOverScreen = document.getElementById('gameOverScreen');
    let title = gameOverScreen.querySelector('#gameOverScreen h2');
    gameOverScreen.style.display ="flex";
    title.innerHTML = finishStatus;
    clearInterval(gameLoopInterval);
    clearInterval(timerInterval);
}