<script lang="ts">
	import type { Element } from 'p5';
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import SketchContainer from '../../components/SketchContainer.svelte';
	import SketchFooter from '../../components/SketchFooter.svelte';
	import SketchHeader from '../../components/SketchHeader.svelte';

	const width = 400,
		height = 400;

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

	export const sketch: Sketch = (p5: p5) => {
		const rainDrops = Array.from({ length: 10000 }).map(() => new RainDrop(p5));

		let speedMultiplier: Element;

		p5.setup = () => {
			p5.createCanvas(width, height);

			const label = p5.createSpan('Speed:');
			label.style('display', 'block');
			speedMultiplier = p5.createSlider(0, 10, 0.5, 0.001);
			speedMultiplier.style('display', 'block');
		};

		p5.draw = () => {
			p5.background(200);

			rainDrops.forEach((rainDrop) => rainDrop.draw(Number(speedMultiplier.value())));
		};
	};
</script>

<SketchHeader title="Purple Rain 🌧️" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchFooter>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=KkyIDI6rQJI">Purple Rain</a>
	do  Daniel Shiffman.
</SketchFooter>
