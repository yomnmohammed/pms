<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let value: HTMLInputAttributes['value'] = undefined;
	export let error: string[] | undefined = undefined;
</script>

<div class="flex flex-col">
	<input
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		class:error
		{...$$restProps}
	/>
	<span class="empty text-xs font-semibold text-black/60">{error || ''}</span>
</div>
