import { circle } from "./canvas.js"


class Firecaker{
    constructor(ctx){
        this.flyParticle = []
        this.blastParticel = []
        this.ctx = ctx
        this.create = false
    }

    createFParticle(){
        for(let i=0;i<25;i++){
            const x = Math.floor(Math.random()*window.innerWidth)
            this.flyParticle.push(
                new FlyParticle(x,window.innerHeight,5,Math.floor(Math.random()*10)+20)
            )
        }
    }

    draw(){
        if(!this.create){
            this.createFParticle()
            this.create = true
        }
        this.flyParticle.forEach((particle,index)=>{
            particle.draw(this.ctx)
            particle.update(this.ctx)
            if(particle.check()){
                this.blastParticel.push(new BlastParticle(particle.x,particle.y))
                this.flyParticle.splice(index,1)
            }
        })
        this.blastParticel.forEach((p,i)=>{
            p.draw(this.ctx)
            if(p.check())
            this.blastParticel.splice(i,1)
        })
    }

    check(){
        if(this.create && this.blastParticel.length===0 && this.flyParticle.length===0)
        return true
        return false
    }

}

class FlyParticle{
    constructor(x,y,r,velocity){
        this.x = x
        this.y = y
        this.r = r
        this.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
        this.a = 0.1
        this.gravity = 0.1
        this.velocity = velocity
    }
    draw(ctx){
        circle(ctx,this.x,this.y,this.r,this.color)
    }
    update(){
         this.y -= this.velocity
         this.a += this.gravity
         this.velocity -= this.a
    }
    check(){
        if(this.velocity < 0)
        return true
        return false
    }
}


class BlastParticle{
    constructor(x,y){
        this.x = x
        this.y = y
        this.particles = [] 
        this.create = true  
    }
    start(){
       for(let i=0;i<150;i++){
          this.particles.push(new Particle(this.x,this.y))
       }
    }
    draw(ctx){
        if(this.create){
            this.start()
            this.create = false
        }
       this.particles.forEach((p,i)=>{
          p.draw(ctx)
          p.update()
          if(p.checkDis(200)){
            this.particles.splice(i,1)
          }
    })
}
 
check(){
    if(!this.create && this.particles.length===0){
        return true
    }
    return false
}

    
}



class Particle{
    constructor(x,y){
      this.x = x
      this.y = y
      this.ox = x
      this.oy = y
      this.angle = Math.floor(Math.random()*360)
      this.speed = Math.floor((Math.random()*10)+5)
      this.color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
    }
    draw(ctx){
      circle(ctx,this.x,this.y,2,this.color)
    }
    update(){
       this.x += this.speed * Math.cos(this.angle*(Math.PI/180))  
       this.y += this.speed * Math.sin(this.angle*(Math.PI/180))  
    }
    checkDis(dis){
        const d = Math.sqrt(Math.pow(this.x-this.ox,2)+Math.pow(this.y-this.oy,2))
        if(d > dis)
         return true
        return false
    }

 }










export {Firecaker}