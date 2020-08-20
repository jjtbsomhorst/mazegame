import maze from "./maze/Maze";
import {MazeGenerator, EllersAlgoritm, RecursiveBackTracker} from "./maze/MazeGenerator";
import Puppet from "./puppet";
export default class game {
  constructor(canvas, width, height, cellwidth, cellheight) {

    canvas.setAttribute('width',width);
    canvas.setAttribute('height',height);
    this.context = canvas.getContext("2d");
    this.context.clearRect(0, 0, width, height);
    this.maze = new maze(width, height, cellwidth, cellheight, new RecursiveBackTracker());
    this.puppets = [];
  }

  init() {
    this.maze.generate();
    console.log(this.puppetcount);
    for(let i = 0 ; i < this.puppetcount ; i++){
      this.puppets.push(new Puppet(this.maze));
    }
    this.gameLoop();
  }

  getMaze(){
    return this.maze;
  }

  gameLoop() {
    requestAnimationFrame((dt) => {
      this.maze.draw(this.context);
      for(let i = 0; i < this.puppets.length;i++){
        this.puppets[i].update(dt,this.context);
      }
      this.onAnimationFrame(dt);
    });
  }

  onAnimationFrame(timestamp) {
    this.gameLoop();
  }

  setPuppetCount(number) {
    this.puppetcount = 5;
    // console.log('puppetcount');
    // console.log(number);
    // this.puppetcount = number;
    // // this.puppetcount = number > 0 ? number: 10;
    // // console.log(this.puppetcount);
  }
}
