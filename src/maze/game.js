import maze from './Maze';
import {MazeGenerator, EllersAlgoritm, RecursiveBackTracker} from "./MazeGenerator";
import Puppet from "./puppet";
export default class game {
  constructor(canvas, width, height, cellwidth, cellheight) {

    canvas.setAttribute('width',width);
    canvas.setAttribute('height',height);
    this.context = canvas.getContext("2d");
    this.context.clearRect(0, 0, width, height);
    this.maze = new maze(width, height, cellwidth, cellheight, new RecursiveBackTracker());
    this.puppets = [];
    this.puppetCount = 5;
  }

  init() {
    this.maze.generate();
    console.log(this.puppetCount);
    for(let i = 0 ; i < this.puppetCount ; i++){
      let p = new Puppet(this.maze,i);
      p.init();
      this.puppets.push(p);
    }
    console.log('start the gameloop');
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
  setPuppetCount(c){
    this.puppetCount = c;
  }

  onAnimationFrame(timestamp) {
    this.gameLoop();
  }
}
