import type { Element } from "p5";
import type { p5, Sketch } from "p5-svelte";

const width = 400, height = 400;

class RainDrop {
  x = 0;
  y = 0;
  z = 0;
  tailSize = 0;
  speed = 0;

  constructor(private readonly p5: p5) {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height * 2;
    this.z = Math.random() * 3;
    this.tailSize = this.z * 15;
    this.speed = Math.random() * 20;
  }

  draw(speedMultiplier: number) {
    const a = this.p5.map(this.z, 0, 3, 0, 100);
    this.p5.stroke(153 - a, 50 - a, 204 - a);

    this.y += this.speed * speedMultiplier;
    if (this.y > 800) {
      this.reset();
      this.y = -this.tailSize;
    }

    this.p5.strokeWeight(this.z);

    this.p5.line(this.x, this.y, this.x, this.y + this.tailSize);
  }
}

export const purpleRain: Sketch = (p5: p5) => {
  const rainDrops = Array.from({ length: 10000 }).map(() => new RainDrop(p5));

  let speedMultiplier: Element;

  p5.setup = () => {
    p5.createCanvas(width, height);

    const label = p5.createSpan("Speed:");
    label.style("display", "block");
    speedMultiplier = p5.createSlider(0, 10, .5, .001);
    speedMultiplier.style("display", "block");
  };

  p5.draw = () => {
    p5.background(200);

    rainDrops.forEach((rainDrop) => rainDrop.draw(Number(speedMultiplier.value())));
  };
};
