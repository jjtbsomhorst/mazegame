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

const COLORS = ["#26532B","#df2935","#fdca40"];

class puppet{

    constructor(maze){
        this.maze = maze;
        this.health = 100;
        this.dt = -1;
        this.path = null
        this.start = this.maze.getStart();
        this.end = this.maze.getEnd(this.start);
        this.color = COLORS.shuffle()[0];

    }

    findPath(){
        this.path = new Path(this.maze,this.start,this.end);
        this.path.findPath();
    }

    update(dt,ctx){
        if(this.path == null){
            this.path = new Path(this.maze,this.start,this.end);
            this.path.findPath()
        }

        if(this.dt === -1){
            this.dt = dt;
        }

        if(dt - this.dt > 1000){
            this.dt = dt;
            this.traversePath();
            this.draw(ctx);
        }

    }

    /**
     * We move on to the next step in the path
     * if the next step is not 'free' we generate a new path from the current position and wait
     * for the next tick
    */

    traversePath(){

    }
    draw(ctx){
        console.log('draw puppet');
        let previousFillStyle = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.start[0]*10,this.start[1]*10,10,10);
        ctx.fillStyle = previousFillStyle;

        this.path.draw(ctx);
    }

}

export default puppet;