import Entity from './entity.js';
import * as config from '../config.js';
import * as utilities from '../utilities.js'

export default class Enemy extends Entity {
    constructor(numEnemy) {
        super(config.enemie);
        this.numEnemy = numEnemy;
        this.originalNumber = config.enemy_lair; 
        this.aux = config.empty;
        this.isAlive = true;
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
        this.originalNumber = config.layout[newY][newX];

        if (
            newX >= 0 &&
            newY >= 0 &&
            newY < config.layout.length &&
            newX < config.layout[0].length &&
            [config.point, config.enemy_lair, config.powerup, config.empty].includes(config.layout[newY][newX]) // Asegúrate de que la nueva posición sea 0, 2, 3 o 4
        ) 
        {
            config.layout[this.y][this.x] = this.aux;
            this.aux = this.originalNumber;
            this.x = newX;
            this.y = newY;
            config.layout[this.y][this.x] = this.boardNum;
        }
    }
    reestartNewPosition()
    {
        this.isAlive=false;
        let newPosition = utilities.getRandomPositionFromArray(utilities.posibleRestartsEnemy());
        this.x = newPosition[1];
        this.y = newPosition[0];
        this.aux = config.enemy_lair;
        setTimeout(() => {
            this.isAlive = true; 
        }, config.reapearEnemyDuration);
    }
}