/* LEVEL #2 PONG GAME * IVELINA KOSMOVA * */

var BALL_SPEED =8;  // global veriable for the ball speed
const BALL_RADIUS=20;  // setting a constant radius of the ball
var paddle1; //setting global veriables for both players
var paddle2;
var paddle1V;   // global variables for the velocity of both players
var paddle2V;

var paddle1Score;  // global variables for the scores of both players
var paddle2Score;
var soundWall;     // sound when hitting the wall
var soundPaddle;   // sound when interacting with the paddle
//var soundMiss;
var song;          // background sound

var ball, ballV;  // global variable for the ball and her velocity

function preload(){
    soundWall = loadSound("sounds/pong_hit_wall.ogg");
    soundPaddle = loadSound("sounds/pong_hit_paddle.ogg");
    //soundMiss = loadSound("sounds/pong_miss_ball.ogg");
	song = loadSound("sounds/song1.mp3")
    }
    

function setup() {
  var canvas=createCanvas(600,400);
  canvas.parent('game');
  paddle1=paddle2= height/2-50;   // both players are in the middle of the screen when starting the game level
  paddle1V= paddle2V=0;          // both players velocity is 0 when starting the game level
  paddle1Score= paddle2Score=0;  //both players score is 0 when starting the game level
  
    song.play();   // playing the background sound once !needs to add loop the sound!
	//loop();         // repeating the background song
	
	ball= createVector(width/2, height/2);    // starting position of the ball in the middle of the screen
	                                         // the ball is a vector
	ballV= createVector(random(-1,1), random(-1,1)); // giving the ball a random trajectory
    //ballV.mult(random(1,1.1) );
    ballV.setMag(BALL_SPEED);    // set the speed to start from the amount set in the var (level 1 )
    
    textAlign(CENTER);  // instructions for the text 
    textSize(20);      // size of the text
    fill(255);         
  
}

 function draw() {
     
         background(24,186,33);  // background colour level two is green (tennis court )
         line(width/2 ,1,width/2,3000); // white line in the middle of the screen separating both fields 
	
	line(1, 30, 600 , 30); // top line of the court
	line(1, 370, 600 , 370); //down line of the court 
	line(30, 1, 30 ,400);  // left small line 
	line(570, 1, 570 ,400); // right small line
	
	line(200, 30, 200 ,370);  //  left rectangle 
	line(400, 30, 400 ,370);  // right rectangle
	line(1, 200, 200 ,200); //  left middle line 
	line(400, 200, 600 ,200); //  right middle line 
    stroke(255);
   
	
	/* draw paddles*/
	
  rect(20, paddle1,10,100); /*  draw the left paddle */
	
  rect(width-30, paddle2,10,100);  /*  draw the right paddle */
	/* draw ball */
	ellipse(ball.x, ball.y,BALL_RADIUS); // draw the ball 
	
    
    /*  draw scoreboard */
	
	text (paddle1Score + " | " + paddle2Score, width /2 ,50);  // the scoreboard is presenting the scores of both players at the top of the screen and in the middle of the width 
	/* handle paddles*/
	
	handlePaddles();
	handleBall();
	}
	
	function handleBall(){
			
	ball.x+= ballV.x;
	ball.y+= ballV.y;
        
        
		/* top & bottom collisions */
		if (ball.y> height || ball.y< 0)  // if statement prevend the ball to go to the top or bottom space of the canvas ?!***
			ballV.y*= -1;  // reverse y-velocity
  
        
		/* paddle collisions */
		if (ball.x <=30 ){  // within range on the left side
            
            
            // out of bounds
            
            if( ball.x <=10){   // if the ball hit the wall increase the score of player 2
                soundWall.play(); // play the sound when the ball hit the wall
                paddle2Score++;
               // checklevel()   //check if the score=10  go to next level
            
                
                reset();  //reset the game to the starting point (the ball is in the middle of the screen)
                return;
                
            }
                /*    right paddle     */
			 if (ball.y> paddle1 && ball.y <paddle1 +100 ) {  // if the ball touches the paddle will go in the other direction
                 if (ballV.x<0){  // prevent the ball getting stuck inside paddle
				 soundPaddle.play();   // play the sound if the paddle touch the ball
				 ballV.x*=-1;
			ballV.mult(random(1,1.1)); //multiplying the velocity of the ball to increasingly gets harder 
             }
				}
        
        } else if (ball.x >= width-30){  
                    
                    //out of bounds
                     if (ball.x >= width-10){  //if the ball hit the wall increase the score of player 1
                         soundWall.play(); // play the sound when the ball hit the wall
                         paddle1Score ++;
                         //checklevel()   //check if the score=10  go to next level
                         reset();     // reset the game to the starting point (the ball is in the middle of the screen)
                         return;
                         
               /*    left paddle    */
                     }
					 if (ball.y> paddle2 && ball.y <paddle2 +100 ) { //if the ball touches the paddle will go in the other direction
                         if (ballV.x> 0){ // prevent the ball from getting stuck inside paddle
                             soundPaddle.play(); // play the sound if the paddle touchs the ball
                       ballV.x*=-1;  
                         ballV.mult(random(1,1.1)); // multiplying the velocity of the ball to increasingly gets harder to play
                     }
	           }
           }

         }
function reset(){  // function reset( to make sure that the ball will start from the beginning every time we call the function)
    
    ballV.setMag(BALL_SPEED)    // start from the default speed
    ball= createVector( width/2, height/2 );  // the location of the ball is from the center when starts the new turn
    
}


function handlePaddles() {
	/* player one controls*/
    
	 if (keyIsDown(87)){ // player one move up key is W key on keyboard (87) [see references]
		 /* move up */
		 paddle1V-=5;
		 
	 }
	
	else if (keyIsDown(83)){ // player one move down key is S key on keyboard (83) [see references]
		/*move down*/
		paddle1V+=5; 
	}
	
	/* player two controls*/
	 if (keyIsDown(UP_ARROW)){  // player two move UP key is UP_ARROW key on keyboard
		 /*move up */
		 paddle2V-=5; 
		 
	 }
	
	else if (keyIsDown(DOWN_ARROW)){  // player two move down key is DOWN_ARROW key on keyboard
		/*move down*/
		paddle2V+=5;
	}
    
     /*  change position */ 
	
	paddle1+=paddle1V;
	paddle2+= paddle2V;
	
	/* friction*/
	paddle1V*=0.4; // giving the illusion of friction
	paddle2V*=0.4;
	
	
	/* constrain paddles*/
	paddle1= constrain( paddle1,0, height-100);
	paddle2= constrain( paddle2,0, height-100);
}


var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);


 /*    LEVEL 2 
   appearance : tennis court */
 
 
 
 
 
 