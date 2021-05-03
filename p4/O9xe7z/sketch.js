let crew, imposter;
let blue;
let a = 0;
let crews = [];
let stars = [];
let timer = 0;
let lastChange = 0;
let cam;
let impoNum;
let impoSec = 180;
let impoY;
let jump;

let bgm, walkS, ventS;
let walkLooping = false;

let mv = 0.7;

function preload() {
  crew = loadModel("assets/crew.obj", true);
  impo = loadModel("assets/imposter.obj", true);
  soundFormats("mp3");
  bgm = loadSound("assets/bgm");
  walkS = loadSound("assets/walking");
  ventS = loadSound("assets/vent");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  for (let i = 0; i < 12; i++) {
    c = color(random(0, 255), random(0, 255), random(0, 255));
    crews[i] = new Crew(0, 0, 0, 1, c);
  }
  for (let i = 0; i < 300; i++) {
    stars[i] = new Star();
  }
  cam = createCamera();
  cam.move(0, -100, -300);
  jump = false;
  impoNum = int(random(0, 12));
  
  bgm.setVolume(0.3);
  ventS.setVolume(1);
  walkS.setVolume(1.2);
  bgm.play();
  masterVolume(mv);
}

function draw() {
  timer++;
  
  background(0);
  
  userControl();
  
  pointLight(255, 255, 255, 0, -1500, 0);
  //directionalLight(255, 255, 255, 0, -1, 0);
  lights();
  
  push();
  rotateZ(PI);
  for (let i = 0; i < 12; i++) {
    push();
    rotateY(TWO_PI/12 * i);
    translate(0, 0, -800);
    crews[i].display();
    drawVent(0, 0);
    translate(0, 50, 0);
    scale(200, 300, 200);
    //drawGlassbox(200, 20, 1);
    pop();
  }
  
  push();
  rotateY(TWO_PI/10);
  translate(0, 0, -1300);
  drawVent(0, 0);
  
  pop();
  if (jump) moveImpo();
  
  for (let i = 0; i < 300; i++) {
    stars[i].update();
    stars[i].display();
  }
  pop();
  
  drawRoom();
}

function keyPressed(){
  if (!jump) {
    if (key == 'q') {
      timer = 0;
      jump = true;
      ventS.play();
    }
    if (key == 'c') {
      for (let i = 0; i < 12; i++) crews[i].c = color(random(0, 255), random(0, 255), random(0, 255));
      impoNum = int(random(0, 12));
    }
  }
  if (keyCode == UP_ARROW) {
    mv += 0.05;
    if (mv > 1) mv = 1;
    masterVolume(mv);
  }
  else if (keyCode == DOWN_ARROW) {
    mv -= 0.05;
    if (mv < 0) mv = 0;
    masterVolume(mv);
  }
}

function userControl() {
  if (mouseX < width/3) {
    p = map(mouseX, 0, width/3, 0.1, 0.005);
    cam.pan(p);
  }
  else if (mouseX > width/3*2){
    p = map(mouseX, width/3*2, width, -0.005, -0.1);
    cam.pan(p);
  }
  if (keyIsPressed) {
    if (key == 'w') {
      cam.move(0, 0, -15);
      if (!walkLooping) {
        walkS.loop();
        walkLooping = true;
      }
    }
    else if (key == 'a') {
      cam.move(-15, 0, 0);
      if (!walkLooping) {
        walkS.loop();
        walkLooping = true;
      }
    }
    else if (key == 's') {
      cam.move(0, 0, 15);
      if (!walkLooping) {
        walkS.loop();
        walkLooping = true;
      }
    }
    else if (key == 'd') {
      cam.move(15, 0, 0);
      if (!walkLooping) {
        walkS.loop();
        walkLooping = true;
      }
    }
    else {
      walkS.stop();
      walkLooping = false;
    }
  }
  else {
      walkS.stop();
      walkLooping = false;
  }
}

