<script lang="ts">
	import SimpleBlogContent from '../../components/SimpleBlogContent.svelte';
	import SimpleBlogHeader from '../../components/SimpleBlogHeader.svelte';

	let valueA = false;
	let valueB = false;
	let option = false;

	let msg = ""

	function generate() {
		msg = ""
		valueA = Math.random() > 0.5;
		valueB = Math.random() > 0.5;
	}

	function confirm() {
		console.log(option);
		
		msg = (option === valueA && valueB) ? "Acertou!" : "Errou!"
	}

	function displayBoolean(value: boolean): string {
		return value ? 'Verdadeiro' : 'Falso';
	}

	generate();
</script>

<SimpleBlogHeader title="Operações Lógicas 🦾" description="Verdadeiro ou falso?" />

<SimpleBlogContent>

	<h2>{msg}</h2>

	{displayBoolean(valueA)} (E) {displayBoolean(valueB)} =
	<select bind:value={option}>
		<option value={true}>Verdadeiro</option>
		<option value={false}>Falso</option>
	</select><br /><br>
	<button on:click={confirm}>Confirmar</button>
	<button on:click={generate}>Novo</button>
</SimpleBlogContent>
