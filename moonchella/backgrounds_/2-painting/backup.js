
//variables
var posX = 0;
var posX2;

//sun
var sunX, sunY, sunR;

//clouds
var cloudX, cloudY, cloudR;
var cloud2X, cloud2Y, cloud2R;
var cloud3X, cloud3Y, cloud3R;
var cloud4X, cloud4Y, cloud4R;
var cloud5X, cloud5Y, cloud5R;

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
    

//=============================preload=================================

function preload() {
    
    //background
    background = loadImage("painting.png")
    
    //items
    sun = loadImage("sun.png")
    balloon = loadImage("balloon.png")
    //cloud = loadImage("cloud.png")
    
    //characters
    bobRoss = loadImage("../../bob-ross.png");
    FJM = loadImage("../../father john misty.png")
        
}//end preload

//=============================setup=================================

function setup() {
    
    //create canvas 
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    
    //second canvas begins at the end of canvas
    posX2 = width;
    
    //create hot air balloons
    balloonLoad();
    
    //create clouds
    //cloudLoad();
    
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
    
    /*
    //clouds
    image(cloud, cloudX, cloudY, cloudR, cloudR);
    image(cloud, cloud2X, cloud2Y, cloud2R, cloud2R);
    image(cloud, cloud3X, cloud3Y, cloud3R, cloud3R);
    image(cloud, cloud4X, cloud4Y, cloud4R, cloud4R);
    image(cloud, cloud5X, cloud5Y, cloud5R, cloud5R);
    //move clouds
    cloudX -= 0.3;
    cloud2X -= 0.3;
    cloud3X -= 0.3;
    cloud4X -= 0.3;
    cloud5X -= 0.3;
    */
    //hot air balloons
    image(balloon, balloonX, balloonY, balloonR, balloonR);
    image(balloon, balloon2X, balloon2Y, balloon2R, balloon2R);
    
    //move balloon
    balloonX -= 0.5;
    balloonY -= 0.3;
    balloon2X -= 0.5;
    balloon2Y -= 0.3;
    
    
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

/*
function cloudLoad() {

    cloudX = random(0,900);
    cloudY = random(0,200);
    cloudR = random(20,200); 
    
    cloud2X = random(0,900);
    cloud2Y = random(0,200);
    cloud2R = random(20,200); 
    
    cloud3X = random(0,900);
    cloud3Y = random(0,200);
    cloud3R = random(20,200);
    
    cloud4X = random(0,900);
    cloud4Y = random(0,200);
    cloud4R = random(20,200); 
    
    cloud5X = random(0,900);
    cloud5Y = random(0,200);
    cloud5R = random(20,200); 
}*/
