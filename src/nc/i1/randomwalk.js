import Walker from "./walker";

export default class randomWalk{
    constructor(canvas,width,height){
        this.width = width;
        this.height = height;
        this.ctx = canvas.getContext('2d');
        canvas.setAttribute('width',width);
        canvas.setAttribute('height',height);
        this.dt =  0;
    }

    draw(){
        if(this.walkers == null){
            console.log('adding walkers');
            this.walkers = this.generateWalkers(1000);
        }
        requestAnimationFrame((dt)=>{

            if(this.dt === -1){
                this.dt = dt;
            }

            if(dt - this.dt > 100){
                this.dt = dt;
                for(const w of this.walkers){
                        w.draw(dt,this.ctx);
                }
            }


           this.draw();
        });
    }
    generateWalkers(amount){
        let walkers = [];

        for(let i = 0; i < amount ; i++){
            walkers.push(new Walker(this.width,this.height));
        }
        return walkers;
    }


}