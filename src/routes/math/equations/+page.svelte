<script lang="ts">
	import { onMount } from 'svelte';
	import SimpleBlogContent from '../../components/SimpleBlogContent.svelte';
	import SimpleBlogHeader from '../../components/SimpleBlogHeader.svelte';

	let valueA = 0;
	let valueB = 0;
	let x = 0;

	let msg = '';

	function generate() {
		msg = '';
		valueA = Math.floor(Math.random() * 10);
		valueB = Math.floor(Math.random() * 10);
	}

	function confirm() {
		const result = valueA === x + valueB;
		msg = result ? 'Acertou!' : 'Errou!';
	}

	onMount(() => {
		generate();
	});
</script>

<SimpleBlogHeader title="Equações 🦾" description="Mais fácil do que parece" />

<SimpleBlogContent>
	<h2>{msg}</h2>

	<p>
		{valueA} = x + {valueB}
	</p>

	<p>Qual o valor de <b>x</b>?</p>

	<form on:submit={confirm}>
		<input type="number" bind:value={x} />
		<button>Confirmar</button>
		<button type="button" on:click={generate}>Novo</button>
	</form>
</SimpleBlogContent>