function drawRoom() {  
  //floor
  push();
  translate(0, 100, 0);
  scale(5000, 1, 5000);
  fill(180, 180, 150);
  box(1);
  pop();
  
  //ceiling
  push();
  translate(0, -1000, 0);
  scale(5000, 1, 5000);
  fill(50, 50, 80);
  box(1);
  pop();
  
  //walls
  push();
  translate(0, -450, 2500);
  scale(5000, 1100, 1);
  drawGlassbox(200, 10, 10);
  translate(0, 0.85, -0.1);
  drawGlassbox(15, 80, 10);
  pop();
  
  push();
  translate(0, -450, -2500);
  scale(5000, 1100, 1);
  drawGlassbox(200, 10, 10);
  translate(0, 0.85, 0.1);
  drawGlassbox(15, 80, 10);
  pop();

  push();
  translate(2500, -450, 0);
  scale(1, 1100, 5000);
  drawGlassbox(200, 10, 10);
  translate(-0.1, 0.85, 0);
  drawGlassbox(15, 80, 10);
  pop();
  
  push();
  translate(-2500, -450, 0);
  scale(1, 1100, 5000);
  drawGlassbox(200, 10, 10);
  translate(0.1, 0.85, 0);
  drawGlassbox(15, 80, 10);
  pop();
  
  //table
  push();
  translate(0, 100, 0);
  scale(200, 100, 200);
  fill(0, 0, 80);
  cylinder(1);
  pop();
  
  push();
  translate(1500, 100, 1500);
  translate(0, -200, 0);
  noFill();
  stroke(0, 255, 255);
  sphere(100);
  noStroke();
  translate(0, 200, 0);
  scale(400, 100, 400);
  fill(0, 0, 80);
  cylinder(1);
  pop();
  
  push();
  translate(-1500, 100, 1500);
  translate(0, -200, 0);
  noFill();
  stroke(255, 255, 0);
  sphere(100);
  noStroke();
  translate(0, 200, 0);
  scale(400, 100, 400);
  fill(0, 0, 80);
  cylinder(1);
  pop();
  
  push();
  translate(1500, 100, -1500);
  translate(0, -200, 0);
  noFill();
  stroke(255, 0, 255);
  sphere(100);
  noStroke();
  translate(0, 200, 0);
  scale(400, 100, 400);
  fill(0, 0, 80);
  cylinder(1);
  pop();
  
  push();
  translate(-1500, 100, -1500);
  translate(0, -200, 0);
  noFill();
  stroke(0, 255, 0);
  sphere(100);
  noStroke();
  translate(0, 200, 0);
  scale(400, 100, 400);
  fill(0, 0, 80);
  cylinder(1);
  pop();
  
  //button
  push();
  translate(0, 100, 0,);
  scale(20, 110, 20);
  fill(255, 0, 0);
  cylinder(1);
  scale(3, 1.2, 3);
  drawGlassbox(200, 60, 10);
  pop();
}

function drawVent(x, z) {
  push();
  translate(x, -170, z);
  fill(50);
  box(160);
  pop();
}


function drawGlassbox(h, a, s) {
  colorMode(HSB, 360, 100, 100, 100);
  fill(h, 100, 100, a);
  specularMaterial(h, 100, 100, a);
  shininess(s);
  box(1);
  colorMode(RGB);
}

class Crew {
  constructor(x, y, z, s, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s;
    this.c = c;
  }
  
  display() {
    push();
    translate(this.x, this.y, this.z);
    scale(this.s);
    specularColor(1, 1, 1);
    fill(this.c);
    model(crew);
    fill(150, 200, 255);
    translate(0, 53, 75);
    rotateX(-PI/9);
    scale(40, 25, 20);
    sphere(1);
    pop();
  }
}

class Star {
  constructor() {
    this.x = random(-5000, 5000);
    this.y = random(-1000, 3000);
    this.z = random(-5000, 5000);
    this.c = random(50, 255);
    while (abs(this.x) < 4000 && abs(this.z) < 4000) {
      this.x = random(-5000, 5000);
      this.z = random(-5000, 5000);
    }
  }
  
  update() {
    this.x++;
    if ((abs(this.x) < 4000 && abs(this.z) < 4000) || this.x > 5000) {
      this.x = 0; this.z = 0;
      while (abs(this.x) < 4000 && abs(this.z) < 4000) {
        this.x = random(-5000, 5000);
        this.z = random(-5000, 5000);
      }
    }
  }
  
  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.c);
    sphere(10);
    pop();
  }
}


function drawImpo(x, y, z, s, c) {
  push();
  translate(x, y, z);
  scale(s);
  fill(c);
  model(impo);
  fill(150, 200, 255);
  translate(0, 80, 0);
  rotateX(-PI/3);
  scale(40, 25, 20);
  sphere(1);
  pop();
}

function moveImpo() {
  timer++;
  if (timer <= 20) crews[impoNum].y = map(timer, 1, 20, 0, 100)
  else if (timer <= 30) print(timer);
  else if (timer <= impoSec - 20) crews[impoNum].y = map(timer, 31, impoSec - 20, 100, -800);
  else if (timer <= impoSec) print(timer);
  else crews[impoNum].y = map(timer, impoSec + 1, impoSec * 2, -800, 0);
  impoY = -750 - crews[impoNum].y;
  
  push();
  rotateY(TWO_PI/10);
  translate(0, 0, -1300);
  drawImpo(0, impoY, 0, 1, crews[impoNum].c);
  pop();
  
  if (timer >= impoSec * 2) {
    jump = false;
  }
}
