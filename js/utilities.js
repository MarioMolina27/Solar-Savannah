import * as config from "./config.js";
import Enemy from './objects/enemy.js';
import { gameBoard } from './main.js';
import {pickPowerup} from './events.js'

export function countItems() {
    const totalItems = [0,0];
  
    for (let i = 0; i < config.layout.length; i++) 
    {
      for (let j = 0; j < config.layout[i].length; j++) 
      {
        if (config.layout[i][j] === 0) 
        {
          totalItems[0]++;
        } 
        else if (config.layout[i][j] === 3) 
        {
          totalItems[1]++;
        }
      }
    }
    return totalItems;
}

export function findEnemies() 
{
    const enemies = [];
    let num = 1;
    for (let y = 0; y < config.layout.length; y++) 
    {
        for (let x = 0; x < config.layout[y].length; x++) 
        {
            if (config.layout[y][x] === config.enemie) 
            {
                const enemy = new Enemy(num);
                enemy.x = x;
                enemy.y = y;
                enemies.push(enemy);
                num++;
            }
        }
    }

    return enemies;
}

 export function findEnemyIndex(x, y, gameBoard) 
 {
    let index = -1;
    for (let i = 0; i < gameBoard.enemies.length; i++) 
    {
        const enemy = gameBoard.enemies[i];
        if (enemy.x === x && enemy.y === y) 
        {
            index = i; 
            
        }
    }
    return index; 
}

export function killEnemy(gameBoard,enemyIndex) 
{
    if (enemyIndex !== -1) 
    {
        const enemy = gameBoard.enemies[enemyIndex];

        if (enemy.aux === config.point) 
        {
            console.log("Punto de enemigo conseguido");
            gameBoard.pacman.score++;
            gameBoard.pacman.pointsPicked++;
        } 
        else if (enemy.aux === config.powerup) 
        {
            gameBoard.powerUpPicked++;
            pickPowerup(gameBoard);
        }
        enemy.reestartNewPosition();
    }
}

export function posibleRestartsEnemy()
{
    let positions = [];

    for (let row = 0; row < config.layout.length; row++) 
    {
        for (let col = 0; col < config.layout[row].length; col++) 
        {
            if (config.layout[row][col] === 2 && !gameBoard.enemies.some(enemy => enemy.x === col && enemy.y === row)) 
            {
                positions.push([row, col]);
            }
        }
    }
    return positions;
}

export function getRandomPositionFromArray(array) 
{
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}