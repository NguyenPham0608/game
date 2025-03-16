import Tile from "./tile.js";
export default class Level {
    constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img.src = "images/tile.png";
        this.tiles = []; // Holds the ground tiles
        this.tileSize = 32; // Size of each ground tile (can be adjusted based on your needs)
    }
    update(){
        if(this.game.controls.mouseDown){
            this.addTile(this.game.controls.mouseX+this.game.camX-this.tileSize/2,this.game.controls.mouseY+this.game.camY-this.tileSize/2);
            

        }
        this.tiles.forEach(tile => {
            tile.update();
            tile.draw(this.game.ctx);
        });
        if(this.game.controls.space){
            console.log(this.tiles)
        }
    }
    addTile(x, y) {
        // Snap the x and y coordinates to the grid by rounding them to the nearest tile size
        const snappedX = Math.floor((x + this.tileSize / 2) / this.tileSize) * this.tileSize;
        const snappedY = Math.floor((y + this.tileSize / 2) / this.tileSize) * this.tileSize;
    
        // Check if a tile already exists at the snapped position
        const tileExists = this.tiles.some(tile => tile.x === snappedX && tile.y === snappedY);
    
        // Only add the tile if there isn't already one at that position
        if (!tileExists) {
            this.tiles.push(new Tile(snappedX, snappedY, this.game));
        }
    }
    
    
    
}
