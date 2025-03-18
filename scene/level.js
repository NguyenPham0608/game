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
        console.log(this.tileGrid)
    }
    drawLevel(){
        this.tileIndex=0
        this.tileX=(window.innerWidth/2)

        for(let i=0;i<this.gridWidth;i++){
            this.tileY=0
            for(let j=0;j<this.gridHeight;j++){
                const tileImgSrc = this.tileGrid[this.tileIndex];
                this.addTile(this.tileX, this.tileY,tileImgSrc,this.tileIndex);
                
                this.tileY+=32
                this.tileIndex++

            }
            this.tileX+=32
        }


    }
    update(){
        const mouseTileIndex=(this.getMouseTileIndex(this.game.controls.mouseX+(this.game.camX-window.innerWidth/2),this.game.controls.mouseY))
        if(this.game.controls.mouseDown){
            this.addTile(this.game.controls.mouseX+this.game.camX-this.tileSize/2,this.game.controls.mouseY+this.game.camY-this.tileSize/2,10,mouseTileIndex);
            

        }
        this.tiles.forEach(tile => {
            tile.update();
            tile.draw(this.game.ctx);
        });
        if(this.game.controls.space){
            // console.log(this.tileGrid)
        }
    }
    addTile(x, y, tileImgSrc,index) {
        // Snap the x and y coordinates to the grid by rounding them to the nearest tile size
        const snappedX = Math.floor((x + this.tileSize / 2) / this.tileSize) * this.tileSize;
        const snappedY = Math.floor((y + this.tileSize / 2) / this.tileSize) * this.tileSize;
        // Check if a tile already exists at the snapped position
        const tileExists = this.tiles.some(tile => tile.x === snappedX && tile.y === snappedY);
        if(tileExists){
            const tileClone = this.tiles.find(tile => tile.x === snappedX && tile.y === snappedY);
            console.log(tileClone.type)
            if(tileClone.type==2){
                console.log(tileClone)
                this.tiles.push(new Tile(snappedX, snappedY, this.game, tileImgSrc, index));
                tileClone.type=10
                this.tileGrid[index]=10
            }
        }else{
            this.tiles.push(new Tile(snappedX, snappedY, this.game, tileImgSrc,index));

        }
        // Only add the tile if there isn't already one at that position

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
    getMouseTileIndex(x,y){
        const tileGridX = Math.floor((x / 32));
        const tileGridY = Math.floor((y / 32));
        const tileIndex = tileGridY +( this.game.level.gridHeight * tileGridX);
        return tileIndex
    }
}
