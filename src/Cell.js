export default class Cell{
    constructor(x,y,parent){
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.f = 0;
        this.g = 0;
        this.h = 0;

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
    getDistance(){
        return this.distance;
    }

    setDistance(d){
        this.distance= d;
    }

    equals(cell){
        if(cell == null){
            return false;
        }
        return (cell.key == this.key);
    }
    setParent(p){
        this.parent = p;
    }
    getParent(){
        return this.parent;
    }

}