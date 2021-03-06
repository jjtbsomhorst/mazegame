import Walker from "./walker";
import Vector from "./Vector";
import Gravity from "./Gravity";
import Wind from "./Wind";
import Drag from "./Drag";

export default class accelleration{
    constructor(canvas,width,height){
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.canvas.setAttribute('width',width);
        this.canvas.setAttribute('height',height);
        this.walkers = [];
        this.forces = [];
        this.setup();

        this.ctx = this.canvas.getContext("2d");
    }

    setup(){

        this.forces.push(new Gravity(0,0.3));
        this.forces.push(new Wind(0.0,0));
        this.forces.push(new Drag());
        // add entities
        for(let i = 0; i < 10; i++){
            let p = Vector.random2D(this.width,this.height);
            this.walkers.push(new Walker(p,Math.floor(Math.random()*5)));
        }
    }

    checkEdges(walker){
        if(walker == null){
            return;
        }
        if (walker.location.x > this.width) {
            walker.location.x = this.width;
            walker.velocity.x *= -1;
        } else if (walker.location.x < 0) {
            walker.velocity.x *= -1;
            walker.location.x = 0;
        }

        if (walker.location.y > this.height) {
            walker.velocity.y *= -1;
            walker.location.y = this.height;
        }



    }

    applyForces(){
        for(const w of this.walkers){
            this.checkEdges(w);
            for(const f of this.forces){
                f.apply(w);
            }
            // this.checkEdges(w);
        }
    }

    gameLoop() {
        requestAnimationFrame((dt) => {
            this.applyForces();
            this.checkEdges();
            this.draw(dt);
            this.gameLoop();


        });
    }

    draw(dt){
        this.ctx.clearRect(0,0,this.width,this.height);
        for(const w of this.walkers){
            w.draw(dt,this.ctx);
        }

    }
}
