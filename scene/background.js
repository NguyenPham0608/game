export default class Background {
    constructor(game) {
        this.game=game;
        this.img=new Image();
        this.camX=this.game.camX
        this.camY=this.game.camY

        // this.img.src="images/background.png";
        this.img.src="images/stars.jpg";
    }
    draw(ctx) {
        this.camX = this.game.camX;
        this.camY = this.game.camY;

        const scale=(this.game.canvas.height/this.img.height)/1.28
        const imgWidth = this.img.width*scale;
        const imgHeight = this.img.height*scale;
        
        // Calculate the starting X and Y positions based on camera position
        const startX = ((-this.camX/3 % imgWidth + imgWidth) % imgWidth - imgWidth);
        const startY = -(this.camY/3 % imgHeight)%imgHeight - imgHeight;

        // Calculate how many tiles are needed to fully cover the canvas
        const tilesX = Math.ceil(this.game.canvas.width / imgWidth) + 1;
        const tilesY = Math.ceil(this.game.canvas.height / imgHeight) + 1;

        // Draw tiled background
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                ctx.drawImage(this.img, startX + x * imgWidth, startY + y * imgHeight, imgWidth, imgHeight);
            }
        }
    }

    update(){
        
    }
}