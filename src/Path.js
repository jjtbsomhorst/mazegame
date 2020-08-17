import Cell from './Cell';

/**
 * find a way out of a maze
*
 *
 */
export default class Path{
    constructor(maze,start){

        this.maze = maze;
        this.start = new Cell(
            parseInt(start[0]),
            parseInt(start[1]),
        );
        this.visitedList = [];
    }
    findPath(){
        console.log('find the path');
        setTimeout(()=>{
            this.getPath(this.start);
        },1000);

    }

    /**
     * 1 for the current cell
     *  find adjacent cells
     *  if(children)
     *      pick the first
     *      check if we already visited
     *          pick another one
     *      else
     *          go to 1
     *   else
     *      if(parent go 1 with parent
     *      else die
     *
     *
     * @param start
     */
    getPath(start){
        console.log('generate path');
        if(!this.isOnVisitedlist(start)){
            this.visitedList.push(start);
            let children = this.getAdjacentNodes(start);
            for(const c of children){
                if(!this.isOnVisitedlist(c)){
                    c.setParent(start);
                    // setTimeout(()=>{this.getPath(c)},500);
                    return this.getPath(c);
                }
            }
            if(start.parent != null){
                return this.getPath(start.parent);
            }
        }else{
            console.log('We are already visited.. Lets see if we have unvisited children');
            let children = this.getAdjacentNodes(start);
            for(const c of children){
                if(!this.isOnVisitedlist(c)){
                    this.visitedList.push(c);
                    // c.setParent(start);
                    setTimeout(()=>{this.getPath(c)},1000);
                }
            }
            return false;
        }

    }

    getAdjacentNodes(currentNode){
        let adjacent = [];
        // north
        if(this.maze.isOpen(currentNode.x,currentNode.y-1)){
            adjacent.push(new Cell(
               currentNode.x,
               currentNode.y-1,
               currentNode.g+1,
                currentNode.end,
            ));
        }

        // east
        if(this.maze.isOpen(currentNode.x+1,currentNode.y)){
            adjacent.push(new Cell(
                currentNode.x+1,
                currentNode.y,
                currentNode.g+1,
                currentNode.end,
            ));
        }
        // south
        if(this.maze.isOpen(currentNode.x,currentNode.y+1)){
            adjacent.push(new Cell(
                currentNode.x,
                currentNode.y+1,
                currentNode.g+1,
                currentNode.end,
            ));
        }
        // west
        if(this.maze.isOpen(currentNode.x-1,currentNode.y)){
            adjacent.push(new Cell(
                currentNode.x-1,
                currentNode.y,
                currentNode.g+1,
                currentNode.end,
            ));
        }
        return adjacent;
    }

    isOnVisitedlist(cell){
        for(let c of this.visitedList){
            if(c.key === cell.key){
                return true;
            }
        }
        return false;
    }
    isOnClosedList(cell){
        for(let c of this.closedList){
            if(c.key === cell.key){
                return true;
            }
        }
        return false;
    }
    sortOpenList(){
        // console.log('sort the openlist');
        this.openList.sort((p1,p2)=>{
           if(p1.f > p2.f ){
               return 1;
           }
           if(p1.f < p2.f ){
               return -1;
           }
           return 0;
        });
    }

    findLowest(){
        return this.openList.reduce((min,p)=>{
            if(p.f < min){
                return p;
            }else if(min < p.f){
                return min;
            }else{
                return this.openList[0];
            }
        });
        return lowest;
    }

    draw(ctx,node){
        // color the current cell dark
        // color the visited cells bright
        let previousFillStyle = ctx.fillStyle;
        for(const c of this.visitedList){
            ctx.fillStyle = "#5dffb1";
            if(this.visitedList.indexOf(c)  === this.visitedList.length-1){
                ctx.fillStyle = "#fc0000";
            }

            ctx.fillRect(c.x*10,c.y*10,10,10);
            ctx.fillStyle = previousFillStyle;

        }
        ctx.fillStyle = previousFillStyle;
        // console.log('draw the path');
        // if(node == null){
            // node = this.findLowest();
            // if(node != null){
            //     let previousFillStyle = ctx.fillStyle;
            //     ctx.fillStyle = "#000066";
            //     ctx.fillRect(node.x*10,node.y*10,10,10);
            //     ctx.fillStyle = previousFillStyle;
            //     this.draw(ctx,node.parent);
            // }
        // }
    }
}