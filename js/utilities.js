import * as config from "./config.js";
import Enemy from './objects/enemy.js';
import { gameBoard } from './main.js';

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

export function killEnemie(x,y,gameBoard)
{
    gameBoard.enemies.forEach(enemie => {
        if(enemie.x===x && enemie.y===y)
        { 
            if(enemie.aux === config.point)
            {
                console.log("punto de enemigo conseguido");
                gameBoard.pacman.score++;
            }
            enemie.reestartNewPosition();
        }
    });
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