import { rect,text } from "./canvas.js"


class Squre{
    constructor(x,y,w,h,color,value,radii,speed){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.value = value
        this.midP = {x:x+w/2,y:y+h/2}
        this.radii = radii
        this.speed = speed
    }
}

//draw method

Squre.prototype.draw = function(ctx){
    rect(ctx,this.x,this.y,this.w,this.h,this.color,this.radii)
    text(ctx,this.midP.x,this.midP.y+8,20,this.value,this.color)
}

//update method

Squre.prototype.update = function(){
    this.y += this.speed
    this.midP = { x:this.x+this.w/2,y:this.y+this.h/2}
}

// sack method

Squre.prototype.sack = function (){
    if(this.value < 2){
        this.color = "red"
    } 
}

export {Squre}