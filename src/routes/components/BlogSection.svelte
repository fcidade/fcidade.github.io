<script lang="ts">
	export let title: string;
	export let description: string;
	export let topics: string;
	export let url: string;
	export let bgImg: string;
</script>

<div class="container pt-2 col-md-6	fw-light">
	<a href={url}>
		<section
			class="w-100 blog-section card text-white border-0"
			style="--p5SketchesPreview: url({bgImg});"
		>
			<div class="card-img-overlay justify-content-end d-flex flex-column">
				<h5 class="card-title">{title}</h5>
				<p class="card-text">
					{description}
				</p>
				<p class="card-text"><b>Tópicos:</b> {topics}</p>
			</div>
		</section></a
	>
</div>

<style>
	.blog-section {
		height: 250px;
		background-image: linear-gradient(to top, #390947dd, #d46eb300), var(--p5SketchesPreview);
		background-repeat: repeat-x;
		background-size: 40%;
		background-position: center;
		transition: background-size 0.5s;
	}

	.blog-section:hover {
		background-size: 45%;
		transition: background-size 0.5s;
	}
</style>
