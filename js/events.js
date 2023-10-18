import{gameLoopInterval,timerInterval} from './main.js'
export function nextObjectEvent(pacmanPlayer,num)
{
    const score = document.querySelector(".pacman-score p:last-child");
    switch (num) {
        case 0:
            pacmanPlayer.score += 1;
            const scoreText = pacmanPlayer.score + " pt";
            score.innerHTML = `${pacmanPlayer.score} pt`;
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
                gameOver();
            }
            break;
    }
}


function gameOver()
{
    let mapElement = document.querySelector('.map');
                let rect = mapElement.getBoundingClientRect();

                let altura = mapElement.offsetHeight;
                let ancho = mapElement.offsetWidth;

                let gameOverDiv = document.createElement('div');
                gameOverDiv.style.position = 'fixed';
                gameOverDiv.style.top = rect.top + 'px';
                gameOverDiv.style.left = rect.left + 'px';
                gameOverDiv.style.width = ancho + 'px';
                gameOverDiv.style.height = altura + 'px';
                gameOverDiv.style.display = 'flex';
                gameOverDiv.style.justifyContent = 'center';
                gameOverDiv.style.alignItems = 'center';
                gameOverDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                gameOverDiv.style.color = 'white';
                gameOverDiv.style.fontFamily = 'Arial';
                gameOverDiv.style.fontSize = '2em';
                gameOverDiv.textContent = "YOU LOSE";
                document.body.appendChild(gameOverDiv);

                clearInterval(gameLoopInterval);
                clearInterval(timerInterval);
}