var input;
var font;

var robotOffX = 0;robotCX = 0, robotD = 0;
function preload() {
  font = loadFont('assets/Inconsolata.ttf');
  kick = loadSound('assets/kick.mp3');
  hat = loadSound('assets/hat.wav');
  snare = loadSound('assets/snare.wav');
  clap = loadSound('assets/clap.wav');
}

function setup() {
  createCanvas(1000 * 1.2, 1000, WEBGL);
  frameRate(60);
  
  osc = new p5.Oscillator('sawtooth');
  osc1 = new p5.Oscillator('sawtooth');
  osc2 = new p5.Oscillator('sine');
  osc.amp(0);
  osc1.amp(0);
  osc2.amp(0);
  osc.start();
  osc1.start();
  osc2.start();
  kick.amp(0.8);
  hat.amp(0.3);
  snare.amp(0.8);
  noStroke();
  angleMode(DEGREES)
  
  robot1 = new Robot(126, 255, 255, 100);
  robot2 = new Robot(510, 100, 255, 100);
  robot3 = new Robot(510, 100, 255, 100);
  robot4 = new Robot(126, 100, 255, 255);
  robot5 = new Robot(126, 100, 255, 255);
  robotSample = new Robot(int(random(0, 1000)));
  
  
  textFont(font);
  textSize(20);
  UI();
}

function draw() {  
  timer++;
  masterVolume(masterV);
  drum();
  
  lights();
  background(0);
  textUI();
  
  translate(0, 0, -height * 1.5);
  rotateX(-20);
  push();
  translate(0, height/2 + 200, -height/2 - 100);
  displayStage();
  pop();
  
  if (mouseIsPressed && mouseY < height - 170) {
    if (mouseButton == LEFT) robotOffX -= 5;
    if (mouseButton == CENTER) robotOffX += 5;
  }
  else {  
    if (timer % (drumSpd * 8) < drumSpd * 1) robotCX -= 3;
    else if (timer % (drumSpd * 8) < drumSpd * 4) robotCX = robotCX;
    else if (timer % (drumSpd * 8) < drumSpd * 5) robotCX += 3;
    else if (timer % (drumSpd * 8) < drumSpd * 8) robotCX = robotCX;
    if (timer % (drumSpd * 8) == 0 ) robotCX = 0;
  }
  
  if (drumSpd * 8 <= timer % (drumSpd * 16) && timer % (drumSpd * 16) < drumSpd * 9) 
    robotD += (360 / drumSpd);
  else robotD = 0;
  translate(robotOffX + robotCX, 0, 0);
  displayRobots();
}

function createRandomRobot() {
  robot1.seed = (int(random(0, 1000)));
  robot2.seed = (int(random(0, 1000)));
  robot3.seed = (int(random(0, 1000)));
  robot4.seed = (int(random(0, 1000)));
  robot5.seed = (int(random(0, 1000)));  
}

function createSampleRobot() {
  robotSample.seed = int(input.value());
}

function resetRobot() {
  robot1.seed = robot4.seed = robot5.seed = 126;
  robot2.seed = robot3.seed = 510;
}

function chooseRobot1() {
  robot1.seed = robotSample.seed;
}

function chooseRobot2() {
  robot2.seed = robotSample.seed;
}

function chooseRobot3() {
  robot3.seed = robotSample.seed;
}

function chooseRobot4() {
  robot4.seed = robotSample.seed;
}

function chooseRobot5() {
  robot5.seed = robotSample.seed;
}

function turnKick() {
  kOn = (kOn + 1) % 2;
}

function turnHat() {
  hOn = (hOn + 1) % 2;
}

function turnSnare(){
  sOn = (sOn + 1) % 2;
}

function turnClap(){
  cOn = (cOn + 1) % 2;
}

function UI() {
  button = createButton('robot1');
  button.position(0, 25 + height - 170);
  button.mousePressed(chooseRobot1);
  button = createButton('robot2');
  button.position(0, 50 + height - 170);
  button.mousePressed(chooseRobot2);
  button = createButton('robot3');
  button.position(0, 75 + height - 170);
  button.mousePressed(chooseRobot3);
  button = createButton('robot4');
  button.position(0, 100 + height - 170);
  button.mousePressed(chooseRobot4);
  button = createButton('robot5');
  button.position(0, 125 + height - 170);
  button.mousePressed(chooseRobot5);
  
  button = createButton('reset');
  button.position(width - button.width - 10, 25 + height - 170);
  button.mousePressed(resetRobot);
  button = createButton('random');
  button.position(width - button.width - 10, 50 + height - 170);
  button.mousePressed(createRandomRobot);
  button = createButton('create seed');
  button.position(width - button.width - 10, 125 + height - 170);
  button.mousePressed(createSampleRobot);
  input = createInput();
  input.position(width - button.width - input.width - 10, 125 + height - 170);

  button = createButton('kick');
  button.position(width/2 - 150, 10 + height - 170);
  button.mousePressed(turnKick);
  button = createButton('hihat');
  button.position(width/2 - 50, 10 + height - 170);
  button.mousePressed(turnHat);
  button = createButton('snare');
  button.position(width/2 + 50, 10 + height - 170);
  button.mousePressed(turnSnare);
  button = createButton('clap');
  button.position(width/2 + 150, 10 + height - 170);
  button.mousePressed(turnClap);   
}

function textUI() {
  push();
  translate(-width/2, height/2 - 170, 0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rect(-1, -1, width + 2, 170);
  textSize(20);
  textAlign(LEFT);
  fill(100, 255, 255);
  text(robot1.seed, 80, 45);
  text(robot2.seed, 80, 70);
  text(robot3.seed, 80, 95);
  text(robot4.seed, 80, 120);
  text(robot5.seed, 80, 145);
  if (kOn == 1) fill(100, 255, 100);
  else fill(255, 100, 100);
  text('up', width/2 - 150, 50);
  if (hOn == 1) fill(100, 255, 100);
  else fill(255, 100, 100);
  text('down', width/2 - 50, 50);
  if (sOn == 1) fill(100, 255, 100);
  else fill(255, 100, 100);
  text('left', width/2 + 50, 50);
  if (cOn == 1) fill(100, 255, 100);
  else fill(255, 100, 100);
  text('right', width/2 + 150, 50);
  textAlign(CENTER);
  fill(255);
  text('1: tempo down', width/2 - 250, 80);
  text('4: tempo up', width/2, 80);
  text('L/C Mouse: move L/R', width/2 + 250, 80);
  text('8: master volume down', width/2 - 250, 110);
  text('-: master volume up', width/2, 110);
  text('space: default pose', width/2 + 250, 110);
  
  fill(255, 255, 100);
  text('Press any arrow key to start!', width/2, 140);
  pop(); 
}

