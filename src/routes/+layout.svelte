<script>
	import '../app.postcss';
	import { Jumper } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

{#if $navigating}
	<div class="fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-white/80">
		<Jumper size="60" color="#00ff2a" unit="px" duration="1s" />
	</div>
{/if}
<SvelteToast />
<slot />
