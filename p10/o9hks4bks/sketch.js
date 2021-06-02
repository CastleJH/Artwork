let maskNum = 30;

let masks = [];
let maskObjs = [];
let textures = [];
var capture;
var tracker;
let faceX = 0, faceY = 0;
let sampleObj;
let maskAppear = [];

let song;

let myshader;


function preload() {
  sampleObj = loadModel('assets/mask.obj');
  maskObjs[0] = loadModel('assets/objs/m1.obj');
  maskObjs[1] = loadModel('assets/objs/m2.OBJ');
  maskObjs[2] = loadModel('assets/objs/m3.obj');
  maskObjs[3] = loadModel('assets/objs/m4.OBJ');
  maskObjs[4] = loadModel('assets/objs/m5.obj');
  textures[0] = loadImage('assets/textures/t1.jpeg');
  textures[1] = loadImage('assets/textures/t2.jpeg');
  textures[2] = loadImage('assets/textures/t3.jpeg');
  textures[3] = loadImage('assets/textures/t4.jpeg');
  textures[4] = loadImage('assets/textures/t5.jpeg');
  textures[5] = loadImage('assets/textures/t6.jpeg');
  textures[6] = loadImage('assets/textures/t7.jpeg');
  textures[7] = loadImage('assets/textures/t8.jpeg');
  textures[8] = loadImage('assets/textures/t9.jpeg');
  
  song = loadSound('assets/bgm.mp3');
  myshader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  for (let i = 0; i < maskNum; i++) {
    masks[i] = new mask(width/maskNum * i - width/2, (height/maskNum) * ((1 + i * 11) % maskNum) - height/2, -200 + abs(i * 30 - (maskNum/2 * 30)), i);
    if (i % 2) maskAppear[i] = false;
    else maskAppear[i] = true;
  }

  song.loop();

  noStroke();
  fill(200);
 
    capture = createCapture({
        audio: false,
        video: {
            width: 320,
            height:240
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(windowWidth, windowHeight);
  
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function mousePressed() {
  for (let j = 0; j < maskNum; j++)
    if (random(0, 1) < 0.5) maskAppear[j] = !maskAppear[j];
}

function keyPressed() {
  if (key == 'a') {
    for (let j = 0; j < maskNum; j++) maskAppear[j] = true;
  }
  if (key == 's') {
    for (let j = 0; j < maskNum; j++) masks[j].changeTexture(int(random(0, 9)));
  }
  if (key == 'd') {
    for (let j = 0; j < maskNum; j++) masks[j].changeTexture(j);
  }
}

function draw() {  
  background(0);
  lights();
  
  shader(myshader); 
  
  myshader.setUniform("uBorder", 0.6);

   var positions = tracker.getCurrentPosition();

    if (positions.length > 0) {
        var browLeft = createVector(positions[22][0], positions[22][1]);
        var browRight = createVector(positions[18][0], positions[18][1]);
        faceX = positions[62][0];
        faceY =  positions[62][1];
    }
  

  for (let i = 0; i < maskNum; i++) {
    if (!maskAppear[i]) continue;
    masks[i].lookat(-faceX + width/2, faceY - height/2, 800);
    masks[i].display(i);
  }
  
  translate(-faceX + width/2, faceY - height/2, 100);
}
