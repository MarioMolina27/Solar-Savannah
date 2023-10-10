import {layout} from '../config.js';
import {nextObjectEvent} from '../events.js';
import Entity from './entity.js';

 export default class Pacman extends Entity {
    constructor() {
        super(5);
        this.lifes = 3;
        this.score = 0;
        this.searchPosition();
        this.board = null;
    }

    directionChange = (newDirection,rePrintBoard) =>{
        switch (newDirection) {
            case "up":
                this.direction = "up";
                this.divElement.style.transform = "rotate(-90deg)"; 
                if(!rePrintBoard)
                {
                    this.moveUp();
                }
                break;
            case "down":
                this.direction = "down";
                this.divElement.style.transform = "rotate(90deg)"; 
                if(!rePrintBoard)
                {
                    this.moveDown();
                }
                break;
            case "left":
                this.direction = "left";
                this.divElement.style.transform = "rotate(180deg)";
                if(!rePrintBoard)
                {
                    this.moveLeft();
                }
                break;
            case "right":
                this.direction = "right";
                this.divElement.style.transform = "rotate(0deg)";
                if(!rePrintBoard)
                {
                    this.moveRight();
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
                    this.y = i; 
                    found = true; 
                }
                j++;
            } while (j < layout[i].length&& !found);

            
            i++;
        } while (i < layout.length&& !found);
    }

    moveLeft = () => {
       
        const nextX = this.x - 1;
        
        if (nextX >= 0 && layout[this.y][nextX] !== 1) {
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
    }

    moveUp = () => {
        
        const nextY = this.y - 1;
    
        
        if (nextY >= 0 && layout[nextY][this.x] !== 1) {
            nextObjectEvent(this,layout[nextY][this.x]);  
            layout[this.y][this.x] = 4;
    
           
            this.y = nextY;
    
            
            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        this.board.printBoard();
    }
    
    moveDown = () => {
        const nextY = this.y + 1;
    
        if (nextY < layout.length && layout[nextY][this.x] !== 1) {
            nextObjectEvent(this,layout[nextY][this.x]);  
            layout[this.y][this.x] = 4;
    
            this.y = nextY;

            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        this.board.printBoard();
    }
    
    moveRight = () => {
        
        const nextX = this.x + 1;
    
       
        if (nextX < layout[0].length && layout[this.y][nextX] !== 1) {
            nextObjectEvent(this,layout[this.y][nextX]);  
           
            layout[this.y][this.x] = 4;
    
            this.x = nextX;
    
            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        this.board.printBoard();
    }
}