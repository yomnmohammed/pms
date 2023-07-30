<script lang="ts">
	import { team } from '$lib/animation';

	import Input from '$lib/components/Input.svelte';
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	export let data;
	import { superForm } from 'sveltekit-superforms/client';

	const { form, errors, enhance, capture, restore } = superForm(data.form);
	export const snapshot = { capture, restore };
	onMount(() => {
		team(container);
	});
	$: console.log($form.username);
</script>

<svelte:head>
	<title>تسجيل الدخول</title>
</svelte:head>
<div class="container m-auto grid min-h-screen grid-cols-1 place-items-center gap-2 md:grid-cols-2">
	<div class="container m-auto flex h-full w-full items-center justify-center px-8">
		<form
			method="POST"
			use:enhance
			class="flex w-full max-w-md flex-col justify-center gap-4 rounded-md px-8 py-4 shadow-md"
		>
			<div class="mb-8 text-center">
				<h1 class="text-lg font-extrabold">
					انجز بسرعة داخل
					<span class="text-blue-500"> فريق. </span>
				</h1>
				<p class="mt-4 text-sm font-semibold text-black text-opacity-60">
					لن تحتاج الى برامج لتوثيق مشروعك كل ما تحتاجه من ادارة مراقبة توثيق موجود هنا.
				</p>
			</div>
			<Input
				type="text"
				error={$errors.username}
				class="input"
				placeholder="اسم المستخدم"
				name="username"
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

			<button class="btn md primary">تسجيل الدخول</button>
		</form>
	</div>
	<div bind:this={container} class="hidden h-full w-full md:block" />
</div>
