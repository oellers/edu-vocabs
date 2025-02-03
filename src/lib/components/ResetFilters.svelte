<script>
	import { resetFilters } from '$lib/db';
</script>

<button
	onclick={resetFilters}
	type="button"
	onkeydown={(e) => e.key === 'Enter' && resetFilters()}
	tabindex="0"
	class="btn mt-2"
>
	Filter zurücksetzen
</button>
