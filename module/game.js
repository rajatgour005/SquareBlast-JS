import { createCanvas,calAngle,line,text} from "./canvas.js"
import { Ball } from "./shootingball.js"
import {Player} from "./player.js"
import { Squre } from "./squre.js"
import { BlastP } from "./blast.js"
import {BonusBall} from "./bonusball.js"
import { BlastBox } from "./blastbox.js"
import { Firecaker } from "./firecraker.js"


class Game {
    constructor(width,height,color){
        this.color = color
        this.width = width
        this.height = height
        this.ctx = null
        
        this.player = new Player(this.width/2,this.height-35,30,"white")
        this.angle = 270
        this.onAngle = true
        this.balls = []
        this.ballSpeed = 12
        this.numBall = 5
        this.onFire = true
        this.ballCount = 0

        this.blocks = []
        this.radii = [0,0,0,0]

        this.frame = 0

        this.score = 0
        this.highScore = 0

        this.particles = []
        this.blastColor = 'green'

        this.bonusBall = []
        this.bBallCount = 0

        this.animateStop = true

        this.level = 1
        this.lstatus = false
        this.limit = {l:5,h:10}
        this.line = 0

        this.boxH = 55
        this.boxW = 55
        this.boxSpeed = 15

        this.blastBox = []

        this.firecaker = null
        this.textFrame = 0

        this.scoreCard = {
            level:document.getElementById("level"),
            numBall:document.getElementById("numBall"),
            score:document.getElementById("score"),
            box:document.getElementById("score-card")
        }

        this.gameover = false
        this.wText = false
        this.messages = ["Great","super se upper","wow!","👌👌","❤️👍❤️","🫶","🙌🙌🙌"]
        this.message = "Great"
        this.instruction = true

     }

    setUpCanva(parent){
             this.ctx = createCanvas(this.width,this.height,this.color,parent)
    }

    drawPlayer(){
        this.player.draw(this.ctx)
    }

    sCard(){
        this.scoreCard.level.innerText = `level : ${this.level}`
        this.scoreCard.numBall.innerText = `balls : ${this.numBall}`
        this.scoreCard.score.innerText = `score : ${this.score}`
    }

    changeAngle(x,y){
         if(this.onAngle){
            const xangle = calAngle(this.player.x,this.player.y,x,y)
            if(xangle > 180 && xangle < 360)
            this.angle = xangle
         }
    }


    fire(){
        this.balls.push(new Ball(this.player.x,this.player.y,this.angle,this.width,this.height,this.ballSpeed))
    }


    createBoxes2(){
        this.radii = [
            Math.floor(Math.random()*10),
            Math.floor(Math.random()*20),
            Math.floor(Math.random()*10),
            Math.floor(Math.random()*10)
        ]
        const bBCount = Math.floor((Math.random()*3)+2)
        const numBBox = Math.floor((Math.random()*2)+1)
        const color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
        let count = 0
        let boxCount = 0
        this.blastColor = color
        for(let y=5;y<this.height-300;y+=this.boxH+10){
            for(let x=5;x<this.width-this.boxW;x+=this.boxW+10){
                const check = Math.cos((Math.random()*360)*(Math.PI/180))
                if(Math.round(check))
                this.blocks.push(new Squre(x,y,this.boxW,this.boxH,color,Math.floor(Math.random()*(this.limit.h-this.limit.l)+this.limit.l),this.radii,this.boxSpeed)) 
                else{
                    const c = Math.cos((Math.random()*360)*(Math.PI/180))
                    if(count < bBCount&& Math.round(c)){
                     this.bonusBall.push(new BonusBall(x+(this.boxW/2),y+(this.boxH/2)))
                     count++
                    }
                    else{
                        if(boxCount < numBBox && y > 10 && Math.round(c)){
                            this.blastBox.push(new BlastBox(x,y,this.boxW,this.boxH,color,this.radii,this.boxSpeed))
                            boxCount++
                        }
                    }     
                }  
            }
        }
    }




     createBlastParticle(x,y){
            let angle = 0
            for(let i=0;i<36;i++){
                this.particles.push(
                    new BlastP(x,y,5,this.blastColor,angle,5,50)
                )  
                angle+=10              
            }
     }


