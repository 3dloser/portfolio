//background image position
var posX;
var posX2;

// Background 1
var moonX = 800;
var moonY, moonR;
var earthX = 700;
var earthY, earthR;
var p2X, p2Y, p2R;
var p3X, p3Y, p3R;
var p4X, p4Y, p4R;
var p5X, p5Y, p5R;
var p6X, p6Y, p6R;
var p7X, p7Y, p7R;
var SSX, SSY;
var spaceBG, moon, earth, p2, p3, p4, p5, p6, p7, SS;

// Background 2
var sunX, sunY, sunR;
var balloonX, balloonY, balloonR;
var balloon2X, balloon2Y, balloon2R;
var waterParticles = [];
var background, sun, baloon;

// Background 3
var memphis;

// Background 4
var starParticles = [];
var vaporwave,sun2,lineh,gridImg,sky,city;
var l1,l2,l3,l4,l5;

var trans1,trans2,trans3,trans4,final;


var playerImage = [[],[],[],[]];
var objectImage = [[],[],[],[]];
var playerSounds = [];
var throwerImage = [];
var throwerSounds = [];

var playerXPos, playerYPos;
var throwerXPos, throwerYPos;

var playerWidth = [];
var playerHeight = [];
var throwerWidth = [];
var throwerHeight = [];

var objectXPos, objectYPos;
var objectSpeed;
var numOfObject;
var objectState;  // <50: obstacle   >50: object to collect

var noiseLocation;

var gameState;  // 0: space  1: painting  2: memphis  3: vaporwave  4: ending animation

//Music

var startingMusic;
var newLevelMusic;
var level1Music;
var level2Music;
var level3Music;
var level4Music;
var clothesEffect;
var fatherJEffect;
var davidBowieEffect;
var lilPumpEffect;
var bobRossEffect;
var janitorEffect;
var eltonJohnEffect;
var eggEffect;
var robertSmithEffect;
var finalMusic;
var counter;
var startScreen;
//=============================preload=================================

