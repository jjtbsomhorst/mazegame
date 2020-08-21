/**
 * this class con   tains the metadata of a maze so we can draw on it and set various properties
 *
 * @type {number}
 */

import Cell from "./Cell";

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
    }

    draw(ctx) {
        if (this.changed) {
            console.log('draw the maze');
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
        return this.doors.shuffle()[0];
    }

    getEnd(start){
        let d = this.doors.shuffle()[0];

        if(start.equals(d) || start.x === d.x || start.y === d.y){
            return this.getEnd(start);
        }
        return d;
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
                    if(state === 0) {
                        if(x === 0 || x === this.maxRows-1){
                            this.doors.push(new Cell(x, y));
                        }
                        if(y === 0 || y === this.maxColumns-1){
                            this.doors.push(new Cell(x,y));
                        }

                    }
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