export default class maze {
  constructor(width, height, cellwidth, cellheight) {
    this.width = width;
    this.height = height;
    this.cellWidth = cellwidth;
    this.cellHeight = cellheight;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("height", height);
    this.canvas.setAttribute("width", width);
    this.maxRows = height / cellheight;
    this.maxColumns = width / cellwidth;
  }

  //Sole purpose of this function is to generate an array with the information
  // of the cells. 1 means closed 0 means open
  generate() {
    this.maze = [];
    for (let i = 0; i < this.maxColumns; i++) {
      let row = [];
      for (let j = 0; j < this.maxRows; j++) {
        row.push(1);
      }
      this.maze.push(row);
    }
  }

  draw(ctx) {
    this.maze.forEach((element, cIndex) => {
      element.forEach((cell, rIndex) => {});
    });
  }
}
