<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import SketchContainer from '../../components/SketchContainer.svelte';
	import SketchBlogContent from '../../components/SketchBlogContent.svelte';
	import SketchHeader from '../../components/SketchHeader.svelte';
	const { PI } = Math;

	const width = 500,
		height = 500;

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

	type BranchConfig = {
		pos: Vec2;
		angle: number;
		randomizedAngle: number;
		branchesAngle: number
		length: number;
		index: number;
		maxIterations: number;
		branchGenerationChance: number;
	};

	class Branch {
		children: Branch[] = [];

		constructor(
			private readonly pos: Vec2,
			private readonly angle: number,
			branchesAngle: number,
			private readonly length: number,
			private readonly index: number,
			maxIterations: number,
			randomizedAngle: number,
			branchGenerationChance: number
		) {
			if (index < maxIterations) {
				if (Math.random() < branchGenerationChance) {
					this.children.push(
						Branch.from({
							pos: this.top(),
							angle: angle + branchesAngle + randomizedAngle  * (Math.random() - .5),
							branchesAngle,
							length: length * 0.9,
							index: index + 1,
							maxIterations,
							branchGenerationChance,
							randomizedAngle,
						})
					);
				}
				if (Math.random() < branchGenerationChance) {
					this.children.push(
						Branch.from({
							pos: this.top(),
							angle: angle - branchesAngle + randomizedAngle  * (Math.random() - .5),
							branchesAngle,
							length: length * 0.9,
							index: index + 1,
							maxIterations,
							branchGenerationChance,
							randomizedAngle,
						})
					);
				}
			}
		}

		static from({
			pos,
			maxIterations,
			angle,
			branchesAngle,
			length,
			index,
			branchGenerationChance,
			randomizedAngle,
		}: BranchConfig) {
			return new Branch(pos, angle, branchesAngle, length, index, maxIterations, randomizedAngle, branchGenerationChance);
		}

		top(): Vec2 {
			const dir = new Vec2(0, -this.length).rotRad(this.angle);
			return this.pos.add(dir);
		}

		draw(p5: p5) {
			const top = this.top();

			p5.strokeWeight(p5.map(this.index, 0, maxIterationsOption, 10, 1));
			p5.stroke(153, 50, 204, p5.map(this.index, 0, maxIterationsOption, 255, 50));
			// p5.stroke("black");
			p5.line(this.pos.x, this.pos.y, top.x, top.y);

			// p5.stroke("blue");
			// p5.point(this.pos.x, this.pos.y);

			// p5.stroke("red");
			// p5.point(top.x, top.y);

			this.children.forEach((c) => c.draw(p5));
		}
	}

	let branch: Branch;

	let trunkAngleOption = 0;
	let randomizedAngleOption = 0;
	let maxIterationsOption = 10;
	let branchGenerationChanceOption = 1;
	let branchesAngleOption = PI / 8;

	const generate = () => {
		branch = Branch.from({
			pos: new Vec2(width / 2, height * 0.8),
			angle: trunkAngleOption,
			randomizedAngle: randomizedAngleOption,
			branchesAngle: branchesAngleOption,
			length: 50,
			index: 0,
			maxIterations: maxIterationsOption,
			branchGenerationChance: branchGenerationChanceOption
		});
	};

	$: branchesAngleOption, trunkAngleOption, randomizedAngleOption, maxIterationsOption, branchGenerationChanceOption, generate();

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background(230);
			branch.draw(p5);
		};
	};
</script>

<SketchHeader title="Fractal Tree 🌳" description="Sketch em p5.js" />

<SketchContainer>
	<P5 {sketch} />

	<label for="initial-angle">Ângulo do tronco:</label>
	<input
		type="range"
		name="initial-angle"
		id="initial-angle"
		bind:value={trunkAngleOption}
		min={-PI}
		max={PI}
		step="0.01"
	/>

	<label for="branches-angle">Ângulo dos galhos:</label>
	<input
		type="range"
		name="branches-angle"
		id="branches-angle"
		bind:value={branchesAngleOption}
		min={-PI}
		max={PI}
		step="0.01"
	/>

	<label for="randomized-angle">Randomização do ângulo:</label>
	<input
		type="range"
		name="randomized-angle"
		id="randomized-angle"
		bind:value={randomizedAngleOption}
		min={0}
		max={PI}
		step="0.01"
	/>

	<label for="iterations">Iterações:</label>
	<input
		type="range"
		name="iterations"
		id="iterations"
		bind:value={maxIterationsOption}
		min="0"
		max="15"
	/>

	<label for="amount">Chance do galho ser gerado:</label>
	<input
		type="range"
		name="amount"
		id="amount"
		bind:value={branchGenerationChanceOption}
		min="0"
		max="1"
		step="0.01"
	/>

	<button on:click={generate}>Novo</button>
</SketchContainer>

<SketchBlogContent>
	Inspirado pelo vídeo
	<a href="https://www.youtube.com/watch?v=0jjeOYMjmDU">Fractal Tree</a>
	do Daniel Shiffman.
</SketchBlogContent>
