function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-container');
    canvas.style('display', 'block');
}

function draw() {
    background(220);
    fill(0, 150, 255);
    ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(20);
    textFont("Courier");
    frameRate(6); 
  }
  
  function draw() {
    background(0);
    fill(0, 255, 0)
    
    for (let y = 4; y < height; y += 25) {
      for (let x = 10; x < width; x += random(10, 20)) {
        let chars = ["@", "#", "%", "&", "*", "+", "-", "/", "\\\\", "----->", "||9||", "6", "_", "=", "CODE ERROR 404","         ", "[]"];
        let char = random(chars);
        text(char, x, y);
      }
    }
    
    if (random(1) > 0.9) {
      glitchEffect();
    }
  }
  
  function glitchEffect() {
    stroke(0, 255, 0);
    for (let i = 0; i < 50; i++) {
      let x1 = random(width);
      let x2 = random(width);
      let y = random(height);
      line(x1, y, x2, y);
    }
  }
  