import rw from './randomwalk'

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
canvas.setAttribute('style','border: 1px solid black');
let r = new rw(canvas,640,480);
r.draw();
document.body.appendChild(canvas);