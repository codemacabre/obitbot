import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class tombstone extends PApplet {

// Global variables
int tombWidth = PApplet.parseInt(random(65, 220));
int tombHeight = PApplet.parseInt(random(90, 150));
int topHeight = PApplet.parseInt(random(40));
int topMidWidth = PApplet.parseInt(random(tombWidth));
int topMidHeight = PApplet.parseInt(random(0, (topHeight + 5)));
int topSelector = PApplet.parseInt(random(2));
int emblemSelector = PApplet.parseInt(random(2));
int smallShoulder = PApplet.parseInt(random(25, 100));
int largeShoulder = PApplet.parseInt(random(smallShoulder + 5, smallShoulder + 55));

public void setup() {
  
  background(0xff101013);
  stroke(0xffffffff);
  fill(0xffffffff);
  noLoop();
}

public void draw() {
  // Draw ground
  line(10, 210, 430, 210);

  // Select type of tombstone
  switch (topSelector) {
    case 0:
      tombRoundRegular();
      if (emblemSelector == 0) {
        drawEmblem();
      }
      break;
    case 1:
      tombAngularRegular();
      if (emblemSelector == 0) {
        drawEmblem();
      }
      break;
    case 2:
      tombRoundIrregular();
      if (emblemSelector == 0) {
        drawEmblem();
      }
      break;
    case 3:
      tombAngularIrregular();
      if (emblemSelector == 0) {
        drawEmblem();
      }
      break;
    default:
      break;
  }
  // Draw inscription
  drawInscription();
  save("output.png");
  exit();
}

public void drawMainStone() {
  // main shape
  beginShape();
  vertex((width / 2) - (tombWidth / 2), 210);
  vertex((width / 2) - (tombWidth / 2), 210 - tombHeight);
  vertex((width / 2) + (tombWidth / 2), 210 - tombHeight);
  vertex((width / 2) + (tombWidth / 2), 210);
  endShape();
}

public void drawEmblem() {
  int emblem = PApplet.parseInt(random(9));
  switch(emblem) {
    case 0:
      println("Adding cross emblem...");
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 20);
      line((width / 2) - 10, 210 - tombHeight - topHeight - 10, (width / 2) + 10, 210 - tombHeight - topHeight - 10);
      break;
    case 1:
      println("Adding ellipse emblem...");
      noFill();
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 20);
      line((width / 2) - 10, 210 - tombHeight - topHeight - 10, (width / 2) + 10, 210 - tombHeight - topHeight - 10);
      ellipse((width / 2), 210 - tombHeight - topHeight - 10, 13, 13);
      break;
    case 2:
      println("Adding sun emblem...");
      fill(0xff101013);
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 25);
      line((width / 2) - 8, 210 - tombHeight - topHeight - 23, (width / 2) + 8, 210 - tombHeight - topHeight - 7);
      line((width / 2) - 10, 210 - tombHeight - topHeight - 15, (width / 2) + 10, 210 - tombHeight - topHeight - 15);
      line((width / 2) - 8, 210 - tombHeight - topHeight - 7, (width / 2) + 8, 210 - tombHeight - topHeight - 23);
      ellipse((width / 2), 210 - tombHeight - topHeight - 15, 13, 13);
      break;
    case 3:
      println("Adding simple line emblem...");
      fill(0xff101013);
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 15);
      break;
    case 4:
      println("Adding cross potent emblem...");
      line(width / 2 - 10, 210 - tombHeight - topHeight - 5, (width / 2) - 10, 210 - tombHeight - topHeight - 15);
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 20);
      line(width / 2 + 10, 210 - tombHeight - topHeight - 5, (width / 2) + 10, 210 - tombHeight - topHeight - 15);
      line((width / 2) - 10, 210 - tombHeight - topHeight - 10, (width / 2) + 10, 210 - tombHeight - topHeight - 10);
      line((width / 2) - 5, 210 - tombHeight - topHeight - 20, (width / 2) + 5, 210 - tombHeight - topHeight - 20);
      break;
    case 5:
      println("Adding double-triangle emblem...");
      noFill();
      line(width / 2, 210 - tombHeight - topHeight, width / 2, 210 - tombHeight - topHeight - 10);
      triangle((width / 2) - 10, 210 - tombHeight - topHeight - 10, width / 2, 210 - tombHeight - topHeight - 25, (width / 2) + 10, 210 - tombHeight - topHeight - 10);
      triangle((width / 2) - 10, 210 - tombHeight - topHeight - 15, width / 2, 210 - tombHeight - topHeight - 30, (width / 2) + 10, 210 - tombHeight - topHeight - 15);
      break;
    case 6:
      println("Adding scotia shoulders...");
      noStroke();
      fill(0xff101013);
      ellipse((width / 2) - (topMidWidth / 2), 210 - tombHeight - topMidHeight, smallShoulder, smallShoulder);
      ellipse((width / 2) + (topMidWidth / 2), 210 - tombHeight - topMidHeight, smallShoulder, smallShoulder);
      break;
    case 7:
      println("Adding double-scotia shoulders with point emblem...");
      noStroke();
      fill(0xff101013);
      ellipse((width / 2) - (topMidWidth / 2), 210 - tombHeight - topMidHeight, smallShoulder, smallShoulder);
      ellipse((width / 2) + (topMidWidth / 2), 210 - tombHeight - topMidHeight, smallShoulder, smallShoulder);

      stroke(0xff101013);
      noFill();
      ellipse((width / 2) - (topMidWidth / 2), 210 - tombHeight - topMidHeight, largeShoulder, largeShoulder);
      ellipse((width / 2) + (topMidWidth / 2), 210 - tombHeight - topMidHeight, largeShoulder, largeShoulder);

      stroke(0xffffffff);
      fill(0xffffffff);
      int r = PApplet.parseInt(random(2));
      if (r == 0) {
        line(width / 2, 210, width / 2, 210 - tombHeight - topMidHeight - 20);
      }
      break;
    case 8:
      println("Adding double-scotia shoulders...");
      noStroke();
      fill(0xff101013);
      ellipse((width / 2) - (tombWidth / 2), 210 - tombHeight - tombHeight, smallShoulder, smallShoulder);
      ellipse((width / 2) + (tombWidth / 2), 210 - tombHeight - tombHeight, smallShoulder, smallShoulder);

      stroke(0xff101013);
      noFill();
      ellipse((width / 2) - (tombWidth / 2), 210 - tombHeight - tombHeight, largeShoulder, largeShoulder);
      ellipse((width / 2) + (tombWidth / 2), 210 - tombHeight - tombHeight, largeShoulder, largeShoulder);
      break;
  }
}