function preload() {

    //transitions
    startScreen = loadImage("transitions/start.png");
    trans1 = loadImage("transitions/trans-1.png");
    trans2 = loadImage("transitions/trans-2.png");
    trans3 = loadImage("transitions/trans-3.png");
    trans4 = loadImage("transitions/trans-4.png");
    final = loadGif("transitions/final.gif");

    // Background 1
    spaceBG = loadImage("backgrounds/space/space.png");
    moon = loadImage("backgrounds/space/moon.png");
    earth = loadImage("backgrounds/space/earth.png");
    p2 = loadImage("backgrounds/space/planet-02.png");
    p3 = loadImage("backgrounds/space/planet-03.png");
    p4 = loadImage("backgrounds/space/planet-04.png");
    p5 = loadImage("backgrounds/space/planet-05.png");
    p6 = loadImage("backgrounds/space/planet-06.png");
    p7 = loadImage("backgrounds/space/planet-07.png");
    SS = loadImage("backgrounds/space/star.png");

    // Background 2
    background = loadImage("backgrounds/painting/painting.png");
    sun = loadImage("backgrounds/painting/sun.png");
    balloon = loadImage("backgrounds/painting/balloon.png");

    // Background 3
    memphis = loadImage("backgrounds/memphis/memphis.png");

    // Background 4
    vaporwave = loadImage("backgrounds/vaporwave/vaporwave.png");
    sun2 = loadGif("backgrounds/vaporwave/sun2.gif");
    lineh = loadImage("backgrounds/vaporwave/lineh.png");
    gridImg = loadImage("backgrounds/vaporwave/grid.png");
    sky = loadImage("backgrounds/vaporwave/sky.png");
    city = loadImage("backgrounds/vaporwave/city.png");


    //character set 1
    var temp;
    for(var i = 0; i < 6; i++) {
        temp = "character-sets/set1/father-john-misty-0" + (i+1) + ".png";
        playerImage[0][i] = loadImage(temp);
        temp = "character-sets/set1/sm-item-" + (i+1) + ".png";
        objectImage[0][i] = loadImage(temp);
    }
    throwerImage[0] = loadImage("character-sets/set1/bowie.png")


    //character set 2
    for(var i = 0; i < 6; i++) {
        temp = "character-sets/set2/lil-pump-0" + (i+1) + ".png";
        playerImage[1][i] = loadImage(temp);
        temp = "character-sets/set2/sm-item-" + (i+1) + ".png";
        objectImage[1][i] = loadImage(temp);
    }
    throwerImage[1] = loadImage("character-sets/set2/bob-ross.png")


    //character set 3
    for(var i = 0; i < 6; i++) {
        temp = "character-sets/set3/janitor-0" + (i+1) + ".png";
        playerImage[2][i] = loadImage(temp);
        temp = "character-sets/set3/sm-item-" + (i+1) + ".png";
        objectImage[2][i] = loadImage(temp);
    }
    throwerImage[2] = loadImage("character-sets/set3/elton-john.png")


    //character set 4
    for(var i = 0; i < 6; i++) {
        temp = "character-sets/set4/egg-0" + (i+1) + ".png";
        playerImage[3][i] = loadImage(temp);
        temp = "character-sets/set4/sm-item-" + (i+1) + ".png";
        objectImage[3][i] = loadImage(temp);
    }
    throwerImage[3] = loadImage("character-sets/set4/robert-smith.png")

    //Music
    startingMusic = loadSound("backgroundMusic/OpeningTheme.m4a");
    newLevelMusic = loadSound('soundEffects/New_Level.m4a');
    level1Music= loadSound('backgroundMusic/FatherJohnMistyFullSong.mp3');
    level2Music= loadSound('backgroundMusic/LilPump.mp3');
    level3Music= loadSound('backgroundMusic/JanitorFullSong.mp3');
    level4Music= loadSound('backgroundMusic/EggBG.m4a');
    clothesEffect = loadSound('soundEffects/Clothes.m4a');
    fatherJEffect = loadSound('soundEffects/FatherJohnMisty.m4a');
    davidBowieEffect = loadSound('soundEffects/DavidBowie.m4a');
    lilPumpEffect = loadSound('soundEffects/LilPump.m4a');
    bobRossEffect = loadSound('soundEffects/Bob_Ross 2.m4a');
    janitorEffect = loadSound('soundEffects/Janitor.m4a');
    eltonJohnEffect = loadSound('soundEffects/Elton_John.m4a');
    eggEffect = loadSound("soundEffects/Egg.m4a");
    robertSmithEffect = loadSound('soundEffects/RobertSmith.m4a');
    finalMusic = loadSound('backgroundMusic/FinalTheme.m4a');

    playerSounds = [fatherJEffect,lilPumpEffect,janitorEffect,eggEffect];
    throwerSounds = [davidBowieEffect,bobRossEffect,eltonJohnEffect,robertSmithEffect];
}//end preload

//=============================setup=================================

function setup() {

    //create canvas
    var canvas = createCanvas(900, 500);
    canvas.parent('myContainer');
    //thrower noise
    //counter=int(random(100, 300));

    playerXPos = 50;
    playerYPos = 150;
    throwerXPos = 750;
    throwerYPos = 150;

    objectXPos = throwerXPos;
    objectYPos = throwerYPos;

    numOfObject = 0;

    //objectSpeed = -10;

    objectState = int(random(0,100));

    noiseLocation = 0;

    gameState = -0.5;
    startingMusic.play();


    playerWidth[0] = 60;
    playerHeight[0] = 143;
    throwerWidth[0] = 83;
    throwerHeight[0] = 143;


    playerWidth[1] = 78;
    playerHeight[1] = 143;
    throwerWidth[1] = 80;
    throwerHeight[1] = 143;

    playerWidth[2] = 84;
    playerHeight[2] = 143;
    throwerWidth[2] = 98;
    throwerHeight[2] = 143;

    playerWidth[3] = 76;
    playerHeight[3] = 143;
    throwerWidth[3] = 77;
    throwerHeight[3] = 143;

    // Background 1
    posX = 0;
    posX2 = width;  //second canvas begins at the end of canvas
    planetLoad();

    // Background 2
    balloonLoad();
    sunX = 700;

    // Background 4
    l1 = new Gridline(-20, 270);
    l2 = new Gridline(-20, 320);
    l3 = new Gridline(-20, 370);
    l4 = new Gridline(-20, 420);
    l5 = new Gridline(-20, 470);


        }//end setup function

