import { circle ,cir} from "./canvas.js"

class Player{
    constructor(x,y,r,color){
        this.x = x
        this.y = y
        this.r = r
        this.color = color
    }
    draw(ctx){
        // circle(ctx,this.x,this.y,this.r,"white")
        cir(ctx,this.x,this.y,this.r,"white")
        cir(ctx,this.x,this.y,this.r-5,"red")
        cir(ctx,this.x,this.y,this.r-10,"green")
        cir(ctx,this.x,this.y,this.r-15,"yellow")
        cir(ctx,this.x,this.y,this.r-20,"blue")
    }
}


export {Player}