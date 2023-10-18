import { pacman } from "./config.js";

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
            break;
    }
}