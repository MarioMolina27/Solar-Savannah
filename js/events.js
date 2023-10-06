export function nextObjectEvent(pacmanPlayer,num)
{
    const score = document.querySelector(".pacman-score p:last-child");
    switch (num) {
        case 0:
            pacmanPlayer.score += 1;
            const scoreText = pacmanPlayer.score + " pt";
            score.innerHTML = `${pacmanPlayer.score} pt`;
            break;
        case 3:
           
            break;
    }
}