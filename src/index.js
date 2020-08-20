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

if(!Array.prototype.shuffle){
    Array.prototype.shuffle = function() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
}


document.body = document.createElement("body");
let canvas = document.createElement('canvas');
// canvas.setAttribute('style','border: 1px solid black');
let g = new game(canvas, 1024, 768, 10, 10);
g.setPuppetCount(10);
g.init();
document.body.appendChild(canvas);
