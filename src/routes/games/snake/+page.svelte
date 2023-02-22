<script lang="ts">
	import type { p5, Sketch } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { vec2, Vec2 } from '../../../math';
	import { SketchHeader, SketchBlogContent, SketchContainer } from '../../components';
	const { PI } = Math;

	const width = 400;
	const height = 400;

	const grid = 16;
	const gridSize = width / grid;

	class Snake {
		dir = vec2(1, 0);
		tail: Snake | null = null;

		constructor(public pos: Vec2) {}

		setDir(x: number, y: number) {
			if (x !== 0 && this.dir.x !== 0) return;
			if (y !== 0 && this.dir.y !== 0) return;
			this.dir = vec2(x, y);
		}

		growTail() {
			if (!this.tail) {
				this.tail = new Snake(vec2(this.pos.x, this.pos.y).sub(this.dir));
				this.tail.dir = this.dir;
			} else {
				this.tail.growTail();
			}
		}

		update() {
			this.pos = this.pos.add(this.dir);
			if (this.pos.x < 0) {
				this.pos.x = grid - 1;
			}
			if (this.pos.x >= grid) {
				this.pos.x = 0;
			}
			if (this.pos.y < 0) {
				this.pos.y = grid - 1;
			}
			if (this.pos.y >= grid) {
				this.pos.y = 0;
			}

			if (this.tail) {
				this.tail.update();
				this.tail.dir = this.dir;
			}
		}

		draw(p5: p5) {
			p5.fill('green');
			p5.rect(this.pos.x * gridSize, this.pos.y * gridSize, gridSize, gridSize);

			if (this.tail) {
				this.tail.draw(p5);
			}
		}
	}

	class Apple {
		constructor(public pos: Vec2) {}

		randomizePosition() {
			this.pos = Apple.randomPos();
		}

		static randomPos() {
			return vec2(Math.floor(Math.random() * grid), Math.floor(Math.random() * grid));
		}

		static random() {
			return new Apple(Apple.randomPos());
		}

		draw(p5: p5) {
			p5.fill('red');
			p5.rect(this.pos.x * gridSize, this.pos.y * gridSize, gridSize, gridSize);
		}
	}

	const snake = new Snake(vec2(Math.floor(grid / 2), Math.floor(grid / 2)));
	const apple = Apple.random();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();
	snake.growTail();

	setInterval(() => {
		snake.update();
	}, 250);

	export const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
			p5.frameRate(4);
		};

		p5.keyPressed = (event: KeyboardEvent) => {
			// debugger
			if (event.key === 'w') {
				snake.setDir(0, -1);
			}
			if (event.key === 's') {
				snake.setDir(0, 1);
			}
			if (event.key === 'a') {
				snake.setDir(-1, 0);
			}
			if (event.key === 'd') {
				snake.setDir(1, 0);
			}
		};

		p5.draw = () => {
			if (snake.pos.equal(apple.pos)) {
				snake.growTail();
				apple.randomizePosition();
			}

			p5.background(230);
			p5.noStroke();
			for (let x = 0; x < grid; x++) {
				for (let y = 0; y < grid; y++) {
					p5.fill(250);
					p5.stroke(200);
					if ((x + y) % 2 === 0) {
						p5.fill(200);
					} else {
						p5.fill(230);
					}
					p5.rect(x * gridSize, y * gridSize, gridSize, gridSize);
				}
			}

			apple.draw(p5);
			snake.draw(p5);
		};
	};
</script>

<SketchHeader title="Snake 🐍" description="Jogo desenvolvido com p5.js" />

<SketchContainer>
	<P5 {sketch} />
</SketchContainer>

<SketchBlogContent>
	<footer class="blockquote fs-6">
		<p>
			Serpente (Snake, também conhecido como "jogo da cobrinha") é um jogo que ficou conhecido por
			diversas versões cuja versão inicial começou com o jogo Blockade de 1976, sendo feitas várias
			imitações em vídeo-games e computadores. o jogo foi lançado para celulares Nokia em 1998 e se
			tornou popular.
		</p>
		<p>
			O jogador controla uma longa e fina criatura que se arrasta pela tela, coletando comida (ou
			algum outro item), não podendo colidir com seu próprio corpo ou as "paredes" que cercam a área
			de jogo. Cada vez que a serpente come um pedaço de comida, sua cauda cresce, aumentando a
			dificuldade do jogo. O usuário controla a direção da cabeça da serpente (para cima, para
			baixo, esquerda e direita) e seu corpo segue.
		</p>
		<p>
			Algumas versões melhoradas incluem "Corrida do Meerca" e "Corrida do Meerca II", incluído no
			Neopets, além de Nibbles, similar à Serpente, que foi incluído no sistema operacional MS-DOS
			por um tempo.
		</p>
		<footer class="blockquote-footer text-right">
			<a href="https://pt.wikipedia.org/wiki/Serpente_(jogo_eletr%C3%B4nico)">Wikipedia</a>
		</footer>
	</footer>
</SketchBlogContent>