    animate(){
        this.ctx.clearRect(0,0,this.width,this.height)

        this.drawPlayer()
        this.drawLine()
        
        if(!this.onFire && this.ballCount < this.numBall){
            if(this.frame%5==0){
                this.fire()
                this.ballCount++
                if(this.onAngle){
                    this.onAngle = false
                }
            }
        }


        this.balls.forEach(ball=>{
            ball.draw(this.ctx)
            ball.update()
            ball.colision()
            ball.gTouch(this.player.x,this.player.y)
            
            this.blocks.forEach((block,index)=>{
                if(ball.sColision(block.midP,60)){
                    block.value--
                }
               if(block.value < 1){
                this.createBlastParticle(block.midP.x,block.midP.y)
                this.blocks.splice(index,1)
                this.score++
               }
            })
            
            this.bonusBall.forEach(bball=>{
                bball.check(ball.x,ball.y)
            })
        })

        if(this.balls.every(ball=>ball.onTouch) && this.balls.length > 0){
            this.onAngle = true
            this.onFire = true
            this.balls = []
            this.ballCount = 0
            this.numBall += this.bBallCount
            this.bBallCount = 0
            this.blocks.forEach(block=>{
                block.update()
            })
            this.blastBox.forEach(box=>{
                box.update()
            })
        }

        this.blocks.forEach(block=>{
             block.draw(this.ctx)
             block.sack()     
        })

        this.frame++
        if(this.frame===10)
        this.frame = 0
       
        if(this.blocks.length===0 && this.balls.length===0){
            this.line+=1
            if(this.line===2){
                this.level+=1
                this.line=0
                this.limit.h += 5
                this.limit.l += 3
                this.animateStop = true
                this.lstatus  = true
                this.firecaker = new Firecaker(this.ctx)
                this.scoreCard.box.style.display = "none"
                this.message = this.messages[Math.floor(Math.random()*this.messages.length)]
                this.boxSpeed += 2
            }
            this.bonusBall = []
            this.start()
            this.handleStore()
        }

        this.particles.forEach((part,index)=>{
            part.draw(this.ctx)
            part.update()
            if(part.checkDis(100))
            this.particles.splice(index,1)
        })
      

        this.bonusBall.forEach((ball,index)=>{
            ball.draw(this.ctx)
            ball.Emphasis()
            if(ball.update(this.player.x,this.player.y,this.height-30)){
                this.bonusBall.splice(index,1)
                this.bBallCount++
                
            }
        })


        this.blastBox.forEach((box,index)=>{
            box.draw(this.ctx)
            this.balls.forEach(ball=>{
                if(box.nearMe(ball.x,ball.y,50)){
                    this.blocks.forEach(block=>{
                        if(box.nearMe(block.midP.x,block.midP.y,80)){
                            block.value = 0
                        }
                    })
                    this.blastBox.splice(index,1)
                    this.createBlastParticle(box.x,box.y)
                }
            })
        })
        

        if(this.blocks.length > 0){
            const box = this.blocks.find(item=>{
                return item.y > this.height-100
            })
            
            const box2 = this.blocks.find(item=>{
                return item.y > this.height-150
            })
            
            if(box2){
                this.wText = true
            }
            else{
                this.wText = false
            }

            if(box){
                this.gameover = true
                this.scoreCard.box.display = "none"
            }
        }

        if(this.wText){
            if(this.frame%10===0){
                for(let x=100;x<this.width-100;x+=150){
                    text(this.ctx,x,this.height-10,30,"☠️","red")
                }
            }
        }
        this.sCard()
    }

    drawLine(){
        if(this.onAngle){
            const x = this.player.x + 80 * Math.cos(this.angle*(Math.PI/180))
            const y = this.player.y + 80 * Math.sin(this.angle*(Math.PI/180))
            line(this.ctx,this.player.x,this.player.y,x,y,this.blastColor)
        }
    }
     
    
    start(){
        this.createBoxes2()
    }
    
    startGame(){
       if(this.animateStop){
           this.ctx.clearRect(0,0,this.width,this.height)
           if(this.lstatus){
             this.firecaker.draw()
             if(this.firecaker.check()){
                this.firecaker = null
                this.lstatus = false
             }
             text(this.ctx,this.width/2,this.height/2,50,this.message,"white")
           }
           else{
              if(this.instruction){
                text(this.ctx,this.width/2,this.height/2,40,"Move your mouse to aim","white")
                text(this.ctx,this.width/2,this.height/2+50,40," click to shoot","white")
                this.frame+=1
                if(this.frame === 80){
                    this.instruction = false
                    this.frame = 0
                }
              } 
              else{
              text(this.ctx,this.width/2,this.height/2,50,`level ${this.level}`,"white")
              this.textFrame +=1
              if(this.textFrame > 50){
                this.textFrame = 0
                this.animateStop = false
                this.scoreCard.box.style.display = "flex"
              }
              }
           }
       }
       else if(this.gameover){
         this.ctx.clearRect(0,0,this.width,this.height)
         text(this.ctx,this.width/2,this.height/2-100,50,`game-over`,"white")
         text(this.ctx,this.width/2,this.height/2-40,30,"🥲🥲")
         text(this.ctx,this.width/2,this.height/2+10,30,`score:${this.score}`)
         text(this.ctx,this.width/2,this.height/2+50,30,`high-score:${this.highScore}`)
         text(this.ctx,this.width/2,this.height/2+100,30,"press r to restart")
       }
       else{
        this.animate()
       }
    }

    restart(){
        this.gameover = false
        this.balls = []
        this.blocks = []
        this.blastBox = []
        this.bonusBall = []
        this.score = 0
        this.frame = 0
        this.createBoxes2()
    }

    initialValues(){
        const store = JSON.parse(localStorage.getItem("store"))
        if(store){
            this.highScore = store.highScore
            this.level = store.level
            this.boxSpeed = store.boxSpeed
            this.limit = store.limit
            this.numBall = store.numBall
            this.line = store.line
            this.instruction = store.instruction
        }
        else{
            const obj = { 
               highScore:0,
               level:1,
               boxSpeed:15,
               limit:{l:5,h:10},
               numBall:5,
               line:0,
               instruction:true
            }
            localStorage.setItem("store",JSON.stringify(obj))
        }
    }
    
    handleStore(){
        const store = JSON.parse(localStorage.getItem("store"))
        const hScore = this.score > store.highScore ? this.score : store.highScore
        const obj = {
            boxSpeed:this.boxSpeed,
            numBall:this.numBall,
            level:this.level,
            highScore:hScore,
            limit:this.limit,
            line:this.line,
            instruction:false
        }
        localStorage.setItem("store",JSON.stringify(obj))
    }


    addEvent(){
        
        window.addEventListener("mousemove",(e)=>{
             this.changeAngle(e.x,e.y)
        })
        
        window.addEventListener("click",()=>{
           if(this.onFire)
           this.onFire = false
           
        })

        window.addEventListener("keypress",(e)=>{
           if(e.key==='r'){
            if(this.gameover){
                this.restart()
            }
           }
        })
    }
  
    
}

export {Game}