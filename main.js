// imports
import Player from "./player/player.js";
import Enemy from "./player/enemy.js";
import Background from "./scene/background.js";
import Ground from "./scene/ground.js";
import Controls from "./utils/helper.js";
import Camera from "./utils/camera.js";
import Level from "./scene/level.js";

const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
export default class Game{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.controls=new Controls();
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.space=false
        this.mouseDown = this.controls.mouseDown;
        this.mouseX = this.controls.mouseX;
        this.mouseY = this.controls.mouseY;


        this.level=new Level(this);
        this.player = new Player(this);
        this.background = new Background(this);
        this.ground = new Ground(this);
        this.camera = new Camera(this);
        this.camX=this.player.camX
        this.camY=this.player.camY


    }
    update(){

        this.left = this.controls.left;
        this.right = this.controls.right;
        this.up = this.controls.up;
        this.down = this.controls.down;
        this.mouseDown = this.controls.mouseDown;
        this.mouseX = this.controls.mouseX;
        this.mouseY = this.controls.mouseY;
        this.space=this.controls.space  
        this.player.update();
        this.background.update();
        this.ground.update();
        this.background.draw(this.ctx);
        this.ground.draw(this.ctx);
        this.player.draw(this.ctx);
        this.camera.update();
        this.level.update();
        this.camX=this.player.camX
        this.camY=this.player.camY
    }   
}

const game=new Game(canvas,ctx);
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    game.update();
}

function adjustCanvasForHD() {
    const dpr = window.devicePixelRatio || 1; // Get the pixel ratio
    canvas.width = canvas.clientWidth * dpr;  // Scale width
    canvas.height = canvas.clientHeight * dpr; // Scale height
    ctx.scale(dpr, dpr); // Scale context to match resolution
}

// Call it once at the beginning
adjustCanvasForHD();

// Redraw everything after resizing the window
window.addEventListener("resize", adjustCanvasForHD);

animate();