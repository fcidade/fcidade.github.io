<script>
	import BlogSection from './components/BlogSection.svelte';
	import p5SketchesPreview from './sketches/preview.png';
</script>

<BlogSection
	bgImg={p5SketchesPreview}
	url="/sketches"
	title="Artes geradas por código (Sketches com p5.js)"
	description="Alguns projetos artísticos criados a partir de código."
	topics="p5.js, fractais, vetores, recursividade"
/>

<BlogSection
	bgImg={p5SketchesPreview}
	url="/games"
	title="Games"
	description="Jogos que desenvolvi em diversas plataformas."
	topics="games, gamedev, p5.js, unity, godot, itch.io"
/>