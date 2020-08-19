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
import Path from './Path';

const STARTCOLOR = "#df2935";
const PATHCOLOR = "#0eff00";
const ENDCOLOR = "#0004e3";
class puppet{

    constructor(maze){
        this.maze = maze;
        this.health = 100;
        this.dt = -1;
        this.path = null;
        this.color = STARTCOLOR;
    }

    update(dt,ctx){
        if(this.path == null){
            this.path = new Path(this.maze);
            this.path.findPath();
        }

        if(this.dt === -1){
            this.dt = dt;
        }

        if(dt - this.dt > 100){

            this.dt = dt;

            this.draw(ctx);
        }

    }

    /**
     * We move on to the next step in the path
     * if the next step is not _'free' we generate a new path from the current position and wait
     * for the next tick
    */


    draw(ctx){
        this.update(ctx);
        let previousFillStyle = ctx.fillStyle;
        ctx.fillStyle = STARTCOLOR;
        ctx.fillRect(this.path.getStart().x*10,this.path.getStart().y*10,10,10);
        ctx.fillStyle= ENDCOLOR;
        ctx.fillRect(this.path.getEnd().x*10,this.path.getEnd().y*10,10,10);

        let currentNode = this.path.getNextOnPath();
        if(currentNode != null){
            ctx.fillStyle = PATHCOLOR;
            ctx.fillRect(currentNode.x*10,currentNode.y*10,10,10);
        }

        ctx.fillStyle = previousFillStyle;
    }

}

export default puppet;