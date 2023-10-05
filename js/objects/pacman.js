import {layout} from '../config.js';

 export default class Pacman {
    constructor() {
        this.x = null; // Posición en el eje X
        this.y = null; // Posición en el eje Y
        this.direction = "down"; // Dirección inicial 
        this.lifes = 3;
        this.boardNum = 5;
        this.pacmanElement = null;
        this.score = 0;
        this.searchPosition();
        this.board = null;
    }

    directionChange = (newDirection,rePrintBoard) =>{
        switch (newDirection) {
            case "up":
                this.direction = "up";
                this.pacmanElement.style.transform = "rotate(-90deg)"; 
                if(!rePrintBoard)
                {
                    this.moveUp();
                }
                break;
            case "down":
                this.direction = "down";
                this.pacmanElement.style.transform = "rotate(90deg)"; 
                if(!rePrintBoard)
                {
                    this.moveDown();
                }
                break;
            case "left":
                this.direction = "left";
                this.pacmanElement.style.transform = "rotate(180deg)";
                if(!rePrintBoard)
                {
                    this.moveLeft();
                }
                break;
            case "right":
                this.direction = "right";
                this.pacmanElement.style.transform = "rotate(0deg)";
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
                    this.x = j; // Establece this.x con la coordenada x encontrada
                    this.y = i; // Establece this.y con la coordenada y encontrada
                    found = true; // Cambia el estado a encontrado
                }
                j++;
            } while (j < layout[i].length&& !found);

            
            i++;
        } while (i < layout.length&& !found);
    }

    moveLeft = () => {
       
        const nextX = this.x - 1;
        
        if (nextX >= 0 && layout[this.y][nextX] !== 1) {
            
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
        // Calcula la próxima posición hacia arriba
        const nextY = this.y - 1;
    
        // Verifica si la próxima posición está dentro de los límites del array y no es igual a 1
        if (nextY >= 0 && layout[nextY][this.x] !== 1) {
            // Borra la posición actual de Pacman
            layout[this.y][this.x] = 4;
    
            // Actualiza la posición de Pacman hacia arriba
            this.y = nextY;
    
            // Coloca el número de Pacman en la nueva posición
            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        // Llama a la función para imprimir el tablero actualizado
        this.board.printBoard();
    }
    
    moveDown = () => {
        // Calcula la próxima posición hacia abajo
        const nextY = this.y + 1;
    
        // Verifica si la próxima posición está dentro de los límites del array y no es igual a 1
        if (nextY < layout.length && layout[nextY][this.x] !== 1) {
            // Borra la posición actual de Pacman
            layout[this.y][this.x] = 4;
    
            // Actualiza la posición de Pacman hacia abajo
            this.y = nextY;
    
            // Coloca el número de Pacman en la nueva posición
            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        // Llama a la función para imprimir el tablero actualizado
        this.board.printBoard();
    }
    
    moveRight = () => {
        // Calcula la próxima posición a la derecha
        const nextX = this.x + 1;
    
        // Verifica si la próxima posición está dentro de los límites del array y no es igual a 1
        if (nextX < layout[0].length && layout[this.y][nextX] !== 1) {
            // Borra la posición actual de Pacman
            layout[this.y][this.x] = 4;
    
            // Actualiza la posición de Pacman a la derecha
            this.x = nextX;
    
            // Coloca el número de Pacman en la nueva posición
            layout[this.y][this.x] = this.boardNum;
        } else {
            console.log("Colisión");
        }
    
        // Llama a la función para imprimir el tablero actualizado
        this.board.printBoard();
    }
    
}

