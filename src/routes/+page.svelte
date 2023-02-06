<script>
	import p5SketchesPreview from './sketches/preview.png';
</script>

<div class="container pt-4 col-md-6	fw-light">

	<a href="/sketches">
	<section
		class="w-100 blog-section card text-white"
		style="--p5SketchesPreview: url({p5SketchesPreview});"
	>
		<div class="card-img-overlay justify-content-end d-flex flex-column">
			<h5 class="card-title">Artes geradas por código (Sketches com p5.js)</h5>
			<p class="card-text">
				Alguns projetos artísticos criados a partir de código.
			</p>
			<p class="card-text"><b>Tópicos:</b> p5.js, fractais, vetores, recusrividade</p>
		</div>
	</section></a>
</div>

<style>
	.blog-section {
		height: 250px;
		background-image: linear-gradient(to top, #390947dd, #d46eb300), var(--p5SketchesPreview);
		background-repeat: repeat-x;
		background-size: 40%;
		background-position: center;
		transition: background-size .5s;
	}

	.blog-section:hover {
		background-size: 50%;
		transition: background-size .5s;
	}
</style>
