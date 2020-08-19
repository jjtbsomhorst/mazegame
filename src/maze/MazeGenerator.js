import Cell from '../Cell';

/**
 * this file contains various algoritms to generate a maze given a certain array of 'cells'
 *
 * - Ellers algoritm:  http://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm
 * - Recursive division: http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm
 * - RecursiveBackTracker: http://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking
 */
class MazeGenerator{
    constructor(){}
    generate(){}
    setMaze(maze){
        this.maze = maze;
    }
}
const DIRECTIONS = ['N','S','E','W'];

/** Some sort of recursive back tracker implementtion?? **/

class RecursiveBackTracker extends MazeGenerator{
    generate(){
        this.visitedList = [];
        this.carvePassage(0,0);
        this.visitedList = Array();
    }
    getDx(direction){
        switch(direction){
            case 'E': return -2;
            case 'W': return +2;
            default: return 0;
        }
    }
    getDy(direction){
        switch(direction){
            case 'N': return -2;
            case 'S': return +2;
            default: return 0;
        }
    }

    carvePassage(cx,cy){
        this.visitedList.push(cx+":"+cy);
        DIRECTIONS.shuffle();
        for(const d of DIRECTIONS){

            let nx = cx+this.getDx(d);
            let ny = cy+this.getDy(d);

            if(
                (nx >= 0 && nx <= this.maze.maxColumns) &&
                (ny >= 0 && ny <= this.maze.maxRows) && !this.isVisited(nx,ny)){
                // open passage:
                this.openPassage(ny,nx,d);
                this.maze.open(ny,nx);
                this.carvePassage(nx,ny);
            }
        }

    }

    openPassage(ny,nx,d){
        let py = ny;
        let px = nx;
        switch(d){
            case 'N':
                py = ny+1;

                break;
            case 'E':
                px = nx+1;
                break;
            case 'W':
                px = nx-1;
                break;
            case 'S':
                py = ny-1
        }
        this.maze.open(py,px);
    }

    isVisited(nx,ny){
        let key= nx+":"+ny;
        return (this.visitedList.indexOf(key) > -1)
    }
}

class Set{
    constructor(x,y){
        this.set = [];
        this.addCell(new Cell(x,y));
    }
    addCell(c){
        this.set.push(c);
    }
    hasCell(cell){
        for(let c of this.set){
            if(c.key === cell.key){

            }
        }
    }
}

class EllersAlgoritm extends MazeGenerator{

    constructor() {
        super();
        this.sets = [];
    }
    generate(){
        console.log('Ellers to the rescue');
    }
}

export {MazeGenerator,EllersAlgoritm,RecursiveBackTracker};
