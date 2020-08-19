export default class Cell{
    constructor(x,y,parent){
        this.x = parseInt(x);
        this.y = parseInt(y);
        if(isNaN(this.x)){
            console.log('kak');
            console.log(x);
        }
        if(isNaN(this.y)){
            console.log('kak');
            console.log(y);
        }
        this.key = "".concat(this.x,":",this.y);
        this.parent = parent;

    }
    equals(cell){
        return (cell != null && cell.key === this.key);
    }
    setParent(p){
        this.parent = p;
    }
    getParent(){
        return this.parent;
    }

}