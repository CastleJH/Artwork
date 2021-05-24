
let fragsl = [];
let fragsf = [];
let fragsr = [];

class frag{
  constructor(X, Y, IMG) {
    this.img = IMG;
    this.x = X;
    this.fx = X;
    this.y = Y;
    this.fy = Y;
    this.z = 0;
    this.isShake = false;
    this.isSpin = false;
    this.shakeTimer = 0;
    this.dg = 0;
  }
  
  display() {
    push();
    if (this.isShake) this.shake();
    if (this.isSpin) this.spin();
    texture(this.img);
    translate(this.x, this.y, this.z);
    rotateY(this.dg);
    box(cubeSize);
    pop();
  }
  
  shake() {
    this.shakeTimer++;
    this.x = this.fx + random(-10, 10);
    this.y = this.fy + random(-10, 10);
    this.z = this.fz + random(-10, 10);
    if (this.shakeTimer > 60) {
      this.shakeTimer = 0;
      this.x = this.fx;
      this.y = this.fy;
      this.z = 0;
      this.isShake = false;
    }
  }
  
  spin() {
    this.dg += 3;
    if (this.dg == 45) {
      this.img = cam.get(this.x, this.y, gridSize, gridSize);
    }
    if (this.dg % 90 == 0) {
      this.dg = 0;
      this.isSpin = false;
    }
  }
  
  moveTest() {
    if (!this.isShake && !this.isSpin && random(0, 1) < 0.01) this.shake(); 
    if (!this.isShake && !this.isSpin && random(0, 1) < prob) this.getNewImg(); 
  }
  
  getNewImg() {
    this.isSpin = true;
  }
  
  emptyCube() {
    this.img.loadPixels();
    let len = this.img.width * this.img.height * 4;
    for (let i = 0; i < len; i++) {
      this.img.pixels[i] = 0;
    }
    this.img.updatePixels();
  }
}