public void drawInscription() {
  stroke(0xff101013);
  line((width / 2) - (tombWidth / 2) + 20, 210 - (2 * (tombHeight / 5)), (width / 2) + (tombWidth / 2) - 20, 210 - (2 * (tombHeight / 5)));
  line((width / 2) - (tombWidth / 2) + 20, 210 - (2 * (tombHeight / 5)) - 20, (width / 2) + (tombWidth / 2) - 20, 210 - (2 * (tombHeight / 5)) - 20);
  line((width / 2) - (tombWidth / 2) + 20, 210 - (2 * (tombHeight / 5)) - 20 - 20, (width / 2) + (tombWidth / 2) - 20, 210 - (2 * (tombHeight / 5)) - 20 - 20);

}

public void tombRoundRegular() {
  println("Drawing round-top tombstone (regular)...");
  drawMainStone();

  beginShape();
  curveVertex((width / 2) - (tombWidth / 2), 210 - tombHeight);
  curveVertex((width / 2) - (tombWidth / 2), 210 - tombHeight);
  curveVertex((width / 2) - (topMidWidth / 2), 210 - tombHeight - topMidHeight);
  curveVertex((width / 2), 210 - tombHeight - topHeight); // apex
  curveVertex((width / 2) + (topMidWidth / 2), 210 - tombHeight - topMidHeight);
  curveVertex((width / 2) + (tombWidth / 2), 210 - tombHeight);
  curveVertex((width / 2) + (tombWidth / 2), 210 - tombHeight);
  endShape();
}
public void tombRoundIrregular() {
  println("Drawing round-top tombstone (irregular)...");
  drawMainStone();

  // TODO
}

public void tombAngularRegular() {
  println("Drawing angular-top tombstone (regular)...");
  drawMainStone();

  beginShape();
  vertex((width / 2) - (tombWidth / 2), 210 - tombHeight);
  vertex((width / 2) - (tombWidth / 2), 210 - tombHeight);
  vertex((width / 2) - (topMidWidth / 2), 210 - tombHeight - topMidHeight);
  vertex((width / 2), 210 - tombHeight - topHeight); // apex
  vertex((width / 2) + (topMidWidth / 2), 210 - tombHeight - topMidHeight);
  vertex((width / 2) + (tombWidth / 2), 210 - tombHeight);
  vertex((width / 2) + (tombWidth / 2), 210 - tombHeight);
  endShape();
}

public void tombAngularIrregular() {
  println("Drawing angular-top tombstone (irregular)...");
  drawMainStone();

  // TODO
}
  public void settings() {  size(440, 220); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "tombstone" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
