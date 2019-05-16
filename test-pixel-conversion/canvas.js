var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c statnds for context
var c = canvas.getContext('2d')

// shape
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);  // draws a rectangle. x, y are the start cordinates for the top left (x, y, width, height)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 500, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(600, 300, 100, 100);

// Line
// c.beginPath();
// c.moveTo(50, 300); // start point, takes an (x, y)
// c.lineTo(300, 100); // next point to draw to, takes an (x, y)
// c.lineTo(400, 300); // next point
// c.strokeStyle = "#5a89a2"; // sets a color to the line
// c.stroke(); // tells it to draw the line

// arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false); // takes (x, y, r: int, startangle: Float, endangle: Float, dawCouterClockwise: Bool (False)) r stands for radius
// c.strokeStyle = 'red';
// c.stroke();

// const color = (x) => Math.floor(Math.random() * x)
// function color(num) {
//   random = Math.random() * num;
//   return Math.floor(random);
// }
//
//
// for (var i=0; i<400; i++) {
//   var x = Math.random() * window.innerWidth; // set's random cordinates for start of arcs/circles
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgb(${color(255)}, ${color(255)}, ${color(255)})`;
//   c.stroke();
// }

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
  '#430571',
  '#810D70',
  '#F58225',
  '#F8A51B',
  '#00ACAC'
]

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'red';
    // c.stroke();
    c.fillStyle = this.color
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;
var radius = 30;

var circleArray = [];

function init() {
  circleArray = [];

  for (var i=0; i< 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i=0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
