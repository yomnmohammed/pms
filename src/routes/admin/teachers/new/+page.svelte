<script lang="ts">
	import type { PageData, Snapshot } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Input from '$lib/components/Input.svelte';
	import { breadcrumb } from '$lib/stores';
	export let data: PageData;

	const { form, errors, enhance, capture, restore } = superForm(data.form);
	breadcrumb.set([
		{ label: 'لوحة التحكم' },
		{ label: 'اساتذة', href: '/admin/teachers' },
		{ label: 'جديد', href: '/admin/teachers/new' }
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
			error={$errors.username}
			class="input"
			name="username"
			placeholder="اسم المستخدم"
			bind:value={$form.username}
		/>
		<Input
			type="text"
			error={$errors.name}
			class="input"
			name="name"
			placeholder="الاسم"
			bind:value={$form.name}
		/>
		<Input
			type="text"
			error={$errors.degree}
			class="input"
			name="degree"
			placeholder="الدرجة"
			bind:value={$form.degree}
		/>
		<Input
			type="text"
			error={$errors.special}
			class="input"
			name="special"
			placeholder="التخصص"
			bind:value={$form.special}
		/>
		<div class="flex flex-col">
			<select class="input" name="role" bind:value={$form.role}>
				<option value="ADMIN">رئيس قسم</option>
				<option value="TEACHER">استاذ</option>
			</select>
			<span class="empty text-xs font-semibold text-black/60">{$errors.role || ''}</span>
		</div>
		<Input
			type="password"
			error={$errors.password}
			class="input"
			name="password"
			placeholder="كلمة المرور"
			bind:value={$form.password}
		/>
		<button class="btn md primary">اضافة</button>
	</form>
</div>
