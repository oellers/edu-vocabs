<script>
	let { badgeLabel, badgeStyle = 'badge-primary badge-outline badge-xs' } = $props();
</script>

<div class={`badge ${badgeStyle} m-1 h-auto p-2`}>
	{badgeLabel}
</div>
