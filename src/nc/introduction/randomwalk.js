import Walker from "./walker";
import Vector from "./Vector";

export default class randomWalk{
    constructor(canvas,width,height){
        this.width = width;
        this.height = height;
        this.ctx = canvas.getContext('2d');
        canvas.setAttribute('width',width);
        canvas.setAttribute('height',height);
        this.dt =  0;
        this.location = Vector.random2D(5,5);
        this.velocity = new Vector(5,0);

        this.acceleration = new Vector(0.5,0);
    }
    gameLoop() {
        requestAnimationFrame((dt) => {
            this.draw(dt);
            this.gameLoop();
        });
    }

    edges(){
        this.location.x = this.location.x > this.width ? 0 : this.location.x;
        this.location.y = this.location.y > this.height ? 0 : this.location.y;
    }

    draw(){
        this.edges();
        if(this.velocity.magnitude() > 25){
            this.acceleration.mult(-1);
        }
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.ctx.clearRect(0,0,this.width,this.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(this.location.x,this.location.y,10,10)

    }
    setup(){

    }

}
