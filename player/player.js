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
        this.offsetX=(this.spriteWidth*this.scale)/2
        this.offsetY=(this.spriteHeight*this.scale)/2
        this.height=(((this.spriteHeight-110)*this.scale)/2)

        this.x=200
        this.y=300
        this.camX=0
        this.camY=0
        this.acceleration=1.4
        this.gravity=0
        this.playerState="fall"
        this.solid=null
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
        ctx.translate(drawX, this.y-this.camY-this.offsetY);
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
        // this.camY+=(this.y-this.camY)/10
        this.sy-=this.gravity

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
        // if(this.game.left){
        //     this.sx-=this.acceleration
        // }
        // if(this.game.right){
        //     this.sx+=this.acceleration
        // }
        if(this.game.left){
            this.sx=-5
        }else{
            if(this.game.right){
                this.sx=5
            }else{
                this.sx=0
            }
        }

        // if(this.game.up){
        //     if(this.falling<8){
        //         this.sy=14
        //     }
        // }

        if(this.game.down){
            this.sy=-5
        }else{
            if(this.game.up){
                this.sy=5
            }else{
                this.sy=0
            }
        }
        if(Math.abs(this.sx)<2){

        }
        this.x+=this.sx
        this.fixCollisionInDirection(this.sx,0)
        this.y-=this.sy
        this.fixCollisionInDirection(0,-this.sy)
        // this.sx*=0.94

        
        this.handleCamera()

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
    getTileAt(x,y){
        const tileGridX = Math.floor((x / 32));
        const tileGridY = Math.floor((y / 32));
        const tileIndex = tileGridY +( this.game.level.gridHeight * tileGridX);
        const tile=this.game.level.tileGrid[tileIndex]
        // console.log(tile)
        return tile
    }
    handleCamera(){
        this.camX+=(this.x-this.camX)/6
        this.camY+=(this.y-this.camY)/6
        this.limitCamera(window.innerWidth/2,100000,0,10000)
    }

    fixCollisionInDirection(dx, dy){
        this.solid=null
        // const tile=this.getTileAt(this.x,this.y)
        this.fixCollisionAtPoint(this.x, this.y-(this.height-10))
        this.fixCollisionAtPoint(this.x, this.y)
        this.fixCollisionAtPoint(this.x, this.y+this.height)

        if(this.solid>0){
            this.x-=dx
            this.y-=dy
        }
    }
    fixCollisionAtPoint(x,y){
        const tile=this.getTileAt(x,y)
        if(tile>2){
            this.solid=10
        }
    }
    
}