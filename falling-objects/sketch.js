/* ==============================
          COPYRIGHT (2020)
          Jacob Goodridge
   Leave this notice at the top :)
   
   Music: Demon Lemon - Brodyquest
   ============================== */


function setup() {
  canvasLength = 800
  createCanvas(500, canvasLength);
  x = [];
  y = [];
  w = [];
  h = [];
  canMove = [] // Define arrays

  rectDownSpeed = 1
  score = 0
  rectsForLevel = 0
  gameStarted = false
  gamePlay = true
  numberOfRects = 9
  highscore = 0
  highlevel = 0 // Setting of default values
  level = 1
  resetRects()
  
  buttonWelcome = createButton('Welcome Menu');
  buttonWelcome.position(380, canvasLength + 10);
  buttonWelcome.mousePressed(gameWelcome);
  
  buttonStart = createButton('New Game');
  buttonStart.position(10, canvasLength + 10);
  buttonStart.mousePressed(gameStart); // Draw new game button that calls the function gameStart if pressed
  
  audio = new Audio('https://an.enormous.fail/fGHMxYe.mp3')
}

function gameStart() {
  gameStarted = true
  gamePlay = true
  score = 0
  rectDownSpeed = 1
  numberOfRects = 9
  rectsForLevel = 1
  level = 1
  resetRects() // Set all values to default and reposition rectangles
  musicPlay()
}

function gameWelcome() {
  gameStarted = false
  gamePlay = true
  musicStop() // Stops music if any is playing
}

function draw() {
  background(100, 100, 100);
  
  if (gameStarted == false) { 
  textFont('Roboto');
  textSize(60);
  textStyle(NORMAL);
  textAlign(CENTER);
  fill(255, 222, 246);
  text("Welcome!", 250, 400);
  fill(255, 225, 153);
  textSize(15);
  textAlign(LEFT);
  text("The aim of this game is to click the falling shape before they reach the ground. When you click a shape, they will disappear. If a shape touches the ground, the game will end. After a few shapes are clicked, the level will advance and the shapes will fall faster. Your records will be saved for this session.", 25, 450, 450, 450)
  text('Ensure that your broswer is zoomed out far enough to see the buttons below this canvas, then press "New Game" to begin.', 25, 580, 450, 450)
  textSize(12);
  fill(255, 206, 145);
  textStyle(BOLD);
  text('Original game design by Jacob Goodridge.', 25, 20);
    
  }
  
  else {
      if (numberOfRects == 0 && gamePlay == false) {
      gameOver() // When game is over, keep game over.
    }
      else {
      displayLevel()
      displayScore()  // Call functions for gameplay
      displaySpeed()
      drawRect()
      rectMovement()
      levelChecker()
      musicPlay() // Ensure that music loops
      }
  }
}

function displayLevel() {
  textSize(24);
  textAlign(CENTER); // Text is 24pt and centred
  fill(255, 225, 153); // Fills text with this RGB colour
  text('Level ' + level, 250, 30); // Display Level and level number at x = 250, y = 30
}

function displayScore() {
  textSize(12);
  textAlign(CENTER);
  fill(255, 222, 246);
  text('Score: ' + score, 250, 48); // Display Score and score at (250,48)
}

function displaySpeed() {
  textSize(12);
  textAlign(CENTER);
  fill(176, 206, 255);
  text(rectDownSpeed +'x', 250, 65);
}

function drawRect() {
  for (i = 1; i <= numberOfRects; i++) {
    fill(176, 206, 255);
    rect(x[i], y[i], w[i], h[i]) // Draw rectangles of specified width, height, x and y values according to array
  }
}

function rectMovement() {
  for (i = 1; i <= numberOfRects; i++) {
    if (y[i] < (canvasLength - h[i])) { // If the shape isn't at bottom of canvas
        y[i] += rectDownSpeed // Move shape down
    }
    else {
      gamePlay = false
      gameOver()
    }
  }
}

function mouseClicked() {
  for (i = 1; i <= numberOfRects; i++) {
    xMin = x[i]
    xMax = x[i] + w[i]
    yMin = y[i]
    yMax = y[i] + h[i] // Define the areas where the shapes exist
    
    if (mouseX >= xMin && mouseX <= xMax && mouseY >= yMin && mouseY <= yMax) { // If shape is clicked
      canMove[i] = 1
      shapeOff() // Teleport to top of screen
      score += 1
      rectsForLevel += 1
    }
  }
}

function shapeOff() { // Function must be called within a for loop which states (i = 1; i <= numberOfRects; i++)
  y[i] = 0 // Teleport shape off screen
}

function levelChecker() {
  if (numberOfRects <= rectsForLevel) {
    rectsForLevel = 0 // Reset rect for level counter
    rectDownSpeed += 0.25 // Increase speed by 0.25
    level +=1 // Increase level by 1
    resetRects() // Reset rectangles
  }
}

function resetRects() {
  for (i = 1; i <= numberOfRects; i++) {
    x[i] = random(0, 450); // Random xpos for each rectangle
    y[i] = random(0, canvasLength - 500); // Ensure that no shapes are spawned at the bottom of the screen.
    w[i] = random(40, 50); // Randomise rectangle shape
    h[i] = random(50, 90);
    canMove[i] = 0 // Set all canMove values to 0 (false)
  }
}

function gameOver() {
  numberOfRects = 0
  
  if (score > highscore) {
    highscore = score // Testing for and assigning high score
  }
  
  if (level > highlevel) {
    highlevel = level // Testing for and assigning high score
  }
  
  textSize(60);
  textAlign(CENTER);
  fill(255, 222, 246);
  text('Final Score: ' + score, 250, 400); // Display final score
  
  textSize(50);
  textAlign(CENTER);
  fill(255, 225, 153);
  text('Level Reached: ' + level, 250, 480); // Display final level
  
  // Displaying of High Score:
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);
  text('High Score: ' + highscore + " (Level " + highlevel + ")", 250, 600);
  
  
  // Displaying GAME OVER
  for (i = 1; i <= 2; i++) { // Double the text
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(40);
    text('GAME OVER', random(0,500), random(0,350)) // Top half
    text('GAME OVER', random(0,500), random(660, canvasLength)) // Bottom half
  }
  musicStop() // Stop music
}

function musicPlay() {
  audio.play();
}

function musicStop() {
  audio.pause();
}
