var csize = 16000;
var bsize = 800;
var gridSz = csize / bsize;    // 20
var bw = [];
var bh = [];
var bd = [];
var clr = [];

function buildCity() {
  for (let i = 0; i < gridSz; i++) {
    bw[i] = [];
    bh[i] = [];
    bd[i] = [];
    clr[i] = [];
    for (let j = 0; j < gridSz; j++) {
      bw[i][j] = random(100, bsize/2);
      bh[i][j] = random(100, bsize/2);
      bd[i][j] = random(600, 2000);
      clr[i][j] = color(int(random(50, 80)), int(random(50, 100)), int(random(150, 220)));
    }
  }
}

function drawCity() {
  strokeWeight(5);
  stroke(0);
  push();
  fill(100);
  translate(posX, posY, -50);
  box(16000, 16000, 100); // draw ground
  pop();
  
  push();
  translate(bsize / 2, bsize / 2, 0);
  for (let i = 0; i < gridSz; i++) {
    for (let j = 0; j < gridSz; j++) {
      push();
      fill(clr[i][j]);
      translate(i * bsize, j * bsize, bd[i][j] / 2);
      box(bw[i][j], bh[i][j], bd[i][j]);
      pop();
    }
  }
  pop();
  
  noStroke();
  push();
  translate(0, csize/2, -49);
  for (let i = 0; i < gridSz; i++) {
    fill(20);
    translate(bsize, 0, 0);
    box(bsize/3, 16000, 100);
    fill(220);
    box(bsize/80, 16000, 101);
  }
  pop();
  
  push();
  translate(csize/2, 0, -49);
  for (let i = 0; i < gridSz; i++) {
    fill(20);
    translate(0, bsize, 0);
    box(16000, bsize/3, 100);
    fill(220);
    box(16000, bsize/80, 101);
  }
  pop();
}