export default class Tile {
    constructor(x,y,game) {
        this.x=x;
        this.y=y;
        this.img=new Image();
        this.img.src="images/10.png";
        this.game=game
    }
    update(){

    }
    draw(ctx) {
        ctx.drawImage(this.img,this.x-this.game.camX,this.y-this.game.camY);
    }
}