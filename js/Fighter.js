class Fighter {
  constructor({position, velocity, color = "red", offset}) {
    this.position = position
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
  }

  draw() {
    //player and enemy
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attack box
    if (this.isAttacking) {
      ctx.fillStyle = "green"
      ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }
  update() {
    this.draw()
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