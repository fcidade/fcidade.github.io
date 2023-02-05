<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import SketchContainer from '../../components/SketchContainer.svelte';
	import SketchFooter from '../../components/SketchFooter.svelte';
	import SketchHeader from '../../components/SketchHeader.svelte';
	const { PI } = Math;

	const width = 500,
		height = 500;

	const iterations = 10;

	class Vec2 {
		constructor(readonly x: number, readonly y: number) {}

		add(vec: Vec2) {
			return new Vec2(this.x + vec.x, this.y + vec.y);
		}

		mag(): number {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}

		angle(): number {
			return Math.atan2(this.y, this.x);
		}

		rotRad(angle: number): Vec2 {
			const newAngle = this.angle() + angle;
			const mag = this.mag();
			return new Vec2(Math.cos(newAngle) * mag, Math.sin(newAngle) * mag);
		}

		setRotRad(angle: number): Vec2 {
			const mag = this.mag();
			return new Vec2(Math.cos(angle) * mag, Math.sin(angle) * mag);
		}
	}

	class Branch {
		children: Branch[] = [];

		constructor(
			private readonly p5: p5,
			private readonly feet: Vec2,
			private readonly angle: number,
			private readonly length: number,
			private readonly index: number
		) {
			console.log(length);
			if (index < iterations) {
				const leftBranch = new Branch(
					p5,
					this.top(),
					angle + -PI / 8,
					this.length * 0.9,
					index + 1
				);
				const rightBranch = new Branch(
					p5,
					this.top(),
					angle + PI / 8,
					this.length * 0.9,
					index + 1
				);

				if (Math.random() > 0.1) {
					this.children.push(leftBranch);
				}
				if (Math.random() > 0.1) {
					this.children.push(rightBranch);
				}
			}
		}

		top(): Vec2 {
			const dir = new Vec2(0, -this.length).rotRad(this.angle);
			return this.feet.add(dir);
		}

		draw() {
			const top = this.top();

			this.p5.strokeWeight(this.p5.map(this.index, 0, iterations, 10, 1));
			this.p5.stroke(153, 50, 204, this.p5.map(this.index, 0, iterations, 255, 50));
			// this.p5.stroke("black");
			this.p5.line(this.feet.x, this.feet.y, top.x, top.y);

			// this.p5.stroke("blue");
			// this.p5.point(this.feet.x, this.feet.y);

			// this.p5.stroke("red");
			// this.p5.point(top.x, top.y);

			this.children.forEach((c) => c.draw());
		}
	}

	export const sketch: Sketch = (p5: p5) => {
		const branch = new Branch(p5, new Vec2(width / 2, height * 0.8), 0, 50, 0);

		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background(230);
			branch.draw();
			p5.noLoop();
		};
	};
</script>

<SketchHeader title="Fractal Tree 🌳" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchFooter>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=0jjeOYMjmDU">Fractal Tree</a>
	do Daniel Shiffman.
</SketchFooter>