//=============================draw=================================

function draw() {

    //==========================game states=============================
    //space
    if (gameState == -0.5) {
        image(startScreen, 0, 0, 900, 500);
    }

    else if (gameState == 0) {
        //load bg
        background1();
        //objects collected
        noStroke();
        textSize(20);
        textFont('Rajdhani');
        fill(251, 255, 137);
        text ("Objects Collected: " + numOfObject, 20, 30);
        //characters
        text ("Father John Misty -VS- David Bowie", 350, 30);
    }
    //transition
    else if (gameState == 0.5) {
        image(trans1, 0, 0, 900, 500);
    }

    //painting
    else if (gameState == 1) {
        //load bg
        background2();
        noStroke();
        //objects collected
        textSize(20);
        textFont('Rajdhani');
        fill(255);
        text ("Objects Collected: " + numOfObject, 20, 30);
        //characters
        text ("Lil Pump -VS- Bob Ross", 350, 30);
    }
    //transition
    else if (gameState == 1.5) {
        image(trans2, 0, 0, 900, 500);
    }

    //memphis
    else if (gameState == 2) {
        //load bg
        background3();
        noStroke();
        //objects collected
        textSize(20);
        textFont('Passero+One');
        fill(0);
        text ("Objects Collected: " + numOfObject, 20, 30);
        //characters
        text ("Janitor Gary -VS- Elton John", 350, 30);
    }
    //transition
    else if (gameState == 2.5) {
        image(trans3, 0, 0, 900, 500);
    }

    //vaporwave
    else if (gameState == 3) {
        //load bg
        background4();
        noStroke();
        //objects collected
        textSize(20);
        textFont('VT323');
        fill(251, 255, 137);
        text ("Objects Collected: " + numOfObject, 20, 30);
        //characters
        text ("Egg -VS- Robert Smith", 350, 30);
    }
    //transition
    else if (gameState == 3.5) {
        image(trans4, 0, 0, 900, 500);
    }
    //final
    else if (gameState == 4) {
        image(final, 0, 0, 900, 500);
    }

    if (gameState == 0 || gameState == 1 || gameState == 2 || gameState == 3) {
      //thrower noise
       // counter-=1;
       // console.log("counter:"+counter);
       // if (counter==0){
       //   counter=int(random(100,300));
       //   throwerSounds[gameState].play();
       //   console.log("sound played");
       // }
        //==========================characters=============================

        // ------------------- object -------------------
        if (objectState < 70) {
          image(objectImage[gameState][5], objectXPos, objectYPos, objectImage[gameState][5].width, objectImage[gameState][5].height);
        }
        else {
          image(objectImage[gameState][numOfObject], objectXPos, objectYPos, objectImage[gameState][numOfObject].width, objectImage[gameState][numOfObject].height);
        }
        objectXPos += objectSpeed;
        //thrower sounds
        if (objectState>=70&&795<=objectXPos&&objectXPos<=800){
          console.log("objectx pos:"+objectXPos);
          throwerSounds[gameState].play();
        }
        if (objectXPos <= -50) {
          objectXPos = throwerXPos;
          objectYPos = throwerYPos;
          objectState = int(random(0,100));
          //
        }


        // ------------------- player -------------------
        // press "W"
        if (keyIsDown(87)) {
          playerYPos -= 10;
        }
        // press "S"
        if (keyIsDown(83)) {
          playerYPos += 10;
        }
        playerXPos = constrain (playerXPos, 0, 400);
        playerYPos = constrain (playerYPos, -100, 400);
        image(playerImage[gameState][numOfObject], playerXPos, playerYPos, playerWidth[gameState], playerHeight[gameState]);


        // ------------------- thrower -------------------
        throwerYPos = throwerYPos + (playerYPos-throwerYPos)*0.2 + map(noise(noiseLocation), 0, 1, -100, 100);
        throwerYPos = constrain (throwerYPos, -100, 400);
        noiseLocation += 0.008;
        image(throwerImage[gameState], throwerXPos, throwerYPos, throwerWidth[gameState], throwerHeight[gameState]);

        // ------------------- collision detection -------------------
        if ((objectYPos+objectImage[gameState][numOfObject].height) < playerYPos ||
            objectYPos > (playerYPos+playerHeight[gameState]) ||
            (objectXPos+objectImage[gameState][numOfObject].width) < playerXPos ||
            objectXPos > (playerXPos+playerWidth[gameState])) {
          // no collision
        }
        else {
          //collision
          if (objectState < 70) {
            numOfObject--;
            if (numOfObject < 0) {
                numOfObject++;
            }
            playerSounds[gameState].play();
            playerXPos = 50;
            playerYPos = 150;
          }
          else {
            numOfObject++;
            clothesEffect.play();
            objectSpeed -= 0.2;
          }
          objectXPos = throwerXPos;
          objectYPos = throwerYPos;
          objectState = int(random(0,100));

          //

          // switch to the next page
          if (numOfObject == 5) {
            gameState += 0.5;
            numOfObject = 0;

            //THIS IS WHERE YOU PLAY THE MUSIC
            changeMusic();
          }
        }
    }



    if (gameState==-0.5||gameState == 0.5 || gameState == 1.5 || gameState == 2.5 || gameState == 3.5) {
        if (mouseIsPressed) {
          gameState += 0.5;
          if(gameState==0){
            posX=0;
            posX2=1200;
            objectSpeed= -11;
          }
          if (gameState == 1) {
            posX = 0;
            posX2 = 3855;
            objectSpeed= -12;
          }
          if (gameState == 2) {
            posX = 0;
            posX2 = 5740;
            objectSpeed=-13;
          }
          if (gameState == 3) {
            posX = 0;
            posX2 = 900;
            objectSpeed=-20;
          }
          //play new music for the LEVEL
          changeMusic();

        }
    }





}//end draw function

