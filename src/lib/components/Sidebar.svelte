<script>
	import MenuIcon from "$lib/icons/MenuIcon.svelte";
    let open = false;
</script>

<button class="btn btn-primary lg:hidden" on:click={() => open = !open}>
    <MenuIcon />
</button>
<button type="button" class={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} on:click={() => open = false} aria-label="Close sidebar" on:keydown={(e) => e.key === 'Enter' && (open = false)}></button>
<div class={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 transform transition-transform lg:static lg:inset-0 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
    <nav class="flex flex-col gap-4 p-4">
        <a href="/" class="btn btn-ghost">EduVocs</a>
        <a href="/search" class="btn btn-ghost">Suche</a>
        <a href="/contact" class="btn btn-ghost">Kontakt</a>
    </nav>
</div>


