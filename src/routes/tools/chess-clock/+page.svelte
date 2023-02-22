<script lang="ts">
	import { onMount } from 'svelte';
	import SimpleBlogContent from '../../components/SimpleBlogContent.svelte';
	import SimpleBlogHeader from '../../components/SimpleBlogHeader.svelte';
	import NoSleep from 'nosleep.js';

	const secondInMs = 1000;
	const minutesInSeconds = 60;

	let clock = 0;
	let interval: any | number = null;
	let turn: 'white' | 'black' | 'first_move' = 'first_move'

	function reset() {
		clock = 5 * minutesInSeconds * secondInMs;
		clearInterval(interval)
		interval = null;
		turn = 'first_move'
	}

	function tick() {
		clock -= secondInMs;
	}

	function startClock() {
		if (interval !== null) return;
		interval = setInterval(tick, secondInMs);
	}

	$: minutes = Math.floor(clock / (minutesInSeconds * secondInMs));
	$: seconds = (clock - minutes * minutesInSeconds * secondInMs) / secondInMs;
	$: timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

	onMount(() => {
		const noSleep = new NoSleep();

		document.addEventListener(
			'click',
			function enableNoSleep() {
				document.removeEventListener('click', enableNoSleep, false);
				noSleep.enable();
			},
			false
		);

		reset();
	});
</script>

<SimpleBlogHeader title="Cronômetro para Xadrez ♟️" description="Quem vai ganhar?" />

<SimpleBlogContent>
	<h1>{timeDisplay}</h1>
	<p>
		Vez das: <b>pretas</b>
	</p>
	<button on:click={startClock}>Pretas</button>
	<button on:click={startClock}>Brancas</button>
	<button on:click={reset}>Reiniciar</button>
</SimpleBlogContent>
