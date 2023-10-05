const teclasFlecha = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
};


export function inputDetected(event,pacman) {
    switch (event.key) {
        case teclasFlecha.LEFT:
            console.log('Tecla Izquierda presionada');
            pacman.directionChange('left',false);
            break;
        case teclasFlecha.RIGHT:
            console.log('Tecla Derecha presionada');
            pacman.directionChange('right',false);
            break;
        case teclasFlecha.UP:
            console.log('Tecla Arriba presionada');
            pacman.directionChange('up',false);
            break;
        case teclasFlecha.DOWN:
            console.log('Tecla Abajo presionada');
            pacman.directionChange('down',false);
            break;
    }
}
