<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import Input from '$lib/components/Input.svelte';
	import { breadcrumb } from '$lib/stores';
	export let data;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
	breadcrumb.set([
		{ label: 'لوحة التحكم' },
		{ label: 'مستخدمين', href: '/admin/users' },
		{ label: 'جديد', href: '/admin/users/new' }
	]);
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
			type="password"
			error={$errors.password}
			class="input"
			name="password"
			placeholder="كلمة المرور"
			bind:value={$form.password}
		/>
		<div class="flex flex-col">
			<select class="input" name="role" bind:value={$form.role}>
				<option value="ADMIN">رئيس قسم</option>
				<option value="TEACHER">استاذ</option>
				<option value="STUDENT">طالب</option>
			</select>
			<span class="empty text-xs font-semibold text-black/60">{$errors.role || ''}</span>
		</div>
		<button class="btn md primary">اضافة</button>
	</form>
</div>
