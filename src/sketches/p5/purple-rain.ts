import type { p5, Sketch } from "p5-svelte";

export const purpleRain: Sketch = (p5: p5) => {
    let width = 55;
    let height = 55;

    p5.setup = () => {
        p5.createCanvas(400, 400);
    };
    p5.draw = () => {
        p5.background(200);
        p5.ellipse(p5.width / 2, p5.height / 2, width, height);
    };
};