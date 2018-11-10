import Particle from "./Particle";
import { canvas, c, randomIntFromRange, getDistance } from "./utils";

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => init());

// Implementation
let particles;

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radius = 15;
    let x = randomIntFromRange(radius, canvas.width - 2 * radius);
    let y = randomIntFromRange(radius, canvas.height - 2 * radius);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        // If the new particle is spawned on top of another particle,
        // then reroll the x and y.
        if (
          getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 <
          0
        ) {
          x = randomIntFromRange(radius, canvas.width - 2 * radius);
          y = randomIntFromRange(radius, canvas.height - 2 * radius);

          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(particles);
  });
}

init();
animate();
