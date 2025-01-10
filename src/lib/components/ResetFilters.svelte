<script>
	import { resetFilters } from '$lib/db';
</script>

<div
	onclick={resetFilters}
	tabindex="0"
	role="button"
	class="mt-2
  w-52
  select-none
  rounded-lg
  border
  border-gray-300
  bg-white
  px-2
  py-2
  text-center
  text-gray-700
  shadow-sm
  focus:outline-none
  focus:ring-2
  focus:ring-gray-300"
>
	Filter zurücksetzen
</div>
