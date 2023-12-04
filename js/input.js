const teclasFlecha = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
};

export let interval;
let time = 160;


export function inputDetected(event,pacman) {
    if (interval) {
        clearInterval(interval); 
    }
    switch (event.key) {
        case teclasFlecha.LEFT:
            document.getElementById('speech-txt').innerHTML = "Esquerra";
            interval = setInterval(function () {
                pacman.directionChange('left', false);
            }, time);
            break;
        case teclasFlecha.RIGHT:
            document.getElementById('speech-txt').innerHTML = "Dreta";
            interval = setInterval(function () {
                pacman.directionChange('right', false);
            }, time);
            break;
        case teclasFlecha.UP:
            document.getElementById('speech-txt').innerHTML = "Amunt";
            interval = setInterval(function () {
                pacman.directionChange('up', false);
            }, time);
            break;
        case teclasFlecha.DOWN:
            document.getElementById('speech-txt').innerHTML = "Abaix";
            interval = setInterval(function () {
                pacman.directionChange('down', false);
            }, time);
            break;
    }
}
