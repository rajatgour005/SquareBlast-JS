
const createCanvas = (width,height,color,parent)=>{
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      canvas.style.backgroundColor = color
      parent.append(canvas)
      return canvas.getContext("2d")
}


const circle = (ctx,x,y,r,color)=>{
     ctx.beginPath()
     ctx.fillStyle = color
     ctx.arc(x,y,r,0,Math.PI*2)
     ctx.closePath()
     ctx.fill()
}

const calAngle = (x1,y1,x2,y2)=>{
      if(x1===x2){
            if(y1>y2){
                  return 270
            }
            else
            return 90
      }
      else if(y1===y2){
            if(x1>x2)
             return 180
            else
            return 0
      }
      else if(x1===x2&&y1===y2){
            return 0
      }
      else{
      const d1 = Math.sqrt(Math.pow((x2-x1),2)+ Math.pow(y2-y1,2))
      const d2  = Math.sqrt(Math.pow((x2-x1),2))
      const theta = Math.acos(d2/d1)* (180/Math.PI)
      
      if(x1 > x2){
            if(y1>y2)
            return 180 + theta
            else
            return 180 - theta
      }
      else{
            if(y1 > y2)
            return 360 -  theta
            else
            return theta
      }
}
}

const line = (ctx,x1,y1,x2,y2,color)=>{
      ctx.beginPath()
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      ctx.moveTo(x1,y1)
      ctx.lineTo(x2,y2)
      ctx.stroke()
      ctx.restore()
}

const angle = (x1,y1,x2,y2)=>{
      const d1 = Math.sqrt(Math.pow((x2-x1),2)+ Math.pow(y2-y1,2))
      const d2  = Math.sqrt(Math.pow((x2-x1),2))
      const theta = Math.acos(d2/d1)* (180/Math.PI)
      return theta
}

const rect = (ctx,x,y,width,height,color,radii)=>{
    ctx.beginPath()
    ctx.save()
    ctx.lineWidth = 4
    ctx.shadowBlur = 10
    ctx.shadowColor = color
    ctx.strokeStyle = color
    ctx.roundRect(x,y,width,height,radii)
    ctx.stroke()
    ctx.restore()
}

const text = (ctx,x,y,size,str,color)=>{
      ctx.font = `${size}px Comic Sans MS`
      ctx.textAlign = "center"
      ctx.strokeStyle = color
      ctx.strokeText(str,x,y)
}

const cir = (ctx,x,y,r,color)=>{
     ctx.save()
     ctx.beginPath()
     ctx.lineWidth = 3
//      ctx.shadowBlur = 20
//      ctx.shadowColor = color
     ctx.strokeStyle = color
     ctx.arc(x,y,r,0,Math.PI*2)
     ctx.stroke()
     ctx.restore()
}



export {createCanvas,circle,calAngle,line,angle,rect,text,cir}