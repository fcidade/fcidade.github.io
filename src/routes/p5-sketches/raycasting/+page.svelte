<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { vec2, Vec2 } from '../../../math';
	import { SketchHeader, SketchBlogContent, SketchContainer } from '../../components';
	const { PI } = Math;

	const width = 600,
		height = 600;

	class Boundary {
		constructor(readonly a: Vec2, readonly b: Vec2) {}

		draw(p5: p5) {
			p5.line(this.a.x, this.a.y, this.b.x, this.b.y);
		}
	}

	class Caster {
		constructor(private pos: Vec2, private readonly boundaries: Boundary[]) {}

		moveTo(x: number, y: number) {
			this.pos = new Vec2(x, y);
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
			p5.fill('red');
			p5.circle(this.pos.x, this.pos.y, 5);

			for (let angle = 0; angle < 2 * PI; angle += PI / 128) {
				const hit = this.cast(angle);
				if (!hit) continue;
				p5.stroke(255);
				p5.line(this.pos.x, this.pos.y, hit.x, hit.y);
			}
		}
	}

	const boundaries = Array.from({ length: 10 }).map(
		() =>
			new Boundary(
				vec2(Math.random() * width, Math.random() * height),
				vec2(Math.random() * width, Math.random() * height)
			)
	);
	boundaries.push(
		new Boundary(vec2(0, 0), vec2(width, 0)),
		new Boundary(vec2(0, 0), vec2(0, height)),
		new Boundary(vec2(width, 0), vec2(width, height)),
		new Boundary(vec2(0, height), vec2(width, height))
	);
	const caster = new Caster(new Vec2(width / 2, height / 2), boundaries);

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.keyPressed = () => {
			// debugger
		};

		p5.draw = () => {
			caster.moveTo(p5.mouseX, p5.mouseY);

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
