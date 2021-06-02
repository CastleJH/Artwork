class mask {
  constructor(x, y, z, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dy = 0;
    this.dx = 0;
    this.t = t;
  }
  
  lookat(x, y, z) {
    this.dy = -atan2(this.x - x, dist(x, y, z, x, this.y, this.z));
    this.dx = atan2(this.y - y, dist(x, y, z, this.x, y, this.z));
  }
  
  changeTexture(nt) {
    this.t = nt;
  }
  
  display(maskType) {
    push();
    translate(this.x, this.y, this.z);
    rotateY(this.dy);
    rotateX(this.dx);
    
    switch (maskType % 5) {
      case 0:
        rotateZ(PI);
        scale(5);
        break;
      case 1:
        rotateZ(PI);
        scale(300);
        break;
      case 2:
        rotateZ(PI);
        scale(7);
        break;
      case 3:
        rotateZ(PI);
        scale(100);
        break;
      case 4:
        rotateY(PI/2);
        rotateZ(PI);
        scale(0.1);
        break;
      default:
        scale(300, 300, 50);
        break;
    }
    myshader.setUniform("imgTexture", textures[this.t % 9]);
    model(maskObjs[maskType % 5]);
    pop();
  }
}