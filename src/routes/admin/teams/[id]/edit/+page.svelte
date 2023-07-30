<script lang="ts">
	import Select from 'svelte-select';
	import { breadcrumb } from '$lib/stores';
	import Input from '$lib/components/Input.svelte';

	export let data;

	breadcrumb.set([
		{ label: 'لوحة التحكم' },
		{ label: 'فرق', href: '/admin/teams' },
		{ label: 'تعديل' }
	]);
</script>

<div class="container m-auto flex h-full w-full items-center justify-center px-8">
	<form
		method="POST"
		class="flex w-full max-w-md flex-col justify-center gap-4 rounded-md px-8 py-4 shadow-md"
	>
		{#await data.streamed.students then students}
			<Input
				type="text"
				class="input"
				name="name"
				placeholder="اسم الفريق"
				required
				value={data.team.name}
			/>

			<Select
				itemId="id"
				label="name"
				items={students}
				name="students"
				multiple
				required
				class="input"
				placeholder="طلاب"
				hideEmptyState
				value={data.team?.students}
			/>
		{/await}
		{#await data.streamed.teachers then teachers}
			<Select
				itemId="id"
				label="name"
				items={teachers}
				name="teachers"
				multiple
				required
				class="input"
				placeholder="اساتذة"
				hideEmptyState
				justValue
				value={data.team?.teachers}
			/>
		{/await}
		<button class="btn md success">تعديل</button>
	</form>
</div>
