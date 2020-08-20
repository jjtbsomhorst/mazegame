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
        this.path = [];
        let openSet = [];
        let closedSet = [];
        openSet.push(this.start);

        while(openSet.length > 0){
            let current = this.getLowest(openSet);

            if(current.equals(this.end)){
                console.log('we hebben een pad');
                return this.traversePath(current);
            }

            this.removeFromList(openSet,current);
            closedSet.push(current);
            let neighbours = this.getAdjacentNodes(current);
            for(const n of neighbours){
                if(this.inList(closedSet,n)){
                    continue;
                }
                var tempG = current.g+1;
                if(this.inList(openSet,n)){
                    if(tempG < n.g){
                        n.g = tempG;
                    }
                }else{
                    n.g = tempG;
                    openSet.push(n);
                }
                n.setParent(current);
                n.h = this.heuristic(n,this.end);
                n.f = n.g+n.h;
            }
        }
        this.start = this.maze.getStart();
        this.end =this.maze.getEnd(this.start);
        return this.findPath();

    }

    heuristic(start,end){
        return Math.abs(start.x-end.x)+ Math.abs(start.y-end.y);
    }

    inList(list,entry){
        for(let i = 0; i < list.length;i++){
            if(list[i].equals(entry)){
                return true;
            }
        }
        return false;
    }
    removeFromList(list,entry){
        let index = -1;
        for(let i = 0; i < list.length;i++){
            if(list[i].equals(entry)){
                index = i;
                break;
            }
        }
        if(index > -1) {
            list.splice(index, 1);
        }
    }

    getLowest(list){
       let lowest = list[0];
       for(let i= 0;i<list.length;i++){
           if(list[i].f < lowest.f){
               lowest = list[i];
           }
       }
       return lowest;
    }
    sortQueue(q){
        return q.sort((a,b)=>{
            if(a.getDistance() > b.getDistance()){
                return 1;
            }
            if(a.getDistance() < b.getDistance()){
                return -1;
            }
            return 0;
        });
    }

    traversePath(cell) {
        this.path.push(cell);
        if(cell.getParent() == null){
            console.log('we are at home');
            return this.path;
        }
        return this.traversePath(cell.getParent());
    }


    getAdjacentNodes(currentNode,closedList){
        let adjacent = [];
        // north
        if(this.maze.isOpen(currentNode.x,currentNode.y-1)){
            let north = new Cell(currentNode.x,currentNode.y-1);
            adjacent.push(north);

        }

        // east
        if(this.maze.isOpen(currentNode.x+1,currentNode.y)){
            let east = new Cell(currentNode.x+1,currentNode.y);
            adjacent.push(east);
        }
        // south
        if(this.maze.isOpen(currentNode.x,currentNode.y+1)){
            let south = new Cell(currentNode.x,currentNode.y+1);
            adjacent.push(south);
        }
        // west
        if(this.maze.isOpen(currentNode.x-1,currentNode.y)){
            let west = new Cell(currentNode.x-1,currentNode.y);
            adjacent.push(west);
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