function displayStage() {
  //floor
  push();
  fill(0, 255, 255, 150);
  cylinder(1000, 100, 4);
  fill(0, 255, 255, 150);
  scale(2000, 100, 1000);
  box(1);  
  pop();
  
  push();
  translate(-width/2, 0, -800);
  fill(0, 255, 255, 150);
  cylinder(1000, 100, 4);
  scale(2000, 100, 1000);
  box(1);  
  pop();
  
  push();
  translate(width/2, 0, -800);
  fill(0, 255, 255, 150);
  cylinder(1000, 100, 4);
  scale(2000, 100, 1000);
  box(1);  
  pop();
  
  push();
  translate(0, 0, -2000);
  fill(0, 255, 255, 150);
  cylinder(1000, 100, 4);
  scale(width*5, 100, 2000);
  box(1);  
  pop();
  
  //wall
  push();
  translate(-width, -1000, -3000);
  rotateY(10);
  fill(0, 255, 255);
  scale(width*5, 2000, 100);
  box(1);
  pop(); 
  
  push();
  translate(-width, -1000, -2800);
  rotateY(10);
  translate(-width*1.2, 0, 0);
  fill(0, 255, 205);
  scale(width, 2300, 100);
  box(1);
  pop();
  
  push();
  translate(width, -1000, -3000);
  rotateY(-10);
  fill(0, 235, 255);
  scale(width*5, 2000, 100);
  box(1);
  pop();
  
  push();
  translate(width, -1000, -2800);
  rotateY(-10);
  translate(width * 1.2, 0, 0);
  fill(0, 255, 205);
  scale(width, 2300, 100);
  box(1);
  pop();
  
  push();
  translate(0, -1000, -3100);
  fill(0, 0, 255);
  scale(width*4, 2000, 100);
  rotateX(90);
  cylinder(1, 1, 4);
  pop();
  
  //circle
  push();
  translate(-width * 1.7, 0, 500);
  fill(100, 205, 255, 150);
  scale(600, 100, 300);
  cylinder(1);
  pop();
  
  push();
  translate(width * 1.7, 0, 500);
  fill(100, 205, 255, 150);
  scale(600, 100, 300);
  cylinder(1);
  pop();  
}

