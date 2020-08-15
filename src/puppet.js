/**
 * A puppet is a non playable character in the game
 * A puppet sole purpose is to find an exit in a given maze without being killed.
 * A puppet has health
 * A puppet has a starting spot
 * A puppet needs a destination
 * When a puppet is generated it will find a path first.
 * On each tick:
 *  check if the next entry in the path is still free
 *
 *  Free means:
 *      'open' ( white)
 *      'safe' not under fire of counter measures
 *      'clear' : no other puppet is currently occupying this
 *
 *  if so:
 *      move to that spot
 *  not
 *     define a new path
 *      get tot he first spot in the path
 *
 *
 */
class puppet{

    constructor(startx, starty, maze){
        this.x =startx;
        this.y = starty;
        this.maze = maze;
        this.health = 100;
        this.dt = -1;
    }

    update(dt,ctx){
        if(this.dt === -1){
            this.dt = dt;
        }

        if(dt - this.dt > 1000){
            this.dt = dt;
            this.draw(ctx);
        }

    }
    draw(ctx){
        console.log('lets draw');
        let previousFillStyle = ctx.fillStyle;
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(this.x,this.y,10,10);
        ctx.fillStyle = previousFillStyle;
    }

}

export default puppet;