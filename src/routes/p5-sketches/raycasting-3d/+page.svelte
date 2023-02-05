<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { vec2, Vec2 } from '../../../math';
	import { SketchHeader, SketchBlogContent, SketchContainer } from '../../components';
	const { PI } = Math;

	class Random {
		static between(min: number, max: number): number {
			return min + Math.random() * (max - min);
		}
	}

	const width = 400,
		height = 400;

	class Boundary {
		constructor(readonly a: Vec2, readonly b: Vec2) {}

		draw(p5: p5) {
			/* 2D */
			p5.push();
			p5.stroke(255);
			p5.line(this.a.x, this.a.y, this.b.x, this.b.y);
			p5.pop();
		}
	}

	class Caster {
		constructor(private pos: Vec2, private readonly boundaries: Boundary[]) {}

		moveTo(x: number, y: number) {
			this.pos = new Vec2(x, y);
		}
		move(x: number, y: number) {
			const speed = 2;

			this.pos = this.pos.add(new Vec2(x * speed, y * speed));
		}

		check(dir: Vec2, boundary: Boundary): Vec2 | null {
			const x1 = boundary.a.x;
			const y1 = boundary.a.y;
			const x2 = boundary.b.x;
			const y2 = boundary.b.y;

			const x3 = this.pos.x;
			const y3 = this.pos.y;
			const x4 = this.pos.x + dir.x;
			const y4 = this.pos.y + dir.y;

			const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
			if (den == 0) {
				// Lines are parallel
				return null;
			}

			const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
			if (t == 0) {
				return null;
			}

			const u = -((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;
			if (t > 0 && t < 1 && u > 0) {
				return vec2(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
			}

			return null;
		}

		cast(angle: number): Vec2 | null {
			const dir = vec2(0, 50).rotRad(angle);
			const hits: Record<number, Vec2> = {};
			for (const boundary of this.boundaries) {
				const hit = this.check(dir, boundary);
				if (hit) {
					hits[hit.dist(this.pos)] = hit;
				}
			}
			const sortedHits = Object.keys(hits)
				.map(Number)
				.sort((a, b) => (a < b ? -1 : 1));

			if (!sortedHits.length) return null;
			return hits[sortedHits[0]];
		}

		draw(p5: p5) {
			p5.stroke(255);
			for (let angle = -PI / 4; angle < PI / 4; angle += PI / 32) {
				const hit = this.cast(angle);
				if (!hit) continue;

				p5.push();

				// 3D Here

				p5.pop();

				this.draw2d(p5, hit);
			}
		}

		private draw2d(p5: p5, hit: Vec2) {
			p5.push();
			p5.stroke(255);
			p5.line(this.pos.x, this.pos.y, hit.x, hit.y);
			p5.pop();
		}
	}

	const boundaries = Array.from({ length: 10 }).map(
		() =>
			new Boundary(
				vec2(Random.between(0, width), Random.between(0, height)),
				vec2(Random.between(0, width), Random.between(0, height))
			)
	);
	boundaries.push(
		new Boundary(vec2(0, 0), vec2(width, 0)),
		new Boundary(vec2(0, 0), vec2(0, height)),
		new Boundary(vec2(width, 0), vec2(width, height)),
		new Boundary(vec2(0, height), vec2(width, height))
	);
	const caster = new Caster(new Vec2(width/2, height/2), boundaries);

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width * 2, height);
		};

		p5.keyPressed = () => {
			// debugger
		};

		p5.draw = () => {
			if (p5.keyIsDown(87)) {
				caster.move(0, -1);
			}
			if (p5.keyIsDown(83)) {
				caster.move(0, 1);
			}
			if (p5.keyIsDown(65)) {
				caster.move(-1, 0);
			}
			if (p5.keyIsDown(68)) {
				caster.move(1, 0);
			}

			p5.background(0);
			boundaries.forEach((b) => b.draw(p5));
			caster.draw(p5);
		};
	};
</script>

<SketchHeader title="Raycasting (2D) ⚡" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchBlogContent>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=TOEi6T2mtHo">Raycasting 2D</a>
	do Daniel Shiffman.
</SketchBlogContent>
