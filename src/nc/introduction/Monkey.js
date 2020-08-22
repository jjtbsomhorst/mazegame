export default class Monkey{
    constructor(width,height){
        this.x = this.random (0,width);
        this.y = this.random(0,height);
        this.width = 50;
        this.height = this.random(50,80);
    }
    random(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    draw(dt,ctx){
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}