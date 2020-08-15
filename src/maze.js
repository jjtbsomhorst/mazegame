const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const BACK= -1;

class maze {
    constructor(width, height, cellwidth, cellheight) {
        this.width = width;
        this.height = height;
        this.cellWidth = cellwidth;
        this.cellHeight = cellheight;
        this.maxRows = height / cellheight;
        this.maxColumns = width / cellwidth;
        this.changed = false;
    }

    generate() {
        this.maze = [];
        for (let i = 0; i < this.maxColumns; i++) {
            let row = [];
            for (let j = 0; j < this.maxRows; j++) {
                row.push(1);
            }
            this.maze.push(row);
        }

        this.createMaze(0, 15);

        this.changed = true;
    }

    createMaze(x, y) {
        this.visitedList = [];
        this.step(x, y);
    }

    didWeVisit(x, y) {
      if (x < 0 || x > this.maxColumns) {
        return true;
      }
      if(y < 0 || y > this.maxRows){
        return true;
      }

      return (this.visitedList.indexOf("" + x + ":" + y) >= 0);
    }

    visited(x, y) {
        this.visitedList.push("" + x + ":" + y);
    }

    hasUnvisitedNeighbours(x, y) {
        // check top,left,bottom,right
        return !(this.didWeVisit(x, y - 1) &&
            this.didWeVisit(x + 1, y) &&
            this.didWeVisit(x, y + 1) &&
            this.didWeVisit(x - 1, y));
    }

    pickneighbour(x, y) {
        let n = Math.floor(Math.random() * 3);
        switch (n) {
            case TOP:
                if (y - 1 >= 0 && !this.visited(x, y - 1)) {
                    return TOP;
                }
            case RIGHT:
                if (x + 1 <= this.maxColumns && !this.visited(x + 1, y)) {
                    return RIGHT;
                }
            case BOTTOM:
                if (y + 1 <= this.maxRows && !this.visited(x, y + 1)) {
                    return BOTTOM;
                }
            case LEFT:
                if(x - 1 > 0  && !this.visited(x-1,y)){
                 return LEFT;
                }
            default:
                return BACK;
        }
    }

    step(x, y) {
        let key = ""+x+":"+y;
      this.open(x,y);
      if(this.hasUnvisitedNeighbours(x,y)) {
          let nb = this.pickneighbour(x, y);
          switch (nb) {
              case TOP:
                  this.open(x, y);
                  return this.step(x, y - 1);
              case RIGHT:
                  this.open(x, y);
                  return this.step(x + 1, y);
              case BOTTOM:
                  this.open(x, y);
                  return this.step(x, y + 1);
              case LEFT:
                  this.open(x, y);
                  return this.step(x - 1, y);
              case BACK:

                  let index = this.visitedList.indexOf(key);
                  if (index - 1 > 0) {
                      let prevKey = this.visitedList[index - 1];
                      return this.step(prevKey.split(":")[0], prevKey.split(":")[1]);
                  }
          }
      }else{
          let indexOf = this.visitedList.indexOf(key);
          if(indexOf !== 0){

              let prevKey = this.visitedList[indexOf-1];

              return this.step(prevKey.split(":")[0], prevKey.split(":")[1]);
          }
      }
    }

    draw(ctx) {
        if (this.changed) {
            for (let i = 0; i < this.maze.length; i++) {
                for (let j = 0; j < this.maze[i].length; j++) {
                    if (this.maze[i][j]) {
                        ctx.fillStyle = "#000000";
                    } else {
                        ctx.fillStyle = "#FFFFFF";
                    }
                    ctx.fillRect(i * this.cellWidth, j * this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
            this.changed = false;
        }
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
}

export default maze;