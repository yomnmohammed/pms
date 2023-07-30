<script lang="ts">
	import editor, { editorData } from '$lib/editor.js';
	import { breadcrumb } from '$lib/stores/index.js';

	export let data;
	// @ts-ignore
	editorData.set(JSON.parse(data.proposal.text ?? ''));
	breadcrumb.set([
		{ label: 'ادارة المشاريع' },
		{ label: 'مقترحات', href: '/admin/proposals' },
		{ label: 'عرض' }
	]);
</script>

<section class="prose mx-auto basis-full px-2 py-4">
	<h1 class="text-center">{data.proposal.title ?? ''}</h1>
	<div use:editor class="prose mx-4 my-8 h-full w-full lg:prose-xl" />
</section>
