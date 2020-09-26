var sword,sword_img

var PLAY=1;
var END=0;
var gameState=1;

var r

var t

var score=0

var fruitGroup, fruit,fruit1, fruit2, fruit3, fruit4

var enemyGroup, enemy, enemy1 

var go, go_img

var swordSound

var goSound

function preload(){
  sword_img=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemy1=loadAnimation("alien1.png","alien2.png");
  go_img=loadImage("gameover.png");
  swordSound=loadSound("knifeSwooshSound.mp3");
  goSound=loadSound("gameover.mp3");
}


function setup(){
  createCanvas(400,400);
  sword=createSprite(40,200,20,20);
  sword.addImage("s",sword_img);
  sword.scale=0.7;
  
  go=createSprite(200,200,20,20);
  go.addImage("g",go_img);
  go.visible=false
  fruitGroup= new Group;
  enemyGroup=new Group;

}

function draw(){
  background("lightblue");
  fill("white"); 
  text("Score: "+score,315,25);
  if(gameState===1){
    sword.y=mouseY
    sword.x=mouseX
    enemys();
    fruits();
    if(sword.isTouching(fruitGroup)){
      score=score+1;
      swordSound.play();
      fruitGroup.destroyEach();
    }
    
    
    go.visible=false;
  }
  
  if(enemyGroup.isTouching(sword)){
    goSound.play();
    gameState=END
    sword.destroy();
  }
  
  if(gameState===END){
    fruit.velocityX=0;
    fruit.velocityY=0;
    enemy.velocityX=0;
    enemy.velocityY=0;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    go.visible=true
    sword.x=40;
    sword.y=200;
  }
  

  drawSprites();
}

function fruits(){
 if(World.frameCount%80===0){
   fruit=createSprite(400,random(50,340),20,20);
   fruit.scale=0.2;
   fruit.velocityX=-7-(score/10);
   fruit.lifetime=100;
   fruitGroup.add(fruit);
   //fruit.debug=true
  r=Math.round(random (1,4));
   console.log(r);
   if(r===1){
     fruit.addImage("f1",fruit1)
   } else if(r===2){
     fruit.addImage("f2",fruit2)
   } else if(r===3){
     fruit.addImage("f3",fruit3)
   } else if(r===4){
     fruit.addImage("f4",fruit4)
   }
 }
}

function enemys(){
  if(World.frameCount%200===0){
    enemy=createSprite(400,200,20,20);
    enemy.scale=0.4;
    enemy.addAnimation("e1",enemy1);
    enemy.scale=0.7;
    enemy.lifetime=50;
    enemy.velocityX=-8-(score/10);
    enemyGroup.add(enemy);
    enemy.y=Math.round(random(100,300));
  }
  
}



