import Cell from './Cell';

/**
 * find a way out of a maze
*
 *
 */
export default class Path{
    constructor(maze){
        this.maze = maze;
        this.start = maze.getStart();
        this.end = maze.getEnd(this.start);
        this.visitedList = [];
        this.path = [];
        this.pathNode = -1;
    }

    getStart(){
        return this.start;
    }

    getEnd(){
        return this.end;
    }

    findPath(){
        console.log('we zoeken een pad');
        console.log(this.start);
        console.log(this.end);
        return this.getPath(this.start);
    }

    /**
     * @param start
     */
    getPath(start){
        if(!this.isOnVisitedlist(start)){
            this.visitedList.push(start);
            let children = this.getAdjacentNodes(start);
            for(const c of children){
                if(!this.isOnVisitedlist(c)){
                    c.setParent(start);
                    return this.getPath(c);
                }
            }
            if(start.parent != null){
                return this.getPath(start.parent);
            }
        }else{
            if(this.end.key === start.key){
                console.log('path gevonden');
                this.end.setParent(start);
                return this.traversePath(this.end);
            }

            let children = this.getAdjacentNodes(start);
            for(const c of children){
                if(!this.isOnVisitedlist(c)){
                    this.visitedList.push(c);
                    c.setParent(start);
                    return this.getPath(c);
                }
            }

            if(start.key === this.start.key) {
                console.log('geen path?');
                this.visitedList = [];
                this.start = this.maze.getStart();
                this.end = this.maze.getEnd(this.start);
                return this.getPath(this.start);
            }

            return this.getPath(start.parent);
        }

    }

    traversePath(cell) {
        this.path.push(cell);
        if(cell.getParent() == null){
            console.log('we are at home');
            return this.path;
        }
        return this.traversePath(cell.getParent());
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

    getNextOnPath(){
        if(this.path.length > 0) {
            if (this.pathNode < this.path.length) {
                this.pathNode +=1;
                return this.path[this.pathNode];
            }
        }
        return null;
    }

    isOnVisitedlist(cell){
        for(let c of this.visitedList){
            if(c.key === cell.key){
                return true;
            }
        }
        return false;
    }
}