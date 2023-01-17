var speed;

var posX, posY, posZ;
var lookX, lookY, lookZ;
var upX, upY, upZ;

var lookDir, newDir;
var posDir;

var isCurve;
var curveTimer;
var curvePeak;
var curveLength = 720;

var tiltInside;

function userInput() {
  if (keyIsPressed) {
    if (key == 'w') {
      posZ+=10;
      if (posZ > 2000) posZ = 2000;
      lookZ = posZ;
    }
    if (key == 's') {
      posZ-=10;
      if (posZ < 100) posZ = 100;
      lookZ = posZ;
    }
    if (key == 'a') {
      upZ -= 0.2;
      if (upZ < -20) upZ = -20;
    }
    if (key == 'd') {
      upZ += 0.1;
      if (upZ > -3) upZ = -3;
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    tiltInside = !tiltInside;
  }
  if (key ==  'n') {
    buildCity();
  }
}

function initialCamera() {
  isCurve = false;
  curveTimer = 0;
  
  speed = 20;
  
  posX = bsize * 10 ; posY = bsize * 10 - speed + curveLength; posZ = 100;
  lookX = bsize * 10 ; lookY = bsize * 10 - speed; lookZ = 100;
  upX = 0; upY = 0; upZ = -6;
  lookDir = 0;
  posDir = lookDir;
  
  tiltInside = false;
}

function userCamera() {
  switch (lookDir) {
    case 0:
      lookY -= speed;
      if (lookY % bsize == 0) {
        if (mouseX < width / 5) lookDir = 2;
        else if (mouseX > width / 5 * 4) lookDir = 3;
      }
      break;
    case 1:
      lookY += speed;
      if (lookY % bsize == 0) {
        if (mouseX < width / 5) lookDir = 3;
        else if (mouseX > width / 5 * 4) lookDir = 2;
      }
      break;
    case 2:
      lookX -= speed;
      if (lookX % bsize == 0) {
        if (mouseX < width / 5) lookDir = 1;
        else if (mouseX > width / 5 * 4) lookDir = 0;
      }
      break;
    case 3:
      lookX += speed;
      if (lookX % bsize == 0) {
        if (mouseX < width / 5) lookDir = 0;
        else if (mouseX > width / 5 * 4) lookDir = 1;
      }
      break;
    default:
      break;
  }
  

  switch (posDir) {
    case 0:
      posY -= speed;
      break;
    case 1:
      posY += speed;
      break;
    case 2:
      posX -= speed;
      break;
    case 3:
      posX += speed;
      break;
    default:
      break;
  }
  
  if (posDir == 0 || posDir == 1) {
    if (posY % bsize == 0) posDir = lookDir;
  }
  else if (posDir == 2 || posDir == 3) {
    if (posX % bsize == 0) posDir = lookDir;
  }
  
  if (lookX < 0 || lookX > csize) initialCamera();
  if (lookY < 0 || lookY > csize) initialCamera();
  
  if (lookDir != posDir && isCurve == false) {
    speed = 15;
    isCurve = true;
    curvePeak = (curveLength / speed) / 2;
    curveTimer = -curvePeak;
  }
  
  if (isCurve) {
    curveTimer++;
    let source = (-abs(curveTimer) + curvePeak) / curvePeak;
    if ((lookDir == 0 && posDir == 2) || 
       (lookDir == 3 && posDir == 1)) { //↙
      upX = -source; upY = source;
    }
    if ((lookDir == 3 && posDir == 0) ||
        (lookDir == 1 && posDir == 2)) { //↖
      upX = -source; upY = -source;
    }
    if ((lookDir == 1 && posDir == 3) ||
        (lookDir == 2 && posDir == 0)) { //↗
      upX = source; upY = -source;
    }
    if ((lookDir == 2 && posDir == 1) || 
       (lookDir == 0 && posDir == 3)) {  //↘
      upX = source; upY = source;
    }
    if (tiltInside){
      upX *= -1;
      upY *= -1;
    }
    if (curveTimer >= curvePeak) isCurve = false;
  }
  else {
    speed = 20;
    upX = 0;
    upY = 0;
  }
  camera(posX, posY, posZ, lookX, lookY, lookZ, upX, upY, upZ);
}


