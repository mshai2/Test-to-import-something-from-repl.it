/* Axolotl playing with ball
Maxim Shainski  
May 26 2021
This program has an axolotl that is controlled by clicking and dragging who can interact with a ball inside of set boundaries*/
//These variables are to set up the axolotl sprite and image
var axolotlSprite;
var axolotlImage;
//This variable is to control the size of the axolotl sprite
var axolotlSize = 100;
//This variable is for knowing when the mouse is over the axolotl
var overAxolotl = false
var xOffset = 0.0;
var yOffset = 0.0;
var treeSprite;
var treeImage;
//https://www.pinclipart.com/maxpin/iToxJwb/ Link for Axolotl image
function preload() {
  //this image is being preloaded using the preload() 
  //function. This will allow it to load fully before the 
  //program begins.
  //image source: https://gfycat.com/discover/wave-penguin-gifs
  axolotlImage = loadImage('Axolotl.png');
  treeImage = loadImage('tree.png');
}

function setup() {
  createCanvas(800, 400);
  //This line is here to give the image of the axolotl the lenght and width that we want
  axolotlImage.resize(axolotlSize, axolotlSize);
  treeImage.resize(100, 100);
  treeSprite = createSprite(width / 2, height / 2);
  treeSprite.addImage(treeImage); treeSprite.setCollider("circle", 0, 0, 20)
  //this line is necessary to create a  sprite. Since I'm adding an image, I only need to specify the x-position and y-position
  //I also am assigning this sprite to a variable name, so that I can change its properties
  axolotlSprite = createSprite(400, 200);
  //now we will add an image to the axolotlprite. We loaded the image into axolotlImage in the setup file, and now we're adding it to our sprite
  axolotlSprite.addImage(axolotlImage);
  axolotlSprite.setCollider("circle", mouseX, mouseY, 20)
  boxSprite = createSprite(50, 50, 10, 10);
  boxSprite.setSpeed(random(5, 6), random(5, 20));
  //axolotlSprite.setCollider = ("circle", mouseX, 400);

}

function draw() {
  background(0, 128, 128);
  // let xC = constrain(mouseX, leftWall, rightWall);
  //let yC = constrain(mouseY , roof, floor);
  if (boxSprite.position.x < 0 || boxSprite.position.x > (width)) {
    boxSprite.velocity.x = -1 * boxSprite.velocity.x;
  }

  if (boxSprite.position.y < 0 || boxSprite.position.y > height) {
    boxSprite.velocity.y = -1 * (boxSprite.velocity.y);
  }


  if (
    mouseX > axolotlSprite.position.x - axolotlSize &&
    mouseX < axolotlSprite.position.x + axolotlSize &&
    mouseY > axolotlSprite.position.y - axolotlSize &&
    mouseY < axolotlSprite.position.y + axolotlSize
  ) {
    overAxolotl = true
  } else {
    overAxolotl = false
  }

  if (0 > axolotlSprite.position.x) {
    axolotlSprite.position.x = 0
  }

  if (axolotlSprite.position.x > width) {
    axolotlSprite.position.x = width
  }

  if (axolotlSprite.position.y > height) {
    axolotlSprite.position.y = height
  }

  if (0 > axolotlSprite.position.y) {
    axolotlSprite.position.y = 0
  }

  if (0 > boxSprite.position.x) {
    boxSprite.position.x = 0
  }

  if (boxSprite.position.x > width) {
    boxSprite.position.x = width
  }

  if (boxSprite.position.y > height) {
    boxSprite.position.y = height
  }

  if (0 > boxSprite.position.y) {
    boxSprite.position.y = 0
  }


  boxSprite.bounce(axolotlSprite);
  axolotlSprite.immovable = true;
  treeSprite.immovable = true;

  boxSprite.bounce(treeSprite);

  //drawSprites() is necessary in order to see the sprites on the screen 
  drawSprites();
  axolotlSprite.debug = mouseIsPressed;
  treeSprite.debug = mouseIsPressed;
}
function mousePressed() {
  if (overAxolotl) {
    xOffset = mouseX - axolotlSprite.position.x;
    yOffset = mouseY - axolotlSprite.position.y;
  }
}
function mouseDragged() {
  if (overAxolotl) {
    axolotlSprite.position.x = mouseX - xOffset;
    axolotlSprite.position.y = mouseY - yOffset;
  }
}