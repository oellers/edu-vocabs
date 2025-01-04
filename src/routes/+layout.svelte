<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-row">
	<div class="mt-8 basis-1/4 pl-4">
		<nav class="flex flex-col gap-4">
			<a href="/">EduVocs</a>
			<a href="/search">Suche</a>
			<a href="/contact">Kontakt</a>
		</nav>
	</div>
	<div class="mt-8 w-full">
		{@render children()}
	</div>
</div>
