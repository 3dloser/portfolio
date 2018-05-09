
//variables
var posX = 0;
var posX2 = 900;

//stars
var starParticles = [];


/*
//Elton John position
var eltonJohnX = 720;
var eltonJohnY = 150;

//player position
var fjmX = 50;
var fjmY = 150;

//object
var objectXPos, objectYPos;
var noiseLocation;*/


//=============================preload=================================

function preload() {
    
    //background
    background = loadImage("vaporwave.png");
    
    //sun
    sun = loadGif("sun2.gif");
    
    //grid horizontal
    lineh = loadImage("lineh.png");
    
    //grid vertical
    gridImg = loadImage("grid.png");
    
    //sky
    sky = loadImage("sky.png");
    
    //city
    city = loadImage("city.png");
    
    //characters
    /*eltonJohn = loadImage("../../elton-john.png");
    FJM = loadImage("../../father john misty.png")*/
        
}//end preload

//=============================setup=================================

function setup() {
    
    //create canvas 
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    
    //grid lines
    l1 = new Gridline(-20, 270);
    l2 = new Gridline(-20, 320);
    l3 = new Gridline(-20, 370);
    l4 = new Gridline(-20, 420);
    l5 = new Gridline(-20, 470);
    
//    //object position
//    objectXPos = eltonJohnX;
//    objectYPos = eltonJohnY;
//    
//    noiseLocation = 0;
    
        }//end setup function

//=============================draw=================================

function draw() {
   
    //==========================background=============================

    //move canvas left
    posX -= 1;
    posX2 -= 1;
    
    //when first image moves out of canvas
    if (posX < -900) {
        posX = posX2 + 900;
    }
    
    //when second image moves out of canvas
    if (posX2 < -900) {
        posX2 = posX + 900; 
    }
    
    //load background image
    image(background, posX, 0, 900, 500);
    image(background, posX2, 0, 900, 500);
    
    //sun
    image(sun, 350, 80, 215, 200);
    
    //stars
    var tempParticle = new starParticle(450, 290);
    starParticles.push(tempParticle);
    
  // draw all stars
  for (var i = 0; i < starParticles.length; i++) {
    starParticles[i].moveAndDisplay(); 
    
    //remove particle if off screen
    if (starParticles[i].isOffScreen() == true) {
      starParticles.splice(i, 1);
      i--;
    }
  }//end drawing particles
    
    //city
    image(city, posX, 0, 900, 500);
    image(city, posX2, 0, 900, 500);
    
    //grid
    image(gridImg, 0, 0, 900, 500);
    
    //sky
    image(sky, 0, 0, 900, 500);

    //grid
    l1.moveAndDisplay();
    l2.moveAndDisplay();
    l3.moveAndDisplay();
    l4.moveAndDisplay();
    l5.moveAndDisplay();
    
    /*
    //=========================object====================
   
    //create object
    ellipse(objectXPos, objectYPos, 50, 50);
    
    //shoot object towards player
    objectXPos -= 10;
    
    // shoot again
    if (objectXPos < 5) {
      objectXPos = eltonJohnX + 60;
      objectYPos = eltonJohnY + 120;
    }
    
    //==========================characters=============================
    
  
    //move player
    image(FJM, fjmX, fjmY, 84, 200)
    
    if (mouseIsPressed) {
      fjmX = mouseX - 42;
      fjmY = mouseY - 100;
    }

    //move thrower
    eltonJohnY = map(noise(noiseLocation), 0, 1, 0, 500);
    noiseLocation += 0.008;
    image(eltonJohn, eltonJohnX, eltonJohnY, 178, 260);
*/
    
}//end draw function

class starParticle {

  constructor(x, y) {
      
    // store position
    this.x = x;
    this.y = y;
  
    // randomize speed
    this.speedX = random(-1, 1);
    this.speedY = random(0, 0.5);
  }
  // move and display function
  moveAndDisplay() {
    this.x -= this.speedX;
    this.y -= this.speedY;
    
    // draw particle
    push();
    translate(this.x, this.y);
    
    fill(255, 80);
    noStroke();

    ellipse(-25, 0, 2, 2);
    
    pop();
    
  }
  
  // see if we are off screen
  isOffScreen() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      return true;
    }
    return false;
  }

}//end waterParticle

//grid
class Gridline {
    constructor(x,y){
        this.x = x;
        this.y = y;
        
        //starting width & height & speed
        this.w = 950;
        this.h = 30;
        this.speedY = 0;
        
    }
    moveAndDisplay() {
        
        //display image
        image(lineh, this.x, this.y, this.w, this.h);
        
        //draw new line when it reaches horizon
        if (this.y >= 500) {
        this.h = 30;
        this.y = 280;
        this.speedY = 0;
        }
        
        if (this.speedY >= 5) {
        this.speedY = 5;
        }
        
        //speed
        this.speedY += 0.05;
        
        //move down
        this.y += this.speedY;
        
        //grow thicker
        this.h += 1;
    }
}

  