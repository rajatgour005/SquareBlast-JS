import { circle } from "./canvas.js"

class BonusBall{
    constructor(x,y){
        this.x = x
        this.y = y
        this.r = 5
        this.angle = null
        this.speed = 12
        this.c = "g"
    }
}

// draw method

BonusBall.prototype.draw = function(ctx){
    circle(ctx,this.x,this.y,this.r,"white")
}

// update method

BonusBall.prototype.update = function(x,y,height){
    if(this.angle){
        const dis = Math.sqrt(Math.pow(x-this.x,2)+Math.pow(y-this.y,2))
        this.x += this.speed * Math.cos(this.angle*(Math.PI/180))
        this.y += this.speed * Math.sin(this.angle*(Math.PI/180))
        if(this.y > height){
            if(this.x > x)
            this.angle = 180
            else
            this.angle = 360
        }
        if(dis < 50)
        return true
        return false
    }
}

// check distance for ball

BonusBall.prototype.check = function(x,y){
    const dis = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2))
    if(dis<15){
       this.angle = 90
    }
}

// Emphasis effects

BonusBall.prototype.Emphasis = function(){
   if(this.c==='g'){
     this.r +=1
     if(this.r===10)
     this.c='s'
   }
   else{
     this.r-=1
     if(this.r===5){
        this.c = 'g'
     }
   }
}


export {BonusBall}