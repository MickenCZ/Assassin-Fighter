class Sprite {
  constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0,y:0}}) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.offset = offset
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax), //animate when drawing using cropping series of images
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale, //ensures scaling from class args
      this.image.height * this.scale,
      )
  }
  update() {
    this.draw()
    this.animateFrames()
  }

  animateFrames() {
    this.framesElapsed++
    if (this.framesElapsed % this.framesHold === 0) {
      //for every nth frame (n = framesHold) it carries out the animation
      if (this.framesCurrent < this.framesMax - 1) {
        //so that it doesnt go back from lack of frames in sprite and ends at the last one
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
}