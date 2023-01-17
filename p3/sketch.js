let cols, rows;
let scl = 20;
let w = 1700;
let h = 1000;

let terrain = [];
let islands = [];

let flying = 0;

let sunA = 0;
let prevSunA = 0;

let backClr;
let backClr1, backClr2;

let img;
function preload() {
  img = loadImage('ship.png');
}

function setup() {
  createCanvas(1000, 700, WEBGL);
  cols = w / scl;
  rows = h / scl;
  
  for (let x = 0; x < cols; x++) terrain[x] = [];

  noStroke();
  noFill();
  
  backClr = 1;
}

function draw() {
  
  if (sunA < prevSunA) backClr = (backClr + 1) % 2;
  sunA += 0.03;
  prevSunA = sunA;
  
  if (backClr == 1) {
    background(100, 200, 250);
    pointLight(255, 255, 255, 0, height/3, 500);
    pointLight(0, 0, 100, 0, -height*1.5, -50);
  }
  else {
    background(20, 20, 80);
    pointLight(205, 205, 205, 0, height/3, 500);
    pointLight(0, 0, 20, 0, -height*1.5, -50);
  }
  
  
  drawOcean();
  drawSun();
  
  /*
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  let imgScl = width/img.width;
  print(imgScl);
  image(img, -width/2, height/2 - img.height * imgScl, img.width * imgScl, img.height * imgScl);
  */
  
}

function drawOcean() {
  push();
  rotateX(PI/3);
  translate(-w/2, -h/2);
  
  flying -= map(mouseX, 0, width, -0.005, -0.08);
  let depth = map(mouseY, 0, height, -30, -100);
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, depth, -depth);
      xoff += 0.1;
    } 
    yoff += 0.1;
  }
  
  fill(100, 100, 250);
  
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      //rect(x*scl, y*scl, scl, scl);
    }
    endShape();
  }
  
  pop();
}

function drawSun() {
  push();
  if (sunA > 6) sunA = -6;
  translate(0, 5000, 0);
  rotateZ(radians(sunA));
  translate(0, -5000 - 300, 0);
  noLights();
  fill(255);
  ellipse(0, 0, 50, 50);
  pop();
}
















