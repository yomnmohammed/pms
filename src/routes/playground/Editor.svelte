<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import mermaid from 'mermaid';
	import editor, { editorData, parseJsonEditor } from '$lib/editor';

	afterUpdate(() => {
		mermaid.contentLoaded();
	});
</script>

<div class="grid h-full w-full grid-cols-2">
	<div use:editor class="prose mx-4 my-8 h-full w-full lg:prose-xl" />
	<div class="prose lg:prose-xl">
		{@html $editorData ? parseJsonEditor($editorData) : ''}
	</div>
</div>
