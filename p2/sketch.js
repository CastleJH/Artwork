var teapots = [45];
var sameColor;
var rot = 0;

function preload() {
  teapot = loadModel('teapot.obj');
}

function setup() {
  createCanvas(900, 900, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  for (let i = 0; i < 45; i++) {
    teapots[i] = new Teapot(i * 8);
  }  
  sameColor = -1;
}

function draw() {
  
  if (sameColor == -1) background(0, 0, 10);
  else background(sameColor, 50, 5);
  
  rotateY(radians(rot -= 0.2));
  
  //small teapots
  push();
  translate(-100, 70, 0);
  for (let i = 0; i < 45; i++) {
    teapots[i].move();
    teapots[i].display();
  } 
  pop();
  
  
  pointLight(0, 0, 100, 0, 0, 0);
  directionalLight(0, 0, 50, 0, 0.5, -1);
  
  //floor
  if (sameColor == -1) fill(0, 0, 100);
  else fill(sameColor, 10, 100);
  push();
  translate(0, height/4 + 1000, 0);
  box(2000);
  pop();
  
  //big teapot
  push();
  translate(50, height/4, 0);
  rotateX(HALF_PI);
  rotateZ(PI);
  if (sameColor == -1) fill(0, 0, 100);
  else fill(sameColor, 30, 100);
  scale(10);
  model(teapot);
  pop();
}

class Teapot {
  constructor(h) {
    this.colorType = h % 3;
    this.x = 0;
    this.y = random(height, height+1000);
    this.z = 0
    this.rx = 0;
    this.ry = 0;
    this.rvx = random(-1.0, 1.0);
    this.rvy = random(-1.0, 1.0);
    this.hue = h;
    this.speed = 7;
    this.xspeed = random(-2, 2);
    this.zspeed = random(-2, 2);
    this.acc = random(0.09, 0.12);
    this.size = random(0.8, 1.2);
  }
  
  move() {
    this.speed += this.acc;
    this.y += this.speed;
    this.x += this.xspeed;
    this.z += this.zspeed;
    this.rx += this.rvx;
    this.ry += this.rvy;
    if (this.y > height + 1000) {
      this.speed = random(-10.2, -9.5);
      this.y = 0;
      this.x = 0;
      this.z = 0;
    }
  }
  
  display() {
    push();
    translate(this.x, this.y, this.z);
    if (sameColor == -1) fill(this.hue, 100, 100);
    else {
      if (this.colorType != 0) fill(sameColor, map(this.hue, 0, 360, 0, 100), 100);
      else fill((sameColor + 45 ) % 360, map(this.hue, 0, 360, 0, 100), 100);
    }
    rotateX(radians(this.rx));
    rotateY(radians(this.ry));
    scale(this.size);
    model(teapot);
    pop();
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, width/2, 555) < 100) {
    sameColor = random(0, 360);
  }
  else sameColor = -1;
}
