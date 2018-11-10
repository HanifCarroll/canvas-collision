import {
  c,
  canvas,
  getRandomColor,
  getObjectDistance,
  resolveCollision,
  randomIntFromRange,
} from "./utils";

const mouse = { x: null, y: null };

addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

export default class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: randomIntFromRange(-5, 5),
      y: randomIntFromRange(-5, 5),
    };
    this.radius = radius;
    this.mass = 1;
    this.color = getRandomColor();
    this.opacity = 0;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.lineWidth = 2;
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  checkBoundaries() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }
  }

  checkHover() {
    if (getObjectDistance(this, mouse) < 80 && this.opacity <= 0.2) {
      this.opacity += 0.05;
    } else if (this.opacity > 0) {
      this.opacity -= 0.05;

      this.opacity = Math.max(0, this.opacity);
    }
  }

  update(particles) {
    this.draw();
    this.checkBoundaries();
    this.checkHover();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;

      if (getObjectDistance(this, particles[i]) - this.radius * 2 < 0) {
        resolveCollision(this, particles[i]);
      }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
