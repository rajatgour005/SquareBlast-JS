import { rect,text} from "./canvas.js"

class BlastBox{
    constructor(x,y,w,h,color,radii,speed){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.radii = radii
        this.speed = speed
    }
}

// draw method
BlastBox.prototype.draw = function(ctx){
    rect(ctx,this.x,this.y,this.w,this.h,this.color,this.radii)
    text(ctx,this.x+(this.w/2),this.y+(this.h/2)+10,35,"💣","black")
}

// update method

BlastBox.prototype.update = function (){
    this.y+= this.speed
}

// nearme method

BlastBox.prototype.nearMe = function(x,y,dis){
    return(
        Math.sqrt(
            Math.pow((this.x+(this.w/2))-x,2)
            +
            Math.pow((this.y+(this.h/2))-y,2)
        ) < dis
    )
}

export {BlastBox}