export default class Entity {
    constructor(boardNum) {
        this.x = null;
        this.y = null;
        this.direction = "left ";
        this.boardNum = boardNum;
        this.divElement = null;
    }
}