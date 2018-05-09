
//variables
var posX = 0;
var posX2;

//moon
var moonX = 800;
var moonY, moonR;
//earth
var earthX = 700;
var earthY, earthR;

//planets
var p2X, p2Y, p2R;
var p3X, p3Y, p3R;
var p4X, p4Y, p4R;
var p5X, p5Y, p5R;
var p6X, p6Y, p6R;
var p7X, p7Y, p7R;
var SSX, SSY;

//bowie position
var bowieX = 750;
var bowieY = 150;

var fjmX = 50;
var fjmY = 150;

//object
var objectXPos, objectYPos;
var noiseLocation;
    

//=============================preload=================================

function preload() {
    
    //background
    spaceBG = loadImage("space.png")
    
    //planets
    moon = loadImage("moon.png")
    earth = loadImage("earth.png")
    p2 = loadImage("planet-02.png")
    p3 = loadImage("planet-03.png")
    p4 = loadImage("planet-04.png")
    p5 = loadImage("planet-05.png")
    p6 = loadImage("planet-06.png")
    p7 = loadImage("planet-07.png")
    SS = loadImage("star.png")
    
    //characters
    bowie = loadGif("../../bowie.gif");
    FJM = loadImage("../../father john misty.png")
        
}//end preload

//=============================setup=================================

function setup() {
    
    //create canvas 
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    
    //second canvas begins at the end of canvas
    posX2 = width;
    
    //create planets
    planetLoad();

    //object position
    objectXPos = bowieX;
    objectYPos = bowieY;
    
    noiseLocation = 0;
    
        }//end setup function

//=============================draw=================================

function draw() {
   
    //==========================background=============================
    
    //load background image
    image(spaceBG, posX, 0, 1929, 500);
    image(spaceBG, posX2, 0, 1929, 500);
    
    //move canvas left
    posX -= 0.5;
    posX2 -= 0.5;
    
    //when first image moves out of canvas
    if (posX < -1200) {
        posX = posX2 + 1200;
        
        //redistribute planets 
        planetLoad();
     
    }
    
    //when second image moves out of canvas
    if (posX2 < -1200) {
        posX2 = posX + 1200; 
    }
     
    
   //planet images
    
    image(moon, moonX, 120, 90, 90);
    image(earth, earthX, 150, 100, 100);
    
    image(p2, p2X, p2Y, p2R, p2R);
    image(p3, p3X, p3Y, p3R, p3R);
    image(p4, p4X, p4Y, p4R, p4R);
    image(p5, p5X, p5Y, p5R, p5R);
    image(p6, p6X, p6Y, p6R, p6R);
    image(p7, p7X, p7Y, p7R, p7R);
    
    //shooting star
    image(SS, SSX, SSY, 50, 35);
    
    //move planets with background
    moonX -= 0.05;
    earthX -= 0.05;
    
    p2X -= 0.6;
    p3X -= 0.6;
    p4X -= 0.6;
    p5X -= 0.6;
    p6X -= 0.6;
    p7X -= 0.6;
    
    //shooting star
    SSX -= 0.7;
    SSY += 0.2;
    
    //=========================object====================
   
    //create object
    ellipse(objectXPos, objectYPos, 50, 50);
    
    //shoot object towards player
    objectXPos -= 10;
    
    // shoot again
    if (objectXPos < 5) {
      objectXPos = bowieX + 60;
      objectYPos = bowieY + 120;
    }
    
    //==========================characters=============================
    
  
    //move player
    image(FJM, fjmX, fjmY, 84, 200)
    
    if (mouseIsPressed) {
      fjmX = mouseX - 42;
      fjmY = mouseY - 100;
    }

    //move thrower
    bowieY = map(noise(noiseLocation), 0, 1, 0, 500);
    noiseLocation += 0.008;
    image(bowie, bowieX, bowieY, 120, 240);
    
    
}//end draw function


function planetLoad() {
    
    //planets
    p2X = random(0,1500);
    p2Y = random(0,500);
    p2R = random(10,100);
    
    p3X = random(0,1500);
    p3Y = random(0,500);
    p3R = random(10,100);
    
    p4X = random(0,1500);
    p4Y = random(0,500);
    p4R = random(10,100);
    
    p5X = random(0,1500);
    p5Y = random(0,500);
    p5R = random(10,100);
    
    p6X = random(0,1500);
    p6Y = random(0,500);
    p6R = random(10,100);
    
    p7X = random(0,1500);
    p7Y = random(0,500);
    p7R = random(10,50);
    
    SSX = random(0,1500);
    SSY = random(0,500);
    
}
