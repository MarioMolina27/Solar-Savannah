export default class Board {
  constructor(layout,containerSelector,pacman,enemies) {
    this.layout = layout;
    this.container = document.querySelector(containerSelector);
    this.pacman = pacman;
    this.enemies= enemies;
    this.pacman.board = this;
  }

  printBoard() { 
    //console.log("empezando a imprimir"); 
    this.container.innerHTML = "";
    this.layout.forEach((row, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row", `row-${rowIndex + 1}`);

      row.forEach(cell => {
        const cellElement = document.createElement("div");

        switch (cell) {
          case 0:
            cellElement.classList.add("point");
            break;
          case 1:
            cellElement.classList.add("wall");
            break;
          case 2:
            cellElement.classList.add("enemy-lair");
            break;
          case 3:
            cellElement.classList.add("powerup");
            break;
          case 4:
            cellElement.classList.add("empty");
            break;
          case 5:
            cellElement.classList.add("pacman");
            cellElement.id = "pacman";
            break;
          case 6:
            cellElement.classList.add("enemy");
            break;
        }

        rowElement.appendChild(cellElement);
      });

      this.container.appendChild(rowElement);
    });
    this.pacman.divElement =  document.getElementById('pacman');
    this.pacman.directionChange(this.pacman.direction,true);
  }
}