//==========================background 1===============================
function background1() {
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
}

//==========================background 2===============================
function background2() {
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
    for (var j = 0; j < 920; j+=20) {
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
}

//==========================background 3===============================
function background3() {
    //load background image
    image(memphis, posX, 0, 5740, 500);
    image(memphis, posX2, 0, 5740, 500);

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
}

//==========================background 4===============================
function background4() {
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
    image(vaporwave, posX, 0, 900, 500);
    image(vaporwave, posX2, 0, 900, 500);

    //sun
    image(sun2, 350, 80, 215, 200);

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
}

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

function changeMusic() {
  switch (gameState) {
    case -0.5:
      startingMusic.play();
   case 0:
      //run this
      startingMusic.stop();
      level1Music.play();
      break;
    case 0.5:
      //run this
      level1Music.stop();
      newLevelMusic.play();
      break;
    case 1:
      //run this
      level2Music.play();
      break;
    case 1.5:
      //run this
      level2Music.stop();
      newLevelMusic.play();
      break;
    case 2:
      //run this
      level3Music.play();
      break;
    case 2.5:
      //run this
      level3Music.stop();
      newLevelMusic.play();
      break;
    case 3:
      //run this
      level4Music.play();
      break;
    case 3.5:
      //run this
      level4Music.stop();
      break;
    case 4:
      finalMusic.play();
    }
}
