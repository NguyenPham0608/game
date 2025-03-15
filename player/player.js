export default class Player {
    constructor(game) {
        this.game=game;
        this.runningImg=new Image();
        this.actionImg=new Image();
        this.spriteSheet=new Image();
        this.runningImg.src='images/cat.png';
        this.actionImg.src='images/action.png';
        this.spriteSheet.src="images/spritesheet.png"
        this.spriteWidth=220;
        this.spriteHeight=278.5;
        this.scale=0.4;
        this.t=0
        this.falling=0
        this.sx=0
        this.sy=0
        this.offsetX=(this.spriteWidth*this.scale/2)
        this.offsetY=(this.spriteHeight*this.scale/2)+19
        this.x=300
        this.y=0
        this.camX=0
        this.camY=0
        this.acceleration=1.4
        this.gravity=0.2
        this.playerState="fall"
    }
    draw(ctx) {


        this.t += Math.abs(this.sx / 8);
        let spriteX = 3 * this.spriteWidth; // Default to idle frame
    
        if (this.playerState === "run") {
            spriteX = this.spriteWidth * (Math.floor(this.t % 16));
        } else if (this.playerState === "jump") {
            spriteX = this.spriteWidth;
        } else if (this.playerState === "fall") {
            spriteX = this.spriteWidth * 2;
        }
    
        ctx.save(); // Save the current context state
    
        let drawX = this.x -this.camX- this.offsetX +this.game.canvas.width/2; // Default position
    
        if (this.sx < 0) {
            ctx.scale(-1, 1); // Flip horizontally
            drawX = -(this.x -this.camX- this.offsetX +this.game.canvas.width/2 + this.spriteWidth * this.scale); 
        }
        ctx.translate(drawX, this.y+this.offsetY-this.camY);
        ctx.drawImage(
            this.spriteSheet,
            spriteX,
            this.playerState === "run" ? this.spriteHeight : 0,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.spriteWidth * this.scale,
            this.spriteHeight * this.scale
        );
        ctx.restore(); // Restore the context state
    }
    
    update(){
        console.log(this.y)
        // this.camY+=(this.y-this.camY)/10
        this.sy-=this.gravity
        this.y-=this.sy
        if (this.y > this.game.canvas.height - this.game.ground.height) {
            this.y = this.game.canvas.height - this.game.ground.height;
            this.sy = 0;
            this.falling = 0;
        }else{
            this.falling++
            
        }
        if(this.falling>0){
            if(this.sy>0){
                this.playerState="jump"
            }else{
                this.playerState="fall"
            }
        }else{
            if(Math.round(Math.abs(this.sx))>0){
                this.playerState="run"
            }else{
                this.playerState="stand"
            }
        }
        if(this.game.left){
            this.sx-=this.acceleration
        }
        if(this.game.right){
            this.sx+=this.acceleration
        }
        if(this.game.up){
            if(this.falling<2228){
                this.sy+=1
            }
        }
        if(Math.abs(this.sx)<2){

        }
        this.x+=this.sx
        this.sx*=0.9
        this.camX=this.x
        this.camY=this.y
        this.limitCamera(0,1000000,0,1000)
    }

    limitCamera(xMin, xMax, yMin, yMax){
        if(this.camX<xMin){
            this.camX=xMin
        }
        if(this.camX>xMax){
            this.camX=xMax
        }
        if(this.camY<-yMax){
            this.camY=-yMax
        }
        if(this.camY>yMin){
            this.camY=yMin
        }
    }
    

}