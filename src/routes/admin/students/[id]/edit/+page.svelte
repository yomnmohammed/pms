<script lang="ts">
	import type { PageData, Snapshot } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Input from '$lib/components/Input.svelte';
	import { breadcrumb } from '$lib/stores';
	export let data: PageData;

	const { form, errors, enhance, capture, restore } = superForm(data.form);
	breadcrumb.set([
		{ label: 'لوحة التحكم' },
		{ label: 'طلاب', href: '/admin/students' },
		{ label: 'تعديل' }
	]);
	export const snapshot: Snapshot = { capture, restore };
</script>

<div class="container m-auto flex h-full w-full items-center justify-center px-8">
	<form
		method="POST"
		use:enhance
		class="flex w-full max-w-md flex-col justify-center gap-4 rounded-md px-8 py-4 shadow-md"
	>
		<Input
			type="text"
			error={$errors.name}
			class="input"
			name="name"
			placeholder="اسم الطالب"
			bind:value={$form.name}
		/>
		<Input
			type="text"
			error={$errors.identity}
			class="input"
			name="identity"
			placeholder="معرف الطالب"
			bind:value={$form.identity}
		/>

		<button class="btn md success">تعديل</button>
	</form>
</div>
