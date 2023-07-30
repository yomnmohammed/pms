<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import Input from '$lib/components/Input.svelte';
	import editor, { editorData } from '$lib/editor.js';
	import { get } from 'svelte/store';
	import { breadcrumb } from '$lib/stores/index.js';

	export let data;
	const { form, enhance, errors, capture, restore } = superForm(data.form);

	export const snapshot = { capture, restore };

	if (get(form).text) {
		editorData.set(JSON.parse($form.text));
	}
	editorData.subscribe((data) => {
		$form.text = JSON.stringify(data);
	});
	breadcrumb.set([
		{ label: 'ادارة المشاريع' },
		{ label: 'مقترحات', href: '/admin/proposals' },
		{ label: 'تعديل' }
	]);
</script>

<div class="container m-auto flex h-full w-full items-center justify-center px-8 py-2">
	<form
		method="POST"
		use:enhance
		class="flex w-full max-w-xl flex-col justify-center gap-4 rounded-md px-8 py-2 shadow-md"
	>
		<Input
			type="text"
			error={$errors.title}
			class="input"
			name="title"
			placeholder="العنوان"
			bind:value={$form.title}
		/>
		<div class="flex flex-col">
			<select class="input" name="status" bind:value={$form.status}>
				<option value="ACCEPTED">تمت الموافقة</option>
				<option value="PROGRESS">لم يتم اتخاذ قرار بعد</option>

				<option value="REJECTED">تم الرفض</option>
			</select>
			<span class="empty text-xs font-semibold text-black/60">{$errors.status || ''}</span>
		</div>
		<Input type="text" class="input hidden" name="text" bind:value={$form.text} />
		<div use:editor class="prose mx-4 my-8 w-full lg:prose-xl" />

		<button class="btn md success">تعديل</button>
	</form>
</div>
