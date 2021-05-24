let cam;

let gridSize = 100;
let cubeSize = 90;

let numX, numY;

let W = 1200;
let H = 1000;

let hourglass;
let prob = 0.0005;

function preload() {
  hourglass = loadModel("assets/hourglass.obj");
  cam = createCapture(VIDEO);
  cam.size(W, H);
  cam.hide();  
}

function setup() {
  createCanvas(W, H, WEBGL);
  angleMode(DEGREES);
  background(255);
  noStroke();
  numX = width / gridSize;
  numY = height / gridSize;
  for (let x = 0; x < numX; x++) {
    fragsl[x] = [];
    fragsf[x] = [];
    fragsr[x] = [];
    for (let y = 0; y < numY; y++) {
      fragsl[x][y] = new frag(x * gridSize, y * gridSize, cam.get(0,0,320,240));
      fragsf[x][y] = new frag(x * gridSize, y * gridSize, cam.get(0,0,320,240));
      fragsr[x][y] = new frag(x * gridSize, y * gridSize, cam.get(0,0,320,240));
    }
  }
}

function draw() {
  orbitControl();
  rotateX(-20);
  background(0);
  ambientLight(80, 80, 80);  
  let lightX = map(mouseX, 0, width, -width/2 + 300, width/2 - 300);
  let lightY = map(mouseY, 0, height, -height/2, height/2);
  pointLight(150, 150, 150, lightX, lightY, 200);
  
  if (keyIsPressed){
    if (keyCode == DOWN_ARROW) {
      prob *= 0.95
      if (prob <= 0.00001) prob = 0;
    }
    if (keyCode == UP_ARROW) {
      prob *= 1.05
      if (prob >= 0.1) prob = 0.1;
      if (prob == 0) prob = 0.00001;
    }
    print(prob);
  }
  
  translate(0, 0, W/1.8);
  
  drawCenter();
  
  drawFrags(fragsl, -width/2, -height/2 + gridSize/2, -W/2, 90);
  
  drawFrags(fragsf, -width/2 + gridSize/2, -height/2 + gridSize/2, -W/2*3, 0);

  drawFrags(fragsr, width/2, -height/2 + gridSize/2, -W/2, 90);
}

function drawCenter() {
  push();
  translate(0, H/2 + 10, -W);
  push();
  translate(0, -300, 0);
  scale(10, 10, 10);  
  specularMaterial(200, 150, 0);
  model(hourglass);
  pop();
  fill(255);
  scale(W/2, 20, W/2);
  box(1);
  pop();
}

function drawFrags(frag, x, y, z, d) {
  push();
  translate(x, y, z);
  rotateY(d);
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      frag[x][y].moveTest();
      frag[x][y].display();
    }
  }
  pop();
}

function mousePressed() {
   for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      if (random(0, 1) < 0.33) {
        fragsl[x][y].emptyCube();
        fragsf[x][y].emptyCube();      
        fragsr[x][y].emptyCube();
      }
    }
  }
}
