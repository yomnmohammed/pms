<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import Input from '$lib/components/Input.svelte';
	import editor, { editorData } from '$lib/editor.js';
	import { breadcrumb } from '$lib/stores/index.js';

	export let data;
	const { form, enhance, errors, capture, restore } = superForm(data.form);
	editorData.subscribe((data) => {
		$form.text = JSON.stringify(data);
	});
	export const snapshot = { capture, restore };

	breadcrumb.set([
		{ label: 'ادارة المشاريع' },
		{ label: 'مقترحات', href: '/admin/proposals' },
		{ label: 'جديد', href: '/admin/proposals/new' }
	]);
</script>

<div class="container m-auto flex w-full items-center justify-center px-8 py-2">
	<form
		method="POST"
		use:enhance
		class="flex w-full max-w-xl flex-col justify-center gap-4 overflow-hidden rounded-md px-8 py-2 shadow-md"
	>
		<Input
			type="text"
			error={$errors.title}
			class="input"
			name="title"
			placeholder="العنوان"
			bind:value={$form.title}
		/>
		<Input
			type="text"
			error={$errors.text}
			class="input hidden"
			name="text"
			placeholder="النص"
			bind:value={$form.text}
		/>
		<div use:editor class="prose mx-4 my-8 w-full lg:prose-xl" />

		<button class="btn md primary">اضافة</button>
	</form>
</div>
