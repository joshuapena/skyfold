int xpos;                           // tracks dot position
int xm = 5;                         // sets dot movement speed
int x = -100;                       // sets dot starting postion

int r = 505;                        // right line starting position
int l = 295;                        // left line starting position

int background = 0;                 // default color of background
int ball = 255;                     // default color of ball

int page = 0;                       // sets default page to 0
int time = millis();                // the thing that I don't understand but somehow works
int time2 = 0;                      // time for the end screen keypress cooldown
 
PFont typeface1, typeface2;         // defines font
PImage img;                         // defines image

void setup() {
  size(800,200);
  frameRate(60);
  typeface1 = loadFont("CenturyGothic-Bold-48.vlw");  // loading font
  typeface2 = loadFont("CenturyGothic-20.vlw");
}

void draw() {
  
  
// STARTING SCREEN
  
  if (page == 0) {
    background(0);
    fill(255, 255, 0);
    textFont(typeface1);                // Title text
    text("A Dot Game.", 240, 70);
    
    fill(255);
    textFont(typeface2);
    text("Press SPACE when the dot is between the lines.", 164, 100);
    text("WARNING: This game may induce seizures for those with photosensitive epilepsy.", 20, 190);
    fill(255, 0, 0);
    text("WARNING:", 20, 190);
    fill(255, 255, 0);
    text("Hit any key to start.", 290, 140);
    
    if (millis() > time + 800) {        // a loop system that I don't quite understand. however i figured out a simpler way to do this but this was already working so if it ain't broke, don't fix it
      fill(0);
      rect(200,110,300,40);             // draws a black rectangle so it looks like text is flashing
      if (millis() > time + 1100) {
        time = millis();
      }
    }

    
    if (keyPressed) {      // starts game
      page = 1;
    }
  }
  
  
  
  
  
// MAIN PAGE/PROGRAM/FUNCTION/THIS IS WHERE THE GAME STARTS
  
  if (page == 1) {
    
    
  background(background);
  strokeWeight(5);
  stroke(255,0,0);
  fill(0);
  
  
  
  x = x + xm;               // makes the dot move
  xpos = x;                 // sets a final position so we can track it
  
  
  noStroke();
  fill(ball);
  ellipse(xpos, 100, 10, 10);  // The ball/dot/thing
  
  rect(l, 0, 2, 200);       // left line
  rect(r, 0, 2, 200);       // right line
  
  
  
  
  
          


  if (xpos < l) {           // detects if dot is left of left line
    if (xpos > 0) {         // detects if dot is right of left edge
      if (keyPressed) {     // if key is pressed
        xm = 5;             // resets dot movement
        r = 505;            // resets right line
        l = 295;            // resets left line
        x = -200;           // resets dot position
      }
    }
  }
  
  if (xpos > r) {           // detects if dot is right of right line
    if (xpos < 800) {       // detects if dot is left of right edge
      if (keyPressed) {     // if key is pressed
        xm = 5;             // resets dot movement
        r = 505;            // resets right line
        l = 295;            // resets left line
        x = -200;           // resets dot position
      }
    }
  }  



    
  
  
  
  
  
  if (xpos < r) {           // detects if dot is left of right line
    if (xpos > l) {         // detects if dot is right of left line
     if (keyPressed) {      // if key is pressed
       xm = xm + 2;         // makes dot move faster
       r = r - 10;          // moves right line in
       l = l + 10;          // moves left line in
       x = -200;            // resets dot position
      }
    }
  }
  
  
  if (xpos > 1000) {        // resets dot if too far
    x = -100;
  }
  
  if (r < 466) {            // randomizes color of ball and bars when you reach Level 5
    ball = pick2();
  } else {
    ball = 255;
  }
  
  if (r < 436) {            // randomizes color of background when you reach Level 8
    background = pick1();
  } else {
    background = 0;
  }
  
  
    
                           // Displays level number
  
  if (r == 505) {
    textFont(typeface2);
    fill(255);
    text("Level 1/10", 10, 20);
  }
  
  if (r == 495) {
    textFont(typeface2);
    fill(255);
    text("Level 2/10", 10, 20);
  }
  
  if (r == 485) {
    textFont(typeface2);
    fill(255);
    text("Level 3/10", 10, 20);
  }
  
  if (r == 475) {
    textFont(typeface2);
    fill(255);
    text("Level 4/10", 10, 20);
  }
  
  if (r == 465) {
    textFont(typeface2);
    fill(255);
    text("Level 5/10", 10, 20);
  }
  
  if (r == 455) {
    textFont(typeface2);
    fill(255);
    text("Level 6/10", 10, 20);
  }
  
  if (r == 445) {
    textFont(typeface2);
    fill(255);
    text("Level 7/10", 10, 20);
  }
  
  if (r == 435) {
    textFont(typeface2);
    fill(255);
    text("Level 8/10", 10, 20);
  }
  
  if (r == 425) {
    textFont(typeface2);
    fill(255);
    text("Level 9/10", 10, 20);
  }
  
  if (r == 415) {
    textFont(typeface2);
    fill(255);
    text("Level 10/10", 10, 20);
  }
  
  if (r == 405) {                  // when you reach the last level, moves on to end screen
    page = 2;
  }
  }
  
                                   
                                   
                                   // End Screen
  
  if (page == 2) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("yay. you won.", 220, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 1000) {            // Sets a cooldown time between each key press. Otherwise it goes straight to the last text.
      if (keyPressed) {
        page = 3;
        time2 = 0;
      }
    }
  }
  
  if (page == 3) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("congrats.", 300, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 4;
        time2 = 0;
      }
    }
  }
  
  if (page == 4) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("you did it.", 300, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 5;
        time2 = 0;
      }
    }
  }
  
  if (page == 5) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 6;
        time2 = 0;
      }
    }
  }
  
  if (page == 6) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("you can go now.", 220, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 7;
        time2 = 0;
      }
    }
  }
  
  if (page == 7) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("....", 370, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 8;
        time2 = 0;
      }
    }
  }
  
  if (page == 8) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("just leave already.", 200, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 9;
        time2 = 0;
      }
    }
  }
  
  if (page == 9) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 10;
        time2 = 0;
      }
    }
  }
  
  if (page == 10) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("what?", 330, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 11;
        time2 = 0;
      }
    }
  }
  
  if (page == 11) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("you want a cookie or something?", 15, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 12;
        time2 = 0;
      }
    }
  }
  
  if (page == 12) {
    background(0);
    textFont(typeface1);
    fill(255,255,0);
    text("fine. here. have a cookie.", 120, 100);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 13;
        time2 = 0;
      }
    }
  }
  
  if (page == 13) {
    background(0);
    img = loadImage("cookie.png");                     // COOOKIEEE
    image(img, 320, 13);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 14;
        time2 = 0;
      }
    }
  }
  
  if (page == 14) {                 // LAST SCREEN BLANK
    background(0);
    
    time2 = time2 + 20;
    
    if (time2 > 800) {
      if (keyPressed) {
        page = 15;
        time2 = 0;
      }
    }
  }
    
}

  




// Picks random colors

  color pick1() {                                        // for ball and bars
  return color(random(255), random(255), random(255));
}

  color pick2() {                                        // for background
  return color(random(255), random(255), random(255));
}


