<script>
	import { config } from '$lib/config';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import LicenseIcon from '$lib/icons/LicenseIcon.svelte';
	import { t } from 'svelte-i18n';
</script>

<footer class="footer items-center justify-center bg-base-100 p-4">
	<aside>
		<a
			href="https://creativecommons.org/licenses/by/4.0"
			target="_blank"
			aria-label={$t('license.disclaimer', { values: { licenseName: 'CC-BY 4.0' } })}
			class="btn btn-ghost btn-primary btn-xs mb-1 mr-1 h-auto p-1"
		>
			<div class="w-20"><LicenseIcon /></div>
			{$t('license.disclaimer', { values: { licenseName: 'CC-BY 4.0' } })}
		</a>
	</aside>
	<a href={config.gitRepo} class="btn btn-ghost w-20 cursor-pointer"><GithubIcon /></a>
</footer>
