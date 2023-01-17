var robot1, robot2, robot3, robot4, robot5, robotSample;

function displayRobots() {
  push();
  translate(0, 0, -500);
  rotateY(robotD);
  robot1.update();
  robot1.display();
  pop();
  
  push();
  translate(-width/2, 0, -1200);
  rotateY(-7 + robotD);
  robot2.update();
  robot2.display();
  pop();
  
  push();
  translate(width/2, 0, -1200);
  rotateY(7 + robotD);
  robot3.update();
  robot3.display();
  pop();
  
  push();
  translate(-width, 0, -1900);
  rotateY(-15 + robotD);
  robot4.update();
  robot4.display();
  pop();
  
  push();
  translate(width, 0, -1900);
  rotateY(15 + robotD);
  robot5.update();
  robot5.display();
  pop();
}

class Robot {
  constructor(seed, r = 255, g = 255, b = 255) {
    this.seed = seed;
    
    this.aux = 0;
    this.auz = 15;
    this.alx = 0;
    this.alz = -15;
    this.lux = 0;
    this.luz = 10;
    this.llx = 0;
    this.llz = 10;
    
    this.taux = 0;
    this.tauz = 15;
    this.talx = 0;
    this.talz = -15;
    this.tlux = 0;
    this.tluz = 10;
    this.tllx = 0;
    this.tllz = 10;
    
    this.saux = 0;
    this.sauz = 0;
    this.salx = 0;
    this.salz = 0;
    this.slux = 0;
    this.sluz = 0;
    this.sllx = 0;
    this.sllz = 0;
    
    this.spd = 10;
    
    this.r = r; this.g = g; this.b = b;
  }
  
  resetPose() {
    this.taux = 0;
    this.tauz = 15;
    this.talx = 0;
    this.talz = -15;
    this.tlux = 0;
    this.tluz = 10;
    this.tllx = 0;
    this.tllz = 10;
    this.newSpeed();
  }
  
  newSpeed() {
    this.saux = (this.taux - this.aux)/this.spd;
    this.sauz = (this.tauz - this.auz)/this.spd;
    this.salx = (this.talx - this.alx)/this.spd;
    this.salz = (this.talz - this.alz)/this.spd;
    this.slux = (this.tlux - this.lux)/this.spd;
    this.sluz = (this.tluz - this.luz)/this.spd;
    this.sllx = (this.tllx - this.llx)/this.spd;
    this.sllz = (this.tllz - this.llz)/this.spd;
  }
  
  newPose(n) {
    let taux = (n * this.seed * 1) % 180 - 90;
    let tauz = (n * this.seed * 2) % 145;
    let talx = (n * this.seed * 3) % 180 - 90;
    let talz = (n * this.seed * 4) % 145;
    let tlux = (n * this.seed * 5) % 60 - 15;
    let tluz = (n * this.seed * 6) % 55 - 20;
    let tllx = (n * this.seed * 7) % 60 - 15;
    let tllz = (n * this.seed * 8) % 45;
    
    if (this.taux == taux && this.tauz == tauz) {
      this.resetPose();
    }
    else {
      this.taux = taux;
      this.tauz = tauz;
      this.talx = talx;
      this.talz = talz;
      this.tlux = tlux;
      this.tluz = tluz;
      this.tllx = tllx;
      this.tllz = tllz;
      this.newSpeed();
    }
  }
  
  update() {
    if (abs(this.taux - this.aux) > 3) this.aux += this.saux;
    if (abs(this.tauz - this.auz) > 3) this.auz += this.sauz;
    if (abs(this.talx - this.alx) > 3) this.alx += this.salx;
    if (abs(this.talz - this.alz) > 3) this.alz += this.salz;
    if (abs(this.tlux - this.lux) > 3) this.lux += this.slux;
    if (abs(this.tluz - this.luz) > 3) this.luz += this.sluz;
    if (abs(this.tllx - this.llx) > 3) this.llx += this.sllx;
    if (abs(this.tllz - this.llz) > 3) this.llz += this.sllz;
  }
  
  display() {
    push();
    //body
    joint(0, 0, 0, 0, 0, 0, true, this.r, this.g, this.b);
    bone(200, 350, 80, this.r, this.g, this.b);
    push();
    translate(0, -75, 0);
    fill(50, 50, 120);
    sphere(70);
    pop();
    
    //head
    push();
    joint(0, -175, 0, 0, 0, 0, true, this.r, this.g, this.b);
    bone(150, -150, 150, this.r-55, this.g-55, this.b-55, true);
    translate(0, -75, 50);
    fill(50);
    sphere(50);
    pop();
    
    //left arm;
    push();
    //upper
    joint(-100, -160, 0, this.aux, 0, this.auz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-155, this.g-155, this.b-155, true, true);
    //lower
    joint(0, 200, 0, this.alx, 0, this.alz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-175, this.g-175, this.b-175, true, true);
    //hand
    joint(0, 200, 0, 0, 0, 0, true, this.r, this.g, this.b);
    fill(this.r, this.g, this.b);
    sphere(30);
    pop();
  
    //right arm;
    push();
    //upper
    joint(100, -160, 0, -this.aux, 0, -this.auz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-155, this.g-155, this.b-155, true, true);
    //lower
    joint(0, 200, 0, -this.alx, 0, -this.alz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-175, this.g-175, this.b-175, true, true);
    //hand
    joint(0, 200, 0, 0, 0, 0, true, this.r, this.g, this.b);
    fill(this.r, this.g, this.b);
    sphere(30);
    pop();
  
    //left leg;
    push();
    //upper
    joint(-80, 175, 0, this.lux, -15, this.luz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-155, this.g-155, this.b-155, true, true);
    //lower
    joint(0, 200, 0, -this.llx, -this.llx/3, -this.llz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-205, this.g-205, this.b-205, true, true);
    //foot
    joint(0, 200, 0, 0, 180, 0, true, this.r, this.g, this.b);
    fill(this.r, this.g, this.b);
    translate(0, 0, -50);
    scale(40, 30, 60);
    cylinder(1);
    pop();

    //right leg;
    push();
    //upper
    joint(80, 175, 0, this.lux, 15, -this.luz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-155, this.g-155, this.b-155, true, true);
    //lower
    joint(0, 200, 0, -this.llx, this.llx/3, this.llz, true, this.r, this.g, this.b);
    bone(60, 200, 50, this.r-205, this.g-205, this.b-205, true, true);
    //foot
    joint(0, 200, 0, 0, 180, 0, true, this.r, this.g, this.b);
    fill(this.r, this.g, this.b);
    translate(0, 0, -50);
    scale(40, 30, 60);
    cylinder(1);
    pop();
  
    pop();
  }
}

function bone(x, y, z, r= 255, g = 255, b = 255, topFixed = false, cylinderShape = false) {
  push();
  fill(r, g, b);
  if (topFixed) translate(0, y/2, 0);
  if (cylinderShape) {
    scale(x/2, y, z/2);
    cylinder(1);
  }
  else {
    scale(x, y, z);
    box(1);
  }
  pop();
}

function joint(x, y, z, dx, dy, dz, highlight = false, r=0, g=0, b=0) {
  translate(x, y, z);
  rotateY(dy);
  rotateZ(dz);
  rotateX(dx);
  if (!highlight) fill(100, 100, 100);
  else fill(r, g, b);
  sphere(20);
}
