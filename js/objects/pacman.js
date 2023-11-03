import {layout} from '../config.js';
import {nextObjectEvent} from '../events.js';
import Entity from './entity.js';
import * as config from '../config.js';

 export default class Pacman extends Entity {
    constructor() {
        super(config.pacman);
        this.xOriginal = null;
        this.yOriginal = null;
        this.lifes = 3;
        this.currentLifes= this.lifes;
        this.score = 0;
        this.powerUpPicked=0;
        this.searchPosition();
        this.powerUpActive = false;
        this.canMove = true;  
    }

    directionChange = (newDirection,rePrintBoard) =>{
        switch (newDirection) {
            case "up":
                if(this.canMove)
                {
                    this.direction = "up";
                    this.divElement.style.transform = "rotate(-90deg)"; 
                    if(!rePrintBoard)
                    {
                        this.moveUp();
                    }
                }
                else
                {
                    console.log("no te puedes mover");
                }
                break;
            case "down":
                if(this.canMove)
                {
                    this.direction = "down";
                    this.divElement.style.transform = "rotate(90deg)"; 
                    if(!rePrintBoard)
                    {
                        this.moveDown();
                    }
                }
                else
                {
                    console.log("no te puedes mover");
                }
                break;
            case "left":
                if(this.canMove)
                {
                    this.direction = "left";
                    this.divElement.style.transform = "rotate(180deg)";
                    if(!rePrintBoard)
                    {
                        this.moveLeft();
                    }
                }
                else
                {
                    console.log("no te puedes mover");
                }
                break;
            case "right":
                if(this.canMove)
                {
                    this.direction = "right";
                    this.divElement.style.transform = "rotate(0deg)";
                    if(!rePrintBoard)
                    {
                        this.moveRight();
                    }
                }
                else
                {
                    console.log("no te puedes mover");
                }
                break;
        }
    }

    searchPosition =() =>
    {
        let i = 0;
        let found = false;

        do {
            let j = 0;
            do {
                if (layout[i][j] === this.boardNum) {
                    this.x = j; 
                    this.xOriginal = this.x;
                    this.y = i; 
                    this.yOriginal = this.y;
                    found = true; 
                }
                j++;
            } while (j < layout[i].length&& !found);

            
            i++;
        } while (i < layout.length&& !found);
    }

    moveLeft = () => 
    {
        this.move(-1, 0);
    }
    
    moveUp = () => 
    {
        this.move(0, -1);
    }
    
    moveDown = () => 
    {
        this.move(0, 1);
    }
    
    moveRight = () => 
    {
        this.move(1, 0);
    }
    
    move(dx, dy) 
    {
        const nextX = this.x + dx;
        const nextY = this.y + dy;
    
        if (this.isValidMove(nextX, nextY)) 
        {
            nextObjectEvent(layout[nextY][nextX], this.board);
            layout[this.y][this.x] = config.empty;
            this.x = nextX;
            this.y = nextY;
            layout[this.y][this.x] = this.boardNum;
            this.board.printBoard();
        }
        else 
        {
            console.log("Colisión");
        }
        nextObjectEvent(layout[nextY][nextX], this.board);
    }
    
    isValidMove(nextX, nextY) 
    {
        return (
            nextX >= config.point &&
            nextX < layout[0].length &&
            nextY >= config.point &&
            nextY < layout.length &&
            layout[nextY][nextX] !== config.wall &&
            layout[nextY][nextX] !== config.enemie
        );
    }

    createHearts = () => 
    {
        const pacmanLifes = document.querySelector(".pacman-lifes");
        pacmanLifes.innerHTML = "";
        for(let i =1;i<=this.lifes;i++)
        {
            if(i<=this.currentLifes)
            {
                const heart = document.createElement('img');
                heart.classList.add("heart");
                heart.src = './media/img/life.png';
                heart.alt = '';
                pacmanLifes.appendChild(heart);
            }
            else
            {
                const heart = document.createElement('img');
                heart.classList.add("heart");
                heart.src = './media/img/notlife.png';
                heart.alt = '';
                pacmanLifes.appendChild(heart);
            }
            
        }
    }

    returnOriginalPosition = () => {
            layout[this.y][this.x] = config.empty;
            console.log(this.xOriginal + " - " + this.yOriginal);
            this.x = this.xOriginal;
            this.y = this.yOriginal;
            layout[this.y][this.x] = config.pacman;
        }
}