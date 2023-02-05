<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { SketchHeader, SketchBlogContent, SketchContainer } from '../../components';

	const width = 600,
		height = 600;

	class Vec3 {
		constructor(readonly x: number, readonly y: number, readonly z: number) {}

		static zero() {
			return new Vec3(0, 0, 0);
		}
	}

	class Sponge {
		children: Sponge[] = [];
		hasExploded = false;

		constructor(
			private readonly pos: Vec3,
			private readonly size: number,
			private readonly iteration: number
		) {}

		explode() {
			if (this.iteration > 1) {
				console.log('Sorry, too many instancies may crash your browser.');
				return;
			}

			if (this.hasExploded) {
				this.children.forEach((c) => c.explode());
				return;
			}

			this.hasExploded = true;
			for (let x = -1; x < 2; x++) {
				for (let y = -1; y < 2; y++) {
					for (let z = -1; z < 2; z++) {
						if (
							(x === 0 && y === 0 && z === 0) ||
							(x !== 0 && y === 0 && z === 0) ||
							(x === 0 && y !== 0 && z === 0) ||
							(x === 0 && y === 0 && z !== 0)
						) {
							continue;
						}
						this.children.push(new Sponge(new Vec3(x, y, z), this.size / 3, this.iteration + 1));
					}
				}
			}
		}

		draw(p5: p5) {
			p5.push();
			p5.translate(this.pos.x * this.size, this.pos.y * this.size, this.pos.z * this.size);
			if (this.hasExploded) {
				this.children.forEach((c) => c.draw(p5));
			} else {
				p5.ambientMaterial(
					this.mapColor(p5, this.pos.x),
					this.mapColor(p5, this.pos.y),
					this.mapColor(p5, this.pos.z)
				);
				p5.box(this.size, this.size);
			}
			p5.pop();
		}

		mapColor(p5: p5, a: number) {
			return p5.map(a, -1, 1, 0, 255);
		}
	}

	let sponge = new Sponge(Vec3.zero(), 100, 0);

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height, p5.WEBGL);
			sponge.explode();
		};

		p5.mouseClicked = () => {
			sponge.explode();
		};

		p5.draw = () => {
			p5.background(200);
			p5.ambientLight(255);
			p5.rotateX(-20 + p5.millis() * 0.001);
			p5.rotateZ(-20 + p5.millis() * 0.001);
			sponge.draw(p5);
		};
	};
</script>

<SketchHeader title="Menger Sponge 🧽" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchBlogContent>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=LG8ZK-rRkXo">Menger Sponge</a>
	do Daniel Shiffman.
</SketchBlogContent>
