function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    clear();
  
    // Background layer - moves slowest
    let bgOffset = window.scrollY * 0.3;
    fill(100, 150, 255);
    rect(0, bgOffset, width, height);
  
    // Foreground layer - moves faster
    let fgOffset = window.scrollY * 0.7;
    fill(255, 100, 150);
    ellipse(width / 2, fgOffset + 300, 200, 200);
  }
  