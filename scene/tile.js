export default class Tile {
    constructor(x,y,game) {
        this.x=x;
        this.y=y;
        this.img=new Image();
        this.img.src="images/tile.png";
        this.game=game
    }
    update(){

    }
    draw(ctx) {
        ctx.drawImage(this.img,this.x-this.game.camX,this.y-this.game.camY);
    }
}