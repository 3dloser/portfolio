var zero = 0;

//background variables
var set;
var marmite;
var toastX, toastY;
var toast;

//landing pad
var table;
var tableX;
var tableY = 545;

//score
var score = 0;
var totalScore;

//gravity
var g = 0.001;

//create velocity variables
var velX = 0;
var velY = 0;
var velYText = 0;

//set initial position
var marmiteX = 350;
var marmiteY = 50;

//marmite animation
var marmiteBroke;
var frameNum = 0;

//set initial altitude
var altitude = 650;

//set initial fuel
var fuel = 1000;

//acceleration
var a = 0.002;

//var startText = "press any key to begin";
var gameStart;
var gameModeText = "Select Game Mode";
var easyOrHard = "Press 'e' for easy and 'h' for hard";
var gameHard = false;
var scoreText = "Score: " + score;
var add;


//=============================preload=================================

function preload() {
    
    //backgroung image
    set = loadImage("set-new.png");
    marmite = loadImage("marmite.png");
    table = loadImage("table.png");
    toast = loadImage("toast.png");
    nil = loadImage("nil.png");
    
    //load sound
    ding = loadSound("ding.wav"); //credit: {theta4} on freesound.org
    
    //load marmite animation
    marmiteBroke = [loadImage("marmite-broke-png/marmite-broke.png"), loadImage("marmite-broke-png/marmite-broke2.png"), loadImage("marmite-broke-png/marmite-broke3.png"), loadImage("marmite-broke-png/marmite-broke4.png"), loadImage("marmite-broke-png/marmite-broke5.png"), loadImage("marmite-broke-png/marmite-broke6.png"), loadImage("marmite-broke-png/marmite-broke7.png"), loadImage("marmite-broke-png/marmite-broke8.png")];
}

//=============================setup=================================

function setup() {
    
    // set canvas background size 
    var canvas = createCanvas(700, 600);
    //move canvas inside <div id="sketch-holder">
    canvas.parent('sketch-holder');
      
    //load background image
    loadImage("set-new.png", function(set) {
        image(set, 0, 0);
        });
    
    //text
    textFont("Rajdhani");
    textSize(15);
    fill(255);
    
    //generate table position
    tableX = random(30, 580);
    
    //generate toast position
    toastX = random(30, 580);
    toastY = random(30, 460);
    
        }//end setup function

//=============================draw=================================

