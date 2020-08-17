export default class Cell{
    constructor(x,y,parent){
        this.x = x;
        this.y = y;

        this.key = "".concat(this.x,":",this.y);
        this.parent = parent;

    }

    setParent(p){
        this.parent = p;
    }

}