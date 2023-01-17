var osc, ocs1, osc2;
var note;

var timer = 0;
var drumSpd = 15;

var kick, hat, snare, clap;
var kOn = 0, hOn = 0, sOn = 0, cOn = 0;

var masterV = 0.5;

function drum() {
  if (kOn == 1 && timer % (drumSpd * 2) == 0) kick.play();
  if (hOn == 1 && timer % (drumSpd * 1) == 0) hat.play();
  if (sOn == 1 && timer % (drumSpd * 4) == 0) snare.play();
  if (cOn == 1 && timer % (drumSpd * 8) == 0) clap.play();
}

function keyPressed() {
  if (key == '1') drumSpd++;
  if (key == '4') drumSpd--;
  if (key == '8') {
    masterV -= 0.05;
    if (masterV < 0) masterV = 0;
  }
  if (key == '-') {
    masterV += 0.05;
    if (masterV > 1) masterV = 1;
  }
  if (keyCode == UP_ARROW) turnKick();
  if (keyCode == DOWN_ARROW) turnHat();
  if (keyCode == LEFT_ARROW) turnSnare();
  if (keyCode == RIGHT_ARROW) turnClap();
}

function keyTyped() {
  if (key == 'z') note = 0;
  else if (key == 's') note = 1;
  else if (key == 'x') note = 2;
  else if (key == 'd') note = 3;
  else if (key == 'c') note = 4;
  else if (key == 'v') note = 5;
  else if (key == 'g') note = 6;
  else if (key == 'b') note = 7;
  else if (key == 'h') note = 8;
  else if (key == 'n') note = 9;
  else if (key == 'j') note = 10;
  else if (key == 'm') note = 11;
  else if (key == ',') note = 12;
  else if (key == 'l') note = 13;
  else if (key == '.') note = 14;
  else if (key == ';') note = 15;
  else if (key == '/') note = 16;
  else if (key == 'q') note = 12;
  else if (key == '2') note = 13;
  else if (key == 'w') note = 14;
  else if (key == '3') note = 15;
  else if (key == 'e') note = 16;
  else if (key == 'r') note = 17;
  else if (key == '5') note = 18;
  else if (key == 't') note = 19;
  else if (key == '6') note = 20;
  else if (key == 'y') note = 21;
  else if (key == '7') note = 22;
  else if (key == 'u') note = 23;
  else if (key == 'i') note = 24;
  else if (key == '9') note = 25;
  else if (key == 'o') note = 26;
  else if (key == '0') note = 27;
  else if (key == 'p') note = 28;
  else if (key == '[') note = 29;
  else if (key == '=') note = 30;
  else if (key == ']') note = 31;
  else if (key == ' ') note = -49;
  else note = -48;
  note += 48;
  
  if (note == 0) return;
  if (note == -1) {
    robot1.resetPose();
    robot2.resetPose();
    robot3.resetPose();
    robot4.resetPose();
    robot5.resetPose();
    return;
  }
  
  robotSample.newPose(note);
  robot1.newPose(note);
  robot2.newPose(note);
  robot3.newPose(note);
  robot4.newPose(note);
  robot5.newPose(note);
  playNote();
}

function keyReleased() {
  osc.amp(0);
  osc1.amp(0);
  osc2.amp(0);
}

function playNote() {
  osc.freq(midiToFreq(note));
  osc1.freq(midiToFreq(note-12));
  osc2.freq(midiToFreq(note-12));
  osc.amp(0.2);
  osc1.amp(0.15);
  osc2.amp(0.1);
}