export default class BoundingBox {
    constructor(owner, width, height) {
        this.x = owner.x;
        this.y = owner.y;
        this.width = width;
        this.height = height;
    }
    update(){
        this.x = owner.x;
        this.y = owner.y;  
    }
    

}