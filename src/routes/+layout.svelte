<div class="body pb-5	">
	<header class="container pt-5 mb-2 col-md-6">
		<h1 class="display-5">Francisco Cidade 🎵</h1>
		<span class="lead">Biblioteca de hobbies</span>
	</header>
	<slot />
</div>

<footer class="w-100 text-center bg-black text-white p-2">
	<span class="lead">{new Date().getFullYear()}</span>
</footer>

<style>
	.body {
		min-height: 100vh;
		background-color: hsl(0, 0%, 96%);
	}
</style>
