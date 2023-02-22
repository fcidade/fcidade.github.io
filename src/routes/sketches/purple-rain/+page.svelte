<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import SketchContainer from '../../components/SketchContainer.svelte';
	import SketchBlogContent from '../../components/SketchBlogContent.svelte';
	import SketchHeader from '../../components/SimpleBlogHeader.svelte';

	let speedOption: number = 10;
	let amountOption: number = 10;

	const width = 400,
		height = 400;

	class RainDrop {
		x = 0;
		y = 0;
		z = 0;
		tailSize = 0;
		speed = 0;

		constructor() {
			this.reset();
		}

		reset() {
			this.x = Math.random() * width;
			this.y = Math.random() * height * 2;
			this.z = Math.random() * 3;
			this.tailSize = this.z * 15;
			this.speed = Math.random() * 20;
		}

		draw(p5: p5, speedMultiplier: number) {
			const a = p5.map(this.z, 0, 3, 0, 100);
			p5.stroke(153 - a, 50 - a, 204 - a);

			this.y += this.speed * speedMultiplier;
			if (this.y > 800) {
				this.reset();
				this.y = -this.tailSize;
			}

			p5.strokeWeight(this.z);

			p5.line(this.x, this.y, this.x, this.y + this.tailSize);
		}
	}

	let rainDrops: RainDrop[] = [];

	$: {
		rainDrops = Array.from({ length: amountOption }).map(() => new RainDrop());
	}

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background(200);

			rainDrops.forEach((rainDrop) => rainDrop.draw(p5, Number(speedOption)));
		};
	};
</script>

<SketchHeader title="Purple Rain 🌧️" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />

	<label for="speed">Velocidade:</label>
	<input type="range" name="speed" id="speed" bind:value={speedOption} min="0" max="100"/>

	<label for="amount">Quantidade:</label>
	<input type="range" name="amount" id="amount" bind:value={amountOption} min="0" max="1000"/>
</SketchContainer>

<SketchBlogContent>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=KkyIDI6rQJI">Purple Rain</a>
	do Daniel Shiffman.
</SketchBlogContent>
