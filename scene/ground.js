export default class Ground { 
    constructor(game) {
        this.game = game;
        this.canvas = this.game.canvas;
        this.height = 400;
        this.camX = this.game.camX;
        this.camY = this.game.camY;
        this.img = new Image();
        this.img.src = "images/ground3.png";
    }

    draw(ctx) {
        this.img.src = "images/ground3.png";
        
        this.camX = this.game.camX;
        this.camY = this.game.camY;

        const scale = (this.game.canvas.height / this.img.height) / 2;
        const imgWidth = this.img.width * scale;
        const imgHeight = this.img.height * scale;
        
        // Calculate the starting X and Y positions based on camera position
        const startX = (-this.camX % imgWidth + imgWidth) % imgWidth - imgWidth;
        const startY = ((-this.camY  + imgHeight)  - imgHeight)+144-this.height;

        // Calculate how many tiles are needed to fully cover the canvas
        const tilesX = Math.ceil(this.game.canvas.width / imgWidth) + 1;
        const tilesY = 1;

        // Draw tiled background
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                ctx.drawImage(this.img, startX + x * imgWidth, startY + y * imgHeight + this.canvas.height );
            }
        }
    }
    
    update() {

    }
}
