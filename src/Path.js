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

    findPath(index){
        console.log('start finding a path for '.concat(index));
        this.path = [];
        let openSet = [];
        let closedSet = [];
        openSet.push(this.start);

        while(openSet.length > 0){
            openSet = this.sortQueue(openSet);
            let current = openSet[0];
            if(current.equals(this.end)){
                console.log('we found a path for '.concat(index));
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
        // return this.findPath(index);
        console.log('we didnt find a path for '.concat(index));
        return []

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
        // console.log('get lowest in the list');
       let lowest = list[0];
       for(let i= 0;i<list.length;i++){
           if(list[i].f < lowest.f){
               lowest = list[i];
           }
       }
       return lowest;
    }
    sortQueue(q){
        if(q.length > 1){
            return q.sort((a,b)=>{
                if(a.f > b.f){
                    return 1;
                }
                if(a.f < b.f){
                    return -1;
                }
                return 0;
            });
        }
        return q;

    }

    traversePath(cell) {
        this.path.push(cell);
        if(cell.getParent() == null){
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

    getPreviousOnPath(){
        if(this.pathNode -1 < 1) {
            return this.getStart();
        }
        return this.path[this.pathNode-1];

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