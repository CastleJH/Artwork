function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES); 
  buildCity();
  initialCamera();
  strokeWeight(5);
}

function draw() {
  background(180, 220, 220);
  userInput();
  userCamera();
  lights();
  directionalLight(255, 255, 255, 1, -1, 0);
  drawCity();
} 

