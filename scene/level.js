import Tile from "./tile.js";
export default class Level {
    constructor(game, width, height) {
        this.game = game;
        this.img = new Image();
        this.img.src = "images/10.png";
        this.tiles = []; // Holds the ground tiles
        this.tileGrid = [];
        this.gridWidth = width;
        this.gridHeight = height;
        this.tileSize = 32; // Size of each ground tile (can be adjusted based on your needs)
        this.tileIndex = 0;
        this.tileX=0
        this.tileY=0
        this.generateLevel();
        this.drawLevel();

    }
    drawLevel(){
        this.tileIndex=0
        this.tileX=16
        for(let i=0;i<this.gridWidth;i++){
            this.tileY=16
            for(let j=0;j<this.gridHeight;j++){
                const tileImg = new Image();
                tileImg.src = `images/${this.tileGrid[this.tileIndex]}.png`;
                console.log(tileImg)

                this.addTile(this.tileX, this.tileY, tileImg);
                
                this.tileY+=32
                this.tileIndex++

            }
            this.tileX+=32
        }


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
    generateLevel(){
        this.addWallColumn();
        for (let i = 0; i < this.gridWidth-2; i++) {
            this.addBoxedColumn();
        }
        this.addWallColumn();
    }
    addWallColumn(){
        for(let i=0;i<this.gridHeight;i++){
            this.tileGrid.push(10);
        }
    }

    addBoxedColumn(){
        this.tileGrid.push(10);
        for(let i=0;i<this.gridHeight-2;i++){
            this.tileGrid.push(2);
        }
        this.tileGrid.push(10);
    }
    
}
