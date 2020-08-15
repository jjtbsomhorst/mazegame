import "./styles.css";
import game from "./game";

// implement sprintf

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}


document.body = document.createElement("body");
let canvas = document.createElement('canvas');
canvas.setAttribute('style','border: 1px solid black');
let g = new game(canvas, 640, 480, 10, 10);
g.setPuppetCount(5);
g.init();
document.body.appendChild(canvas);
