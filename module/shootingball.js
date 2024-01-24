import { circle,angle, calAngle} from "./canvas.js"

class Ball {
    constructor(x,y,angle,width,height,speed){
        this.x = x
        this.y = y
        this.r = 8
        this.color = "white"
        this.angle = angle
        this.speed = speed
        this.cp = null
        this.pp = {x,y}
        this.cCount = 0
        this.onTouch = false
        this.width = width
        this.height = height
    }

}

Ball.prototype.draw = function (ctx){
    if(!this.onTouch)
    circle(ctx,this.x,this.y,this.r,this.color)
 } 


 Ball.prototype.update = function(){
   if(!this.onTouch){
    this.x += this.speed * Math.cos(this.angle*(Math.PI/180)) 
    this.y += this.speed * Math.sin(this.angle*(Math.PI/180)) 
   }
 }


 Ball.prototype.colision = function(){
    if(this.x >this.width){
        this.cp = {x:this.x,y:this.y}
        const theta = angle(this.cp.x,this.cp.y,this.pp.x,this.pp.y)
        if(this.cp.y < this.pp.y){
            this.angle = 180 + theta
            this.pp = {...this.cp}
            this.cCount ++
        }
        else{
            this.angle = 180 - theta
            this.pp = {...this.cp}
            this.cCount ++
        }
    }
    else if(this.y < 10){
        this.cp = {x:this.x,y:this.y}
        const theta = angle(this.cp.x,this.cp.y,this.pp.x,this.pp.y)
        if(this.cp.x > this.pp.x){
            this.angle =  theta
            this.pp = {...this.cp}
            this.cCount ++
        }
        else{
            this.angle = 180 -  theta
            this.pp = {...this.cp}
            this.cCount ++
        }
    }
    else if(this.x < 10){
        this.cp = {x:this.x,y:this.y}
        const theta = angle(this.cp.x,this.cp.y,this.pp.x,this.pp.y)
        if(this.cp.y < this.pp.y){
            this.angle = 270 + theta
            this.pp = {...this.cp}
            this.cCount ++
        }
        else{
            this.angle =  theta
            this.pp = {...this.cp}
            this.cCount ++
        }
    }
 }



 Ball.prototype.gTouch = function(x,y){
    if(this.y > this.height-30)
    if(this.cCount > 0)
      if(this.x > x){
        this.angle = 180
      }
      else{
        this.angle = 0
      }
    if(this.cCount > 0){
        const dis = Math.sqrt(Math.pow(this.x - x,2) + Math.pow(this.y-y,2))
        if(dis<50 && this.y > this.height-30){
         this.onTouch = true
        }
    }
 }



 Ball.prototype.sColision = function(midPoint,radius){
    const dis = Math.sqrt(Math.pow(this.x-midPoint.x,2)+Math.pow(this.y-midPoint.y,2))
    if(dis+this.speed < radius){
       this.cp = {x:this.x,y:this.y}
       let theta = angle(this.cp.x,this.cp.y,this.pp.x,this.pp.y)
       const checkAngle = calAngle(midPoint.x,midPoint.y,this.cp.x,this.cp.y)
       if(theta === 0)
       theta = Math.floor((Math.random()*90)+1)

       if(checkAngle >= 315 && checkAngle <= 360)
        this.angle = 90-theta 
       else if(checkAngle >=0 && checkAngle <=45)
       this.angle = 360 - theta
       else if(checkAngle >= 270 && checkAngle <= 315)
       this.angle = 270 - theta
       else if(checkAngle >= 225 && checkAngle < 270)
       this.angle = 360 - theta
       else if(checkAngle >= 180 && checkAngle < 255)
       this.angle = 180 - theta
       else if(checkAngle >= 135 && checkAngle < 180)
       this.angle = 180 + theta
       else if(checkAngle >= 90 && checkAngle < 135)
       this.angle = 90 - theta
       else if(checkAngle >= 45 && checkAngle < 90)
       this.angle = 180 - theta
   this.pp = {...this.cp}
   this.cCount++
   if(!this.angle){
       this.angle = 90
   }
   return true
}
 }

export {Ball}