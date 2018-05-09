
//variables
var posX = 0;
var posX2;

//sun
var sunX, sunY, sunR;

//hot air balloons
var balloonX, balloonY, balloonR;
var balloon2X, balloon2Y, balloon2R;

//bob ross position
var bobRossX = 750;
var bobRossY = 150;

//player position
var fjmX = 50;
var fjmY = 150;

//object
var objectXPos, objectYPos;
var noiseLocation;

//water
var waterParticles = [];

//=============================preload=================================

function preload() {
    
    //background
    background = loadImage("painting.png")
    
    //items
    sun = loadImage("sun.png")
    balloon = loadImage("balloon.png")
    
    //characters
    bobRoss = loadImage("../../bob-ross.png");
    lilPump = loadImage("../../lilPump/lil-pump-01.png");
        
}//end preload

//=============================setup=================================

function setup() {
    
    //create canvas 
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    
    //second canvas begins at the end of canvas
    posX2 = posX+3855;
    
    //create hot air balloons
    balloonLoad();
    
    //object position
    objectXPos = bobRossX;
    objectYPos = bobRossY;
    
    noiseLocation = 0;
    
    sunX = 700;
    
        }//end setup function

//=============================draw=================================

function draw() {
   
    //==========================background=============================
    
    //load background image
    image(background, posX, 0, 3855, 500);
    image(background, posX2, 0, 3855, 500);
    
    //move canvas left
    posX -= 1;
    posX2 -= 1;
    
    //when first image moves out of canvas
    if (posX < -3855) {
        posX = posX2 + 3855;
    }
    
    //redistribute items 
    if ((balloonX < -500 || balloonY < -500) && (balloon2X < -500 || balloon2Y < -500)) {
        balloonLoad();
    }
    
    //when second image moves out of canvas
    if (posX2 < -3855) {
        posX2 = posX + 3855; 
    }
     
    
   //sun  
    image(sun, sunX, 10, 150, 150);
    //move sun
    sunX -= 0.05;

    //hot air balloons
    image(balloon, balloonX, balloonY, balloonR, balloonR);
    image(balloon, balloon2X, balloon2Y, balloon2R, balloon2R);
    
    //move balloon
    balloonX -= 0.5;
    balloonY -= 0.3;
    balloon2X -= 0.5;
    balloon2Y -= 0.3;
    
    //water
    for (var j = 0; j < 920; j+=10) {
        var tempParticle = new waterParticle(j, 467);
        waterParticles.push(tempParticle);
    }
    //water surface
    stroke(201, 213, 255);
    strokeWeight(3);
    line(0, 462, 900, 465);
    
  // draw all particles
  for (var i = 0; i < waterParticles.length; i++) {
    waterParticles[i].moveAndDisplay(); 
    
    //remove particle if off screen
    if (waterParticles[i].isOffScreen() == true) {
      waterParticles.splice(i, 1);
      
      // back up by one, so that we don't skip a particle
      i--;
    }
  }//end drawing particles
    
    //=========================object====================
   
    //create object
    ellipse(objectXPos, objectYPos, 50, 50);
    
    //shoot object towards player
    objectXPos -= 10;
    
    // shoot again
    if (objectXPos < 5) {
      objectXPos = bobRossX + 60;
      objectYPos = bobRossY + 120;
    }
    
    //==========================characters=============================
    
  
    //move player
    image(FJM, fjmX, fjmY, 84, 200)
    
    if (mouseIsPressed) {
      fjmX = mouseX - 42;
      fjmY = mouseY - 100;
    }

    //move thrower
    bobRossY = map(noise(noiseLocation), 0, 1, 0, 500);
    noiseLocation += 0.008;
    image(bobRoss, bobRossX, bobRossY, 120, 240);

    
}//end draw function


function balloonLoad() {

    balloonX = random(0,900);
    balloonY = random(0,400);
    balloonR = random(10,50);
    
    balloon2X = random(0,900);
    balloon2Y = random(0,400);
    balloon2R = random(10,50); 

}

class waterParticle {

  constructor(x, y) {
      
    // store position
    this.x = x;
    this.y = y;
  
    // randomize speed
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }
  // move and display function
  moveAndDisplay() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // draw particle
    push();
    translate(this.x, this.y);
    
    fill(201, 213, 255);
    noStroke();

    ellipse(-25, 0, 2, 2);
    
    pop();
    
  }
  
  // see if we are off screen
  isOffScreen() {
    if (this.x > 923 || this.x < 0 || this.y > 480 || this.y < 465) {
      return true;
    }
    return false;
  }

}//end waterParticle
  