let stationery = [];
let stationeryTypes = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('Fall');
  console.log('Canvas created and attached to #Fall');

  

  stationeryTypes = [
    { type: 'pen', colors: ['#F7C636', '#60D3E1', '#CDDC39', 'rgb(198,123,225)', 'rgb(237,143,171)'], minLength: 30, maxLength: 80, capColor: 'rgb(255,160,160)' },
    { type: 'eraser', color: 'pink', width: 30, height: 15, shadowColor: 'gray' },
    { type: 'paper', color: 'white', width: 60, height: 80, shadowColor: 'rgba(0, 0, 0, 0.2)' }
  ];
  
  for (let i = 0; i < 10; i++) {
    stationery.push(new FallingStationery());
  }
}

function draw() {
  background('#D9EDF3');
  
  for (let s of stationery) {
    s.update();
    s.display();
  }
  
  if (frameCount % 30 === 0) {
    stationery.push(new FallingStationery());
  }
}

class FallingStationery {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10);
    this.speed = random(2, 5);
    this.type = random(stationeryTypes);
    this.angle = random(-PI / 6, PI / 6); // Small rotation effect
    
    if (this.type.type === 'pen') {
      // Random pen color and length
      this.color = random(this.type.colors);
      this.length = random(this.type.minLength, this.type.maxLength);
      this.width = map(this.length, this.type.minLength, this.type.maxLength, 5, 10); // Width proportional to length
    } else {
      // Use fixed size for eraser and paper
      this.color = this.type.color;
      this.length = this.type.height;
      this.width = this.type.width;
    }
  }
  
  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, -10);
      this.x = random(width);
      this.speed = random(2, 5);
      this.type = random(stationeryTypes);
      this.angle = random(-PI / 6, PI / 6);
      // Reinitialize pen properties
      if (this.type.type === 'pen') {
        this.color = random(this.type.colors);
        this.length = random(this.type.minLength, this.type.maxLength);
        this.width = map(this.length, this.type.minLength, this.type.maxLength, 5, 10); // Adjust width when length changes
      }
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    
    if (this.type.type === 'pen') {
      // Pen body
      fill(this.color);
      rect(-this.width / 2, -this.length / 2, this.width, this.length, 5);
      // Pen cap
      fill(this.type.capColor);
      ellipse(0, -this.length / 2 - 5, this.width, this.width);
      
    } else if (this.type.type === 'eraser') {
      // Eraser body
      fill(this.type.color);
      rect(-this.width / 2, -this.length / 2, this.width, this.length);
      // Adding a shadow for the eraser
      drawingContext.shadowColor = color(this.type.shadowColor);
      drawingContext.shadowBlur = 10;
      rect(-this.width / 2, this.length / 2, this.width, 5); // Representing the rubber edge of the eraser

    } else if (this.type.type === 'paper') {
      // Paper
      fill(this.type.color);
      drawingContext.shadowColor = color(this.type.shadowColor);
      drawingContext.shadowBlur = 15;
      rect(-this.width / 2, -this.length / 2, this.width, this.length);
    }
    
    pop();
  }
}
