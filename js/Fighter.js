class Fighter extends Sprite {
  constructor({position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = {x:0,y:0},
    sprites,
    currentAnimationState
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 17
    this.sprites = sprites
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.color = color
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: offset,
      width: 100,
      height: 50,
    },
    this.health = 100
    this.isAttacking
    this.currentAnimationState = currentAnimationState

    for (const sprite in this.sprites) {
      this.framesMax = this.sprites[sprite].framesMax
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }


  }

  
  update() {
    this.draw()
    this.animateFrames()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    //this prevents it from going off-screen right or left
    if ((this.position.x + this.velocity.x + this.width <= canvas.width) && (this.position.x + this.velocity.x >= 0)) {
      this.position.x += this.velocity.x
    }
    //this moves the character up
    this.position.y += this.velocity.y

    //prevents the players from falling down
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    }
    else {
      this.velocity.y += gravity
    }
  }
  
  attack() {
    if (!gameHasEnded) {
      this.isAttacking = true
      setTimeout(() => {//stops attacking after 0.1 s
        this.isAttacking = false
      }, 100)
    }
  }
}