let stationeryPool = [];
let activeStationery = [];
const poolSize = 50;  // Increased pool size to have more stationery objects
let stationeryTypes = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('Fall');
  console.log('Canvas created and attached to #Fall');

  // Define stationery types with spawn weight adjustments
  stationeryTypes = [
    { type: 'pen', colors: ['#F5AA3D', '#60D3E1', '#CDDC39', 'rgb(198,123,225)', 'rgb(237,143,171)'], minLength: 30, maxLength: 80, capColor: 'rgb(255,160,160)', spawnWeight: 0.5 },
    { type: 'eraser', color: 'pink', width: 30, height: 15, shadowColor: 'gray', spawnWeight: 0.2 },
    { type: 'paper', color: 'white', width: 60, height: 80, shadowColor: 'rgba(0, 0, 0, 0.2)', spawnWeight: 0.1 },
    { type: 'ruler', color: '#FFE083', width: 10, height: 100, markingColor: 'rgb(102,100,100)', spawnWeight: 0.1 }
  ];

  // Initialize object pool
  for (let i = 0; i < poolSize; i++) {
    stationeryPool.push(new FallingStationery());
  }
}

function draw() {
  background('#D9EDF3');

  // Update & Display Active Objects
  for (let i = activeStationery.length - 1; i >= 0; i--) {
    let obj = activeStationery[i];
    obj.update();
    obj.display();

    // Recycle objects that go off-screen
    if (obj.y > height + 50) {
      activeStationery.splice(i, 1);
      stationeryPool.push(obj); // Return to pool
    }
  }

  // Spawn new objects from the pool with weighted probabilities
  if (frameCount % 10 === 0 && activeStationery.length < poolSize) {  // Increased spawn rate (lower value = faster spawn)
    if (stationeryPool.length > 0) {
      let obj = stationeryPool.pop();
      obj.reset();
      activeStationery.push(obj);
    }
  }
}

class Rule {
  constructor(condition, action) {
    this.condition = condition;
    this.action = action;
  }
}

class FallingStationery {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);  // Keep falling down the screen (no horizontal wind)
    this.y = random(-100, -10);  // Start a little above the screen for smooth fall
    this.speed = random(2, 3.5);  // Random fall speed, can be tweaked for more variety
    this.angle = random(-PI / 6, PI / 6);  // Slight angle variation for each object

    this.type = this.selectStationeryType();
    
    if (this.type.type === 'pen') {
      this.color = random(this.type.colors);
      this.length = random(this.type.minLength, this.type.maxLength);
      this.width = map(this.length, this.type.minLength, this.type.maxLength, 5, 10);
      this.speed *= 1.2;  // Pens fall faster
    } else {
      this.color = this.type.color;
      this.length = this.type.height;
      this.width = this.type.width;
    }

    this.rotationSpeed = random(0.01, 0.05);  // Slight random rotation for each object
  }

  selectStationeryType() {
    let totalWeight = 0;
    for (let type of stationeryTypes) {
      totalWeight += type.spawnWeight;
    }

    let randomChoice = random(totalWeight);
    let cumulativeWeight = 0;
    for (let type of stationeryTypes) {
      cumulativeWeight += type.spawnWeight;
      if (randomChoice < cumulativeWeight) {
        return type;
      }
    }
  }

  update() {
    this.y += this.speed;  // Keep falling straight down
    this.angle += this.rotationSpeed;  // Apply slight rotation
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();

    // List of rules that determine how to display different stationery types
    let rules = [
      new Rule(() => this.type.type === 'pen', () => {
        fill(this.color);
        rect(-this.width / 2, -this.length / 2, this.width, this.length, 5);
        fill(this.type.capColor);
        ellipse(0, -this.length / 2 - 5, this.width, this.width);
      }),
      new Rule(() => this.type.type === 'eraser', () => {
        fill(this.type.color);
        rect(-this.width / 2, -this.length / 2, this.width, this.length);
      }),
      new Rule(() => this.type.type === 'paper', () => {
        fill(this.type.color);
        rect(-this.width / 2, -this.length / 2, this.width, this.length);

        // Apply shadow effect
        drawingContext.shadowColor = color(this.type.shadowColor);
        drawingContext.shadowBlur = 15;

        // Add horizontal blue lines (notebook effect)
        stroke(0, 0, 255, 100);
        strokeWeight(1);
        for (let i = -this.length / 2 + 10; i < this.length / 2; i += 10) {
          line(-this.width / 2 + 5, i, this.width / 2 - 5, i);
        }

        // Add vertical red margin line
        stroke(255, 0, 0, 100);
        strokeWeight(2);
        line(-this.width / 2 + 10, -this.length / 2, -this.width / 2 + 10, this.length / 2);
      }),
      new Rule(() => this.type.type === 'ruler', () => {
        fill(this.type.color);
        rect(-this.width / 2, -this.length / 2, this.width, this.length);

        // Add black ruler markings
        stroke(this.type.markingColor);
        strokeWeight(2);
        for (let i = -this.length / 2 + 10; i < this.length / 2; i += 10) {
          let markLength = i % 50 === 0 ? this.width / 2 : this.width / 3; // Longer marks at every 50 units
          line(-this.width / 2, i, -this.width / 2 + markLength, i);
        }
      })
    ];

    // Loop through all rules and apply the matching action
    for (let rule of rules) {
      if (rule.condition()) {
        rule.action();
      }
    }

    pop();
  }
}
