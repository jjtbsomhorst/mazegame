import Vector from "./Vector";
export default class Walker {

    constructor(location,m){
        this.location = location.clone();
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.mass = m;
    }

    update(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(f){
        let force = f.clone();
        force.div(this.mass);
        this.acceleration.add(force);
    }

    draw(dt,ctx){
        this.update();
        ctx.fillStyle ="#000000";
        // ctx.fill(this.location.x,this.location.y,10,10);
        ctx.beginPath();
        ctx.arc(this.location.x+5,this.location.y+5,5,0,2*Math.PI,false)
        ctx.fill();
        ctx.lineWidth  = 1;
        ctx.stroke()
    }
}