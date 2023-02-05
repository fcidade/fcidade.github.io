<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { vec2, Vec2 } from '../../../math';
	import { SketchHeader, SketchBlogContent, SketchContainer } from '../../components';
	const { PI } = Math;

	const width = 600;
	const height = 600;

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height, p5.WEBGL);
		};

		p5.draw = () => {
			p5.background(250);
			p5.ambientLight(255);

			const gridSize = 50;
			const boxSize = 5;
			const boxHeight = 150;

			p5.rotateX(45);
			p5.rotateZ(-45);
			p5.translate((-boxSize * gridSize) / 2, (-boxSize * gridSize) / 2, 0);
			p5.noStroke();

			for (let x = 0; x < gridSize; x++) {
				for (let y = 0; y < gridSize; y++) {
					p5.push();
					p5.translate(x * boxSize, y * boxSize, 0);
					p5.ambientMaterial(p5.map(x, 0, gridSize, 0, 255), p5.map(y, 0, gridSize, 0, 255), p5.map(Math.sin(x + y), -PI, PI, 0, 255))
					// p5.box(boxSize, boxSize);
					p5.box(
						boxSize,
						boxSize,
						boxHeight * Math.sin(y + p5.millis() * 0.001) * Math.cos(x + p5.millis() * 0.001)
					);
					p5.pop();
				}
			}
		};
	};
</script>

<SketchHeader title="Cube Waves 🧊" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchBlogContent>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=H81Tdrmz2LA">Cube Waves</a>
	do Daniel Shiffman.
</SketchBlogContent>
