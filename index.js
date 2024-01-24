import { Game } from "./module/game.js";

const game = new Game(window.innerWidth-20,window.innerHeight-50,"black")

game.setUpCanva(document.getElementById("root"))
game.initialValues() 
game.addEvent()
game.sCard()
game.start()

const animate = ()=>{
    game.startGame()
    requestAnimationFrame(animate)
}
animate()





