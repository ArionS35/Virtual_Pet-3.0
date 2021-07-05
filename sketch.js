//Create variables here
var food;
var gameState= "hungry";
var bedroomImg, gardenImg, washroomImg, livingroomImg, food2;



function preload()
{
	//load images here
  dogHappy= loadImage("images/dogImg1.png")
  dogSad= loadImage("images/dogImg.png")
  food1= loadImage("images/food1.png")
  food2= loadImage("images/Food Stock.png")
  bedroomImg= loadImage("images/Bed Room.png")
  gardenImg= loadImage("images/Garden.png")
  washroomImg= loadImage("images/Wash Room.png")
  livingroomImg= loadImage("images/Living Room.png")
}

function setup() {
	createCanvas(800, 700);
  
  database= firebase.database()

  database.ref('food').on("value", readPosition)

  ground= createSprite(400,600,800,400)
  ground.shapeColor='green';

  foodstock= createSprite(100,400,50,50)
  foodstock.addImage(food2)
  foodstock.scale= 0.08

  dog= createSprite(700,400,50,50)
  dog.addImage(dogSad)
  dog.scale= 0.2

  food1= new Food()
  food1.getfeedTime()

  database.ref('gameState').on("value",(data)=>{
    gameState=data.val()
  })

}


function draw() {  
 background("rgb(50,150,200)")
  drawSprites();
  //add styles here
  fill ("white")
  textSize(20)
  text("fedtime : " +food1.feedtime,200,50)
  food1.buttons()
  food1.foodImg()

  currentTime= hour();

  if(currentTime == (food1.feedtime +1)){
    food1.updateState ("playing")
    food1.garden()
  }
  else if(currentTime == (food1.feedtime +2)){
    food1.updateState ("sleeping")
    food1.bedRoom()
  }
  else if(currentTime == (food1.feedtime +3)){
    food1.updateState ("bathing")
    food1.washRoom()
  }
  else if(currentTime == (food1.feedtime +4)){
    food1.updateState ("living")
    food1.livingRoom()
  }
  else{
    food1.updateState ("hungry")
  }

  if(gameState!== "hungry"){
   food1.button1.hide()
   food1.button2.hide()
   dog.remove()
  }
  else{
    food1.button1.show()
    food1.button2.show()
    dog.addImage(dogSad)
    dog.scale=0.2
  }

  if(food===0){
    dog.addImage(dogHappy)
    dog.scale= 0.2
    foods.scale= 0.001
  }

}

function readPosition(data){
  food = data.val()
}

function writeStock(data){
  database.ref('/').set({
    food:data,
    feedtime:hour()
  })
}