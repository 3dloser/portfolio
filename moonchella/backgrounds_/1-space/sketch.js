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

var playerImage = [];
var objectImage = [];
var throwerImage;

var playerXPos, playerYPos;
var throwerXPos, throwerYPos;

var objectXPos, objectYPos;
var numOfObject;
var objectState;  // <50: obstacle   >50: object to collect

var noiseLocation;
    
//game states
// 0 = game start
// 1 = game playing
// 2 = game end
var gameState = 0;

//=============================preload=================================

function preload() {
    
    //background
    spaceBG = loadImage("../../backgrounds/space/space.png");
    
    //planets
    moon = loadImage("../../backgrounds/space/moon.png");
    earth = loadImage("../../backgrounds/space/earth.png");
    p2 = loadImage("../../backgrounds/space/planet-02.png");
    p3 = loadImage("../../backgrounds/space/planet-03.png");
    p4 = loadImage("../../backgrounds/space/planet-04.png");
    p5 = loadImage("../../backgrounds/space/planet-05.png");
    p6 = loadImage("../../backgrounds/space/planet-06.png");
    p7 = loadImage("../../backgrounds/space/planet-07.png");
    SS = loadImage("../../backgrounds/space/star.png");
    asteroid = loadImage("asteroid.png");
    
    //character set 1
    var temp;
    for(var i = 0; i < 6; i++) {
        temp = "../../FatherJohnMisty/father-john-misty-0" + (i+1) + ".png";
        playerImage[i] = loadImage(temp);
    }
    for(var i = 0; i < 5; i++) {
        temp = "../../FatherJohnMisty/sm-item-" + (i+1) + ".png";
        objectImage[i] = loadImage(temp);
    }
    throwerImage = loadImage("../../bowie.png");
        
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

    playerXPos = 50;
    playerYPos = 150;
    throwerXPos = 750;
    throwerYPos = 150;

    objectXPos = throwerXPos + 60;
    objectYPos = throwerYPos + 120;

    numOfObject = 0;

    objectState = int(random(0,100));

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

    textSize(15);
    fill(251, 255, 137);
    textFont('Rajdhani');
    text ("Objects Collected: " + numOfObject + "/5", 20, 20);
    
    //==========================characters=============================
    // ------------------- object -------------------
    //if its an asteroid
    if (objectState < 50) {
      image(asteroid, objectXPos, objectYPos, 100, 100);
    }
    
    //if its an object to be collected
    else {
      image(objectImage[numOfObject], objectXPos, objectYPos, objectImage[numOfObject].width, objectImage[numOfObject].height);
    }
    objectXPos -= 10;
    
    //shoot new object when object leaves screen
    if (objectXPos <= -50) {
      objectXPos = throwerXPos + 60;
      objectYPos = throwerYPos + 120;
      objectState = int(random(0,100));
    }

    // ------------------- collision detection -------------------
    // no collision
    if ((objectYPos + objectImage[numOfObject].height) < playerYPos || 
        objectYPos > (playerYPos+200) || 
        (objectXPos + objectImage[numOfObject].width) < playerXPos || 
        objectXPos > (playerXPos+84)) {
      
    }
    //collision
    else {
        //lose item if hit by asteroid
        if (objectState < 50) {
        numOfObject--;
            //prevent object number from going negative
            if (numOfObject < 0) {
                numOfObject++;
            }
        playerXPos = 50;
        playerYPos = 150;
        }
        
        else { 
            if (numOfObject > 4) {
                image(playerImage[numOfObject], playerXPos, playerYPos, 84, 200);
                numOfObject--;
        }
            else {
                numOfObject++;
            }
        }
      
      objectXPos = throwerXPos + 60;
      objectYPos = throwerYPos + 120;
      objectState = int(random(0,100));
    }

  
    // ------------------- player -------------------
    if (mouseIsPressed) {
      playerXPos = mouseX - 42;
      playerYPos = mouseY - 100;
    }
    playerXPos = constrain (playerXPos, 0, 400);
    playerYPos = constrain (playerYPos, -100, 400);
    
    image(playerImage[numOfObject], playerXPos, playerYPos, 84, 200);


    // ------------------- thrower -------------------
    throwerYPos = throwerYPos + (playerYPos-throwerYPos)*0.2 + map(noise(noiseLocation), 0, 1, -100, 100);
    noiseLocation += 0.008;
    image(throwerImage, throwerXPos, throwerYPos, 116, 200);
    
    
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
