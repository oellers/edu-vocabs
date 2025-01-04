<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-row">
	<div class="basis-1/4">
		<nav class="flex flex-col">
			<a href="/">EduVocs</a>
			<a href="/search">Suche</a>
			<a href="/contact">Kontakt</a>
		</nav>
	</div>

	{@render children()}
</div>
