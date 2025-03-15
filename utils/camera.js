export default class Camera{

    constructor(game){
        this.game=game;
        this.player=game.player
        
        this.camX=this.player.x
        this.camY=this.player.y
    }
    update(){
        this.camX=this.player.x
        this.camY=this.player.y
    }
    limitCamera(xMin, xMax, yMin, yMax){
        if(this.camX<yMin){
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