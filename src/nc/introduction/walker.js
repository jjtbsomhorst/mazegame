import Vector from "./Vector";
export default class Walker {

    constructor(width,height){
        console.log('we walkk the canvas');
        this.v = new Vector(this.random(0,width),this.random(0,height));
    }
    random(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    draw(dt,ctx){

        let r = Math.random(1);
        console.log('----')
        console.log(this.v);
        let direction = [1,2,3,4].shuffle()[0];
        switch(r){
            case 1:
                this.v.add(new Vector(0,-1));
                break;
            case 2:
                this.v.add(new Vector(-1,0));
                break;
            case 3:
                this.v.add(new Vector(0,1));
                break;
            case 4:
                this.v.add(new Vector(1,0));
                break
        }
        console.log(this.v);
        console.log('----')
        ctx.fillStyle ="#000000";
        ctx.fillRect(this.v.x,this.v.y,1,1);

    }
}