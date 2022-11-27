const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576
ctx.fillRect(0, 0, canvas.width, canvas.height)
//Draws initial canvas
const gravity = 0.7
let gameHasEnded = false

const background = new Sprite({
  position: {
    x: 0,
    y : 0,
  },
  imageSrc: "../static/background.png"
})


const player = new Fighter({
  position:{
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: -20,
  },
  imageSrc: "../static/Idle.png",
  framesMax: 6,
  scale: 5,
  sprites: {
    idle: {
      imageSrc: "../static/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "../static/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "../static/Jump.png",
      framesMax: 4,
    },
    fall: {
      imageSrc: "../static/Fall.png",
      framesMax: 4,
    },
    attack1: {
      imageSrc: "../static/Attack1.png",
      framesMax: 4,
    },
  },
})

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: -20,
  },
  imageSrc: "../static/Idle.png",
  framesMax: 6,
  scale: 5,
  sprites: {
    idle: {
      imageSrc: "../static/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "../static/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "../static/Jump.png",
      framesMax: 4,
    },
    fall: {
      imageSrc: "../static/Fall.png",
      framesMax: 4,
    },
    attack1: {
      imageSrc: "../static/Attack1.png",
      framesMax: 4,
    },
  },
})

const keys = {
  a: {
    pressed:false
  },
  d: {
    pressed:false
  },
  w: {
    pressed:false
  },
  ArrowLeft: {
    pressed:false
  },
  ArrowRight: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  //endless loop that calls code that handles object interaction and paints the canvas using the draw method of the Fighter class
  window.requestAnimationFrame(animate)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  player.update()
  enemy.update()
  /*For each frame it resets the canvas to just black, and then draws new frame by updating the objects*/
  
  //player movement
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5
    player.switchSprite("run")
  }
  else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5
    player.switchSprite("run")
  }
  else {
    player.switchSprite("idle")
  }
  //jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump")
  }
  else if (player.velocity.y > 0) {
    player.switchSprite("fall")
  }


  //enemy movement
  enemy.velocity.x = 0
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5
    enemy.switchSprite("run")
  }
  else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5
    enemy.switchSprite("run")
  }
  else {
    enemy.switchSprite("idle")
  }

  //jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump")
  }
  else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall")
  }

  //detect collision
  if (rectangularCollision({rectangle1:player, rectangle2:enemy}) && 
  player.isAttacking) {
      player.isAttacking = false
      enemy.health -= 20
    document.getElementById("enemyBar").style.width = enemy.health.toString() + "%"
  }

  if (rectangularCollision({rectangle1:enemy, rectangle2:player}) && 
  enemy.isAttacking) {
    enemy.isAttacking = false
    player.health -= 20
    document.getElementById("playerBar").style.width = player.health.toString() + "%"
}

    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({player, enemy, timerID})
    }
}

animate()

//this activates once you start holding the key
window.addEventListener("keydown", event => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true
      player.lastKey = "d"
      break
    case "a":
      keys.a.pressed = true
      player.lastKey = "a"
      break
    case "w":
      player.velocity.y = -20
      break
    case " ": //spacebar
      player.attack()
      break

    case "ArrowRight":
      keys.ArrowRight.pressed = true
      enemy.lastKey = "ArrowRight"
      break
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true
      enemy.lastKey = "ArrowLeft"
      break
    case "ArrowUp":
      enemy.velocity.y = -20
      break
    case "ArrowDown":
      enemy.attack()
      break
  }
})

//this activates once you stop holding the key
window.addEventListener("keyup", event => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false
      break
    case "a":
      keys.a.pressed = false
      break

    //enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false
      break
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false
      break
  }
})