function draw() {
    
    //load background image
    image(set, 0, 0, 700, 600);
    
    if (!gameStart) {
        textSize(15);
        //display amount of fuel left
        text("Marmite fuel: " + fuel, 30, 30);
        //display altitude
        text("Altitude: " + round(altitude), 30, 50);
        //display horizontal velocity
        text("Horizontal velocity: " + (velX * 100).toFixed(2), 500, 30);
        //display vertical velocity
        text("Vertical velocity: " + (velY * 100).toFixed(2), 500, 50);
        //display score
        //text("Score: " + score, 300, 30);
        text(scoreText, 300, 30);
        //select game mode
        text(gameModeText, 280, 270);
        text(easyOrHard, 240, 300);
        //instructions
        //text(startText, 290, 300);
    }
    
    //load marmite image
    image(marmite, marmiteX, marmiteY, 10, 10);
    
    if (gameStart) {
        
        camera.on();
        
        //startText = "";
        gameModeText = "";
        easyOrHard = "";
        
        //change marmite altitude
        altitude = (650 - 85) - marmiteY;
        
        //marmite speed
        marmiteX += velX;
        marmiteY += velY;
        
        //if marmite is falling
        //add gravity
        
        //stop increasing velocity if marmite crashes on table
        if (gameHard && marmiteY+10 >= tableY && tableX <= marmiteX + 10 && marmiteX <= tableX+30) {
            velY += 0;
        }    
        //otherwise stop increasing velocity when marmite crashes on the ground
        else {
            if (marmiteY < 565) {
                velY += g;
                }
        }
        
        //======================toast======================
        
        image(toast, toastX, toastY, 20, 20);
        
        //marmite's distance from toast
        var d = int(sqrt(pow(marmiteX-(toastX+10), 2) + pow(marmiteY-(toastY+10), 2)));
    
        if (d <= 20) {
            ding.play();
            score += 100;
            scoreText = "Score: " + score;
            text(scoreText, 300, 30);
            moveToast();
        }
        
        //===================move marmite===================

        //move left
        if (keyIsPressed && key === 'a') {
            velX -= 0.005;
        }

        //move right
        if (keyIsPressed && key === 'd') {
            velX += 0.005;
        }
        //thrust
        if (keyIsPressed && key === 'w') {
            velY -= a;  
            fuel -= 1;

        //if fuel runs out
        if (fuel <= 0) {
            fuel = 0;
            a = 0;
            text("You're out of fuel!", 300, 240);
            }
        }
        
        //=================display result====================
        
        if (keyIsPressed && key == 'x') {
            displayResult();
        }
        
        //if marmite hits left/right border
        if (marmiteX <= 0 || marmiteX >= 690) {

            //if marmite is moving left
            if (velX < 0) {
                marmiteX = 0;
                velX = -velX;
                } 

            //if marmite is moving right
            else if (velX > 0) {
                marmiteX = 690;
                velX = -velX;
                }
        }

        //if ball hits top border
        if (marmiteY <= 0) {
            marmiteY = 0;
            velY = -velY;
            }
        
        if (gameHard) {
        //landing table
            image(table, tableX, tableY, 30, 30);
            //if marmite lands on table
            if (marmiteY+10 >= tableY && tableX <= marmiteX + 10 && marmiteX <= tableX+30) {
                
                //if marmite crashes
                if (velY >= 0.1 || velX >= 0.1) {
                    marmiteCrash();  
                }
                //if marmite lands smoothly
                else if (velY < 0.1 && velX <= 0.1){
                    add = 1000 * (1-velY);
                    totalScore = score + add;
                    landSuccess();
                    //textSize(50);
                    //text("Success!", 250, 300);
                }
                velX = 0;
                marmiteY = tableY-10;
            }
            //if marmite doesn't land on table
            else {
                //when marmite lands on the ground
                if (marmiteY >= 565) {
                    marmiteCrash();
                    velX = 0;
                    //velY = 0;
                    marmiteY = 565;
                }
                
            }
        } //end if game hard
        
        //if game easy
        else {
            //when marmite lands
            if (marmiteY >= 565) {
                //if crash landing
                if (velY > 0.1 || velX > 0.1) {
                    marmiteCrash();
                }
                //if smooth landing
                else{
                    //if (velY < 1 && velX <= 1){
                    add = 1000 * (1-velY);
                    //textSize(50);
                    landSuccess();
                    //text("Success!", marmiteX-40, marmiteY-80);
                }
                velX = 0;
                //velY = 0;
                marmiteY = 565;
                }
        }
        
        //=================landing========================      
        
        //zoom in when marmite approaches land
        if(marmiteY >= 500) {
            
            if (marmiteX < width/6) {
                camera.position.x = width/6;
            }else if (marmiteX > width-(width/6)) {
                camera.position.x = width-(width/6);
            }else {
                camera.position.x = marmiteX;
            }
            
            if (marmiteY < 500) {
                camera.position.y = marmiteY;
            } else {
                camera.position.y = 500;
            }
            
            camera.zoom = 3;
            
            camera.off();
        }
        else {
            camera.zoom = 1;
            camera.off();
        }

        textSize(15);
        //display amount of fuel left
        text("Marmite fuel: " + fuel, 30, 30);
        //display altitude
        text("Altitude: " + round(altitude), 30, 50);
        //display horizontal velocity
        text("Horizontal velocity: " + (velX * 100).toFixed(2), 500, 30);
        //display vertical velocity
        text("Vertical velocity: " + (velY * 100).toFixed(2), 500, 50);
        //display score
        text(scoreText, 300, 30);
        //select game mode
        text(gameModeText, 280, 270);
        text(easyOrHard, 240, 300);

    }//end gameStart function
         
}//end draw function

//game mode
function keyTyped() {
    if (key === 'e') {
        gameHard = false;
        gameStart = true;
        }
    else if (key === 'h') {
        gameHard = true;
        gameStart = true;
    }
}

function moveToast() {
    toastX = random(30, 580);
    toastY = random(30, 460);
}

function marmiteCrash() {
    
    if (frameNum > 6) {
        frameNum = 7;
    } else {
        frameNum += 1;
    }
    //textSize(30);
    
    //marmite = marmiteBroke[frameNum];
    marmite = nil;
    
    //marmite = nil;
    imageMode(CENTER);
    
    //play animation
    image(marmiteBroke[frameNum], marmiteX+40, marmiteY-40, 170, 100);
    
    //display text
    //if marmite crashes near border of the canvas
    if (marmiteX < width/6) {
        textSize(15);
        text("You crashed!", 70, 500);
        }
    else if (marmiteX > width-(width/6)) {
        textSize(15);
        text("You crashed!", 540, 500);
        }
    else {
        textSize(15);//320,500
        text("You crashed!", marmiteX-40, marmiteY-80);
    }
    
    velX = 0;
    fuel = 0;
    
}//end marmiteCrash()

function landSuccess() {
    //display text
    //if marmite lands near left of the canvas
    if (marmiteX < width/6) {
        textSize(15);
        text("Success!", 80, 500);
        }
    //if marmite lands near right of the canvas
    else if (marmiteX > width-(width/6)) {
        textSize(15);
        text("Success!", 560, 500);
        }
    else {
        textSize(15);//320,500
        text("Success!", marmiteX-20, marmiteY-80);
    }
    add = round(100 * (1-velY));
    totalScore = score + add;
    scoreText = "Score: " + totalScore;
    velX = 0;
    velY = 0;
    marmiteY = tableY - 10;
}
