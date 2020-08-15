import maze from "./maze";

export default class game {
  constructor(canvas, width, height, cellwidth, cellheight) {
    this.context = canvas.getContext("2d");
    this.context.clearRect(0, 0, width, height);
    this.maze = new maze(width, height, cellwidth, cellheight);
  }

  init() {
    this.maze.generate();
    this.gameLoop();
  }

  gameLoop() {
    requestAnimationFrame((dt) => {
      this.onAnimationFrame(dt);
    });
  }

  onAnimationFrame(timestamp) {
    this.gameLoop();
  }
}
