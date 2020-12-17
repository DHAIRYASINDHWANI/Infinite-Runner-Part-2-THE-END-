var PLAY = 1;
var END = 0;
var gameState = PLAY;
var girl,girl_running,girl_collided,girlImage;
var ground, invisibleGround;
var obstaclesGroup, obstacle1;
var score=0;
var gameOver, restartvar,jumpSound,dieSound,checkpointSound;
var jumpSound,dieSound,checkpointSound;


function preload(){
  girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  girl_collided=loadImage("Dead (30).png");
  girlImage=loadImage("Idle (1).png");
  
  obstacle1=loadImage("obstacle1.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");

  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");

  backgroundImage = loadImage("bg.jpg");

}


function setup() {
  createCanvas(displayWidth,displayHeight-120);
  
  girl=createSprite(150,120,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.3;
  
  ground = createSprite(400,180,displayWidth+500000,20);
  ground.shapeColor = "#A7ADAB";
  ground.x = ground.width /2;    
  ground.velocityX = -(6 + 3*score/100);

  girl.depth = ground.depth;
  girl.depth = girl.depth + 1;
  gameOver = createSprite(displayWidth/2,displayHeight/12);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(displayWidth/2,displayHeight/6);
  restart.addImage(restartImage);
  
  gameOver.scale = 1;
  restart.scale = 1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,displayWidth,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(backgroundImage);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

    camera.position.x=displayWidth/2;
    camera.position.y=girl.y;
  
    if(keyDown("space")) {
      jumpSound.play();
      girl.velocityY = -14;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround);
   
    spawnObstacles();
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(girl)){
      dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    girl.changeAnimation("girl_collided",girl_collided);
    obstaclesGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
drawSprites();
if(score===1000){
  gameState=END
textSize(40);
textFont("monospace");
textStyle(BOLD);
fill("blue");
text("GAME ENDED!",displayWidth/2 ,displayHeight/1900);
textSize(50);
text("YAY!YOU WON!!",750,100)

gameOver.destroy();
restart.destroy();
score.destroy();
}

textSize(25);
textFont("monospace");
textStyle(BOLD);
fill("blue");
text("Score: "+ score, displayWidth/2 ,displayHeight/1900);
text("TIP : To WIN, Your Score Should Be '1000' ",50,-230)
}
function spawnObstacles() {
  if (frameCount % 200 === 0){
    var obstacle = createSprite(1400,150);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage(obstacle1);
    obstacle.scale=0.15;
    obstaclesGroup.add(obstacle);
   }
  }

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false; 
  obstaclesGroup.destroyEach();
  girl.changeAnimation("girl_running",girl_running);
  score = 0;
}

