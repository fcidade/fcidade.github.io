<script lang="ts">
	import P5 from 'p5-svelte';
	import type { LoadResponse } from './+page';
	export let data: LoadResponse;
</script>

<div class="container col-md-6">
	<header class="mb-3">
		<hr />
		<h1 class="display-6">Purple Rain 🌧️</h1>
		<span class="lead">Sketch em p5.js</span>
	</header>
	<main class="d-flex justify-content-center mt-2 mb-2">
		<P5 sketch={data.sketch} />
	</main>
	<footer>
		<span class="blockquote-footer">
			Inspired by Daniel Shiffman's
			<a href="https://www.youtube.com/watch?v=KkyIDI6rQJI">Purple Rain</a>.
		</span>
	</footer>
</div>
