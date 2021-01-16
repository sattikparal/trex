var trex,trexR,ground,groundi,ground2,cloud,cloudi;
var score=0, hi=0, cactus,c1,c2,c3,c4,c5,c6;
var tr,go,goi,re,rei,die,jump,cp;
var cactusG,cloudG,play=0,end=1,gamestate=play;
      
function preload(){
  trexR=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundi=loadImage("ground2.png")
  cloudi=loadImage("cloud.png")
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
  c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
  c5=loadImage("obstacle5.png")
  c6=loadImage("obstacle6.png")
  tr=loadAnimation("trex_collided.png");
  goi=loadImage("gameOver.png");
  rei=loadImage("restart.png");
  
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  cp=loadSound("checkPoint.mp3");



}


function setup() {
  
  createCanvas(600,200);
  
  trex= createSprite(50,150,10,10);
  trex.addAnimation("abc",trexR);
  trex.scale = 0.5;
  trex.addAnimation("cd",tr);
  
  ground= createSprite(300,160,600,10);
  ground.addImage(groundi);
  
  
  ground2= createSprite(50,165,100,10);
  ground2.visible=false
  
  cloudG=new Group();
  cactusG=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,80,trex.height);
  
  go=createSprite(300,100,10,10);
  go.addImage(goi);
  go.scale=0.5;
  
  re=createSprite(300,100,10,10);
  re.addImage(rei);
  re.scale=0.3;
}

function draw(){
  background(0);
  
   text("score="+score,500,20);
  text("highscore="+hi,350,20);
  
  if(score>hi){
    hi=score;
  }
  
  if(gamestate===play){
    
    re.visible=false;
    go.visible=false;
    
    trex.changeAnimation("abc",trexR)
    
     ground.velocityX= -(3+(score/200));
    
  score=score+Math.round(getFrameRate()/61);
    
    if(score>0 && score%100===0){
      cp.play();
    }
    
   if(ground.x<0){
    ground.x=ground.width/2
  }
    
   
 if(keyDown("space") && trex.y>140){
   trex.velocityY= -13
   jump.play();
 } 
    
    
  trex.velocityY= trex.velocityY+0.7
  trex.collide(ground2)
  
  spawnclouds();
  spawncactus();
    
if (trex.isTouching(cactusG)){
  gamestate=end;
  die.play();
}   
  }
  
  if(gamestate===end){
    trex.velocityY=0;
    cloudG.setVelocityXEach(0);
    cactusG.setVelocityXEach(0);
    ground.velocityX=0;
    cloudG.setLifetimeEach(-1);
    cactusG.setLifetimeEach(-1);
    trex.changeAnimation("cd",tr);
    re.visible=true;
    go.visible=true;
    
    if(mousePressedOver(re)){
      reset();
    }
  }
  
  drawSprites();
  
}

function reset(){
  gamestate=play;
  score=0;
  cloudG.destroyEach();
  cactusG.destroyEach();
}

function spawnclouds(){
if(frameCount%80 === 0)  {
  cloud=createSprite(600,random(5,50),10,10);
  cloud.addImage(cloudi);
  cloud.velocityX= -3;
  cloud.scale= 0.6; 
  cloud.lifetime= 200;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudG.add(cloud);
}
}
  function spawncactus(){
   if(frameCount%80 === 0) {
     cactus=createSprite(600,145,10,10);
  cactus.velocityX= -(4+(score/200));
     cactus.scale= 0.6
     cactus.lifetime= 200;
     cactusG.add(cactus);
   var a =Math.round(random(1,6));
     switch(a){
       case 1: cactus.addImage(c1);
         break;
           case 2: cactus.addImage(c2);
         break;
           case 3: cactus.addImage(c3);
         break;
           case 4: cactus.addImage(c4);
         break;
           case 5: cactus.addImage(c5);
         break;
           case 6: cactus.addImage(c6);
         break;
         default: break;
     }
 
     
   }
     
  }






