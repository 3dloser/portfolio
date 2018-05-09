
//variables
var posX = 0;
var posX2;

//Elton John position
var eltonJohnX = 720;
var eltonJohnY = 150;

//player position
var fjmX = 50;
var fjmY = 150;

//object
var objectXPos, objectYPos;
var noiseLocation;


//=============================preload=================================

function preload() {
    
    //background
    background = loadImage("memphis.png")
    
    //characters
    eltonJohn = loadImage("../../elton-john.png");
    FJM = loadImage("../../father john misty.png")
        
}//end preload

//=============================setup=================================

function setup() {
    
    //create canvas 
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    
    //second canvas begins at the end of canvas
    posX2 = posX+5740;
    
    //object position
    objectXPos = eltonJohnX;
    objectYPos = eltonJohnY;
    
    noiseLocation = 0;
    
        }//end setup function

//=============================draw=================================

function draw() {
   
    //==========================background=============================
    
    //load background image
    image(background, posX, 0, 5740, 500);
    image(background, posX2, 0, 5740, 500);
    
    //move canvas left
    posX -= 1;
    posX2 -= 1;
    
    //when first image moves out of canvas
    if (posX < -5740) {
        posX = posX2 + 5740;
    }
    
    //when second image moves out of canvas
    if (posX2 < -5740) {
        posX2 = posX + 5740; 
    }
    
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

    
}//end draw function




  