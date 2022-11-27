class Fighter extends Sprite {
  constructor({position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = {x:0,y:0},
    sprites,
    attackBox = {offset: {}, width: undefined, height: undefined},
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    },
    this.health = 100
    this.isAttacking
    this.dead = false

    for (const sprite in this.sprites) {
      this.framesMax = this.sprites[sprite].framesMax
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }


  }

  
  update() {
    this.draw()
    if (!this.dead) {//if dead and on last frame of death, stop animating
      this.animateFrames()
    } else {
      if (this.framesCurrent !== 11)
      this.animateFrames()
    }

    //attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    //draw attack box
    //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

    //this prevents it from going off-screen right or left
    if ((this.position.x + this.velocity.x + this.width + 155 <= canvas.width) && (this.position.x + this.velocity.x >= 0)) {
      this.position.x += this.velocity.x
    }
    
    //this moves the character up
    if (this.position.y + this.velocity.y >= 50) {
      this.position.y += this.velocity.y
    } else {
      this.velocity.y = 0
    }

    //prevents the players from falling down
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
      this.position.y = 426 //stops it from micro falling CHANGE IF YOU CHANGE FLOOR
    }
    else {
      this.velocity.y += gravity
      //console.log(this.position.y)
    }
  }
  
  attack() {
    this.switchSprite("attack1")
    if (!gameHasEnded && !this.dead) {
      this.isAttacking = true
    }
  }

  takeHit() {
    this.health -= 10

    if (this.health <= 0) {
      this.switchSprite("death")
    } else {
      this.switchSprite("takeHit")
    }
  }

  switchSprite(sprite) {
    //overwriting all other animations)

    if (this.image === this.sprites.death.image && this.framesCurrent < this.sprites.death.framesMax - 1) {
        this.dead = true
      return
    }

    if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
      return
      //if attacking, continue the animation even if you start falling or moving. Also, stop it if you have already activated it once (Second condition)
    }
    //if taking hit, dont switch animations to anything but attack
    if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) {return}

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) { //prevent re-renders
          this.framesMax = this.sprites.idle.framesMax
          this.image = this.sprites.idle.image
          this.framesCurrent = 0
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.framesMax = this.sprites.run.framesMax
          this.image = this.sprites.run.image
          this.framesCurrent = 0
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.framesMax = this.sprites.jump.framesMax
          this.image = this.sprites.jump.image
          this.framesCurrent = 0
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.framesMax = this.sprites.fall.framesMax
          this.image = this.sprites.fall.image
          this.framesCurrent = 0
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image && !enemy.dead && !gameHasEnded) {
          this.framesMax = this.sprites.attack1.framesMax
          this.image = this.sprites.attack1.image
          this.framesCurrent = 0
        }
        break;
      case "takeHit":
          this.framesMax = this.sprites.takeHit.framesMax
          this.image = this.sprites.takeHit.image
          this.framesCurrent = 1
          break;
      case "death":
          this.framesMax = this.sprites.death.framesMax
          this.image = this.sprites.death.image
          this.framesCurrent = 1
          break;
    }
  }
}