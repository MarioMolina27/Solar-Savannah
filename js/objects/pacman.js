import {layout} from '../config.js';
import {nextObjectEvent} from '../events.js';
import Entity from './entity.js';

 export default class Pacman extends Entity {
    constructor() {
        super(5);
        this.xOriginal = null;
        this.yOriginal = null;
        this.lifes = 3;
        this.currentLifes= this.lifes;
        this.score = 0;
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

    moveLeft = () => {
       
        const nextX = this.x - 1;
        
        if (nextX >= 0 && layout[this.y][nextX] !== 1 && layout[this.y][nextX] !==6) {  
            nextObjectEvent(this,layout[this.y][nextX]); 
            layout[this.y][this.x] = 4;
            this.x = nextX;
            layout[this.y][this.x] = this.boardNum;
            this.board.printBoard();
        } 
        else 
        {
            console.log("Colisión");
        }
        nextObjectEvent(this,layout[this.y][nextX]); 
    }

    moveUp = () => {
        
        const nextY = this.y - 1;
    
        
        if (nextY >= 0 && layout[nextY][this.x] !== 1 && layout[nextY][this.x] !== 6) 
        {
            nextObjectEvent(this,layout[nextY][this.x]);
            layout[this.y][this.x] = 4;
            this.y = nextY;
            layout[this.y][this.x] = this.boardNum;
        } 
        else 
        {
            console.log("Colisión");
        }
        nextObjectEvent(this,layout[nextY][this.x]); 
        this.board.printBoard();
    }
    
    moveDown = () => {
        const nextY = this.y + 1;
    
        if (nextY < layout.length && layout[nextY][this.x] !== 1 && layout[nextY][this.x] !== 6) {
            nextObjectEvent(this,layout[nextY][this.x]); 
            layout[this.y][this.x] = 4;
    
            this.y = nextY;

            layout[this.y][this.x] = this.boardNum;
        } 
        else 
        {
            console.log("Colisión");
        }
        nextObjectEvent(this,layout[nextY][this.x]); 
        this.board.printBoard();
    }
    
    moveRight = () => {
        
        const nextX = this.x + 1;
    
       
        if (nextX < layout[0].length && layout[this.y][nextX] !== 1 && layout[this.y][nextX] !== 6) {
             
            nextObjectEvent(this,layout[this.y][nextX]); 
            layout[this.y][this.x] = 4;
    
            this.x = nextX;
    
            layout[this.y][this.x] = this.boardNum;
        } 
        else 
        {
            console.log("Colisión");
        }
        nextObjectEvent(this,layout[this.y][nextX]); 
        this.board.printBoard();
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
                heart.src = './media/img/heart.png';
                heart.alt = '';
                pacmanLifes.appendChild(heart);
            }
            else
            {
                const heart = document.createElement('img');
                heart.classList.add("heart");
                heart.src = './media/img/heartvoid.png';
                heart.alt = '';
                pacmanLifes.appendChild(heart);
            }
            
        }
    }

    returnOriginalPosition = () => {
            layout[this.y][this.x] = 4;
            console.log(this.xOriginal + " - " + this.yOriginal);
            this.x = this.xOriginal;
            this.y = this.yOriginal;
            layout[this.y][this.x] = 5;
        }
}