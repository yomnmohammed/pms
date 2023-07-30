<script lang="ts">
	import editor, { editorData } from '$lib/editor.js';
	import { breadcrumb } from '$lib/stores';
	import { Circle } from 'svelte-lucide';

	breadcrumb.set([
		{ label: 'ادارة المشاريع' },
		{ label: 'المشاريع', href: '/teachers/projects' },
		{ label: 'عرض' }
	]);
	export let data;
	editorData.set(JSON.parse(data.project?.text ?? '{}'));
</script>

<section class="prose mx-auto basis-full px-2 py-4">
	<Circle class="h-3 w-3 fill-green-500 stroke-transparent" />
	<h1 class="text-center">{data.project.name}</h1>
	<div use:editor class="prose mx-4 my-8 h-full w-full lg:prose-xl" />
</section>
