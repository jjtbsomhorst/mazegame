/**
 * this class contains the metadata of a maze so we can draw on it and set various properties
 *
 * @type {number}
 */

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const BACK= -1;

class maze {
    constructor(width, height, cellwidth, cellheight,generator) {
        this.width = width;
        this.height = height;
        this.cellWidth = cellwidth;
        this.cellHeight = cellheight;
        this.maxRows = height / cellheight;
        this.maxColumns = width / cellwidth;
        this.changed = false;
        this.maze = [];
        this.generator = generator;
        this.doors = [];
    }

    generate() {
        for(let y = 0; y < this.maxRows;y++){
            let row = [];
            for(let x=0; x < this.maxColumns;x++){
                row.push(1);
            }
            this.maze.push(row);
        }
        this.generator.setMaze(this);
        this.generator.generate();
        this.changed = true;
        this.doors = [];

        for(let x = 0; x < this.maxColumns;x++){
            if(this.maze[0][x] === 0 ){
                this.doors.push("".concat(x,":",0))
            }
            if(this.maze[this.maxRows-1][x] === 0){
                this.doors.push("".concat(x,":",this.maxRows-1))
            }
        }
        for(let y = 0; y < this.maxRows;y++){
            if(this.maze[y][0] === 0){
                this.doors.push("".concat(0,":",y));
            }
            if(this.maze[y][this.maxColumns-1]===0){
                this.doors.push("".concat(this.maxColumns-1,":",y));
            }
        }
    }



    draw(ctx) {
        if (this.changed) {
            for(let y = 0 ; y < this.maxRows;y++){
                for(let x = 0; x < this.maxColumns;x++){
                    if(this.maze[y][x] === 1){
                        ctx.fillStyle = "#000000";
                    }
                    else{
                        ctx.fillStyle = "#FFFFFF";
                    }
                    ctx.fillRect(x*this.cellWidth,y*this.cellHeight,this.cellWidth,this.cellHeight);
                }
            }
            this.changed = false;
        }
    }

    getStart(){
        return this.doors.shuffle()[0].split(":");
    }

    getEnd(start){
        let end = this.doors.shuffle()[0];
        if(start[0] === end.split(":")[0]){
            return this.getEnd(start);
        }
        return end.split(":");
    }

    open(x, y) {
        this.toggle(x, y, 0);
    }

    close(x, y) {
        this.toggle(x, y, 1);
    }

    toggle(x, y, state) {
        if (this.maze.length > x) {
            if (this.maze[x].length > y) {
                if (this.maze[x][y] !== state) {
                    this.maze[x][y] = state;
                    this.changed = true;
                }
            }
        }
    }

    isOpen(x,y){
        if(x > -1 && x < this.maxColumns && y > -1 && y < this.maxRows){
            return this.maze[y][x] === 0;
        }
        return false;
    }
}

export default maze;