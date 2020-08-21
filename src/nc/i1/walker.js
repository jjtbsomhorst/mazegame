export default class Walker {

    constructor(width,height){
        console.log('we walkk the canvas');
        this.x = this.random(0,width);
        this.y = this.random(0,height);
    }
    random(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    draw(dt,ctx){
        let direction = [1,2,3,4].shuffle()[0];
        switch(direction){
            case 1:
                this.y--;
                break;
            case 2:
                this.x--;
                break;
            case 3:
                this.y++;
                break;
            case 4:
                this.x++;
                break
        }

        ctx.fillStyle ="#000000";
        ctx.fillRect(this.x,this.y,1,1);

    }
}