import Entity from './entity.js';
import {layout} from '../config.js';

export default class Enemy extends Entity {
    constructor(numEnemy) {
        super(6);
        this.numEnemy = numEnemy;
        this.originalNumber = 0; 
    }

    moveRandomly() {
        const possibleDirections = ["up", "down", "left", "right"];
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        this.calculateNewPosition(randomDirection);
    }

    calculateNewPosition(randomDirection) {
        // Copia la posición actual del Pacman
        let newX = this.x;
        let newY = this.y;

        
        
        // Calcula la nueva posición según la dirección aleatoria
        if (randomDirection === 'up') {
            newY--;
        } else if (randomDirection === 'down') {
            newY++;
        } else if (randomDirection === 'left') {
            newX--;
        } else if (randomDirection === 'right') {
            newX++;
        }

        this.originalNumber = layout[newY][newX];
        console.log(this.numEnemy+" - "+this.originalNumber)

        if (
            newX >= 0 &&
            newY >= 0 &&
            newY < layout.length &&
            newX < layout[0].length &&
            [0, 2, 3, 4].includes(layout[newY][newX]) // Asegúrate de que la nueva posición sea 0, 2, 3 o 4
        ) 
        {

            layout[this.y][this.x] = this.originalNumber;
            this.x = newX;
            this.y = newY;
            layout[this.y][this.x] = this.boardNum;
        }
    }
}