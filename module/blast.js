import { circle } from "./canvas.js"

class BlastP{
    constructor(x,y,r,color,angle,speed){
        this.ox = x
        this.oy = y
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.angle = angle
        this.speed = speed
    }
}

// draw method 

BlastP.prototype.draw = function(ctx){
    circle(ctx,this.x,this.y,this.r,this.color)
}

//update method

BlastP.prototype.update = function(){
    this.x += this.speed * Math.cos(this.angle*(Math.PI/180))
    this.y += this.speed * Math.sin(this.angle*(Math.PI/180))
}

// checkDis method

BlastP.prototype.checkDis =   function (radius){
    const dis = Math.sqrt(Math.pow(this.ox-this.x,2)+Math.pow(this.oy-this.y,2))
    if(dis > radius)
    return true
    return false
}

export {BlastP}