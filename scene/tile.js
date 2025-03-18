export default class Tile {
    constructor(x,y,game,imgSrc,index) {
        this.x=x;
        this.y=y;
        this.index=index
        this.type=imgSrc;
        this.imgSrc=imgSrc
        this.img=new Image();
        this.img.src=`images/${imgSrc}.png`;
        this.loaded = false; // Track whether the image is ready

        this.img.onload = () => {
            this.loaded = true; // Mark the image as loaded
        };

        this.img.onerror = () => {
            console.error(`Failed to load image: ${this.img.src}`);
        };
        this.game=game
    }
    update(){

    }
    draw(ctx) {
        if (this.loaded) {
            ctx.drawImage(this.img,this.x-this.game.camX,this.y-this.game.camY);

        }
    }
}