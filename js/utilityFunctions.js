function rectangularCollision({rectangle1, rectangle2}) {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function determineWinner({player, enemy, timerID}) {
  gameHasEnded = true
  clearTimeout(timerID)
  document.getElementById("label").style.display = "flex"
  if (player.health === enemy.health) {
    document.getElementById("whoWon").innerHTML = "Nerozhodně"
  }
  else if (player.health > enemy.health) {
    document.getElementById("whoWon").innerHTML = "Vyhrál červený hráč"
    enemy.switchSprite("death")
  }
  else if (player.health < enemy.health) {
    document.getElementById("whoWon").innerHTML = "Vyhrál zelený hráč"
    player.switchSprite("death")
  }

}

let timer = 50
let timerID
function decreaseTimer() {
  if (timer > 0) {
    timerID = setTimeout(decreaseTimer, 1000)
    timer--
    document.getElementById("timer").innerHTML = timer.toString()
  }
  
  if (timer === 0) {
    determineWinner({player, enemy, timerID})
  }
}