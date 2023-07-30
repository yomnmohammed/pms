<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { calculateRedirectToTablePage } from '$lib/client/redirect.js';
	import { success } from '$lib/components/toast.js';
	import { breadcrumb } from '$lib/stores';
	import { ChevronLeft, ChevronRight, Pencil, Trash, Trash2 } from 'svelte-lucide';

	breadcrumb.set([{ label: 'لوحة التحكم' }, { label: 'طلاب', href: '/admin/students' }]);

	export let data;
</script>

<section aria-label="main content" class="flex min-h-0 flex-auto flex-col border-l">
	<table>
		<thead>
			<tr>
				<th> اسم المستخدم </th>
				<th> اسم الطالب </th>
				<th> معرف الطالب </th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#await data.streamed.students}
				loading...
			{:then students}
				{#each students as student (student.id)}
					<tr>
						<td>{student.username}</td>
						<td>{student.student?.name ?? ''}</td>
						<td>{student.student?.identity ?? ''}</td>
						<td class="flex gap-2">
							<a href={`/admin/students/${student.id}/edit`}
								><Pencil class="h-5 w-5 fill-white stroke-green-500" /></a
							>
							<form
								action={`?/delete&id=${student.id}${calculateRedirectToTablePage()}`}
								method="POST"
								use:enhance={() => {
									return async ({ result }) => {
										success('تم الحذف بنجاح');
										await applyAction(result);
									};
								}}
							>
								<button>
									<Trash2 class="h-5 w-5 fill-white stroke-red-500" />
								</button>
							</form>
						</td>
					</tr>
				{/each}
			{:catch error}
				<span class="text-red-500"> اسف حدث خطأ غير متوقع. </span>
			{/await}
		</tbody>
		<tfoot class="mx-8 flex justify-between p-2">
			<a
				aria-disabled={data.meta.hasNextPage}
				href={data.meta.nextPageUrl}
				class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<ChevronRight />
			</a>
			<a
				aria-disabled={data.meta.hasPrevPage}
				href={data.meta.prevPageUrl}
				class="ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<ChevronLeft />
			</a>
		</tfoot>
	</table>
</section>

<style lang="postcss">
	table {
		@apply flex h-full min-h-0 w-full flex-col border-t;
	}
	thead {
		@apply flex w-full flex-col px-4;
		& tr {
			@apply flex border-b;
		}
	}
	th {
		@apply flex-1 truncate px-1 py-3  font-semibold;
	}
	tbody {
		@apply flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4;
		& tr {
			@apply flex cursor-pointer border-b hover:bg-blue-100;
		}
	}
	td {
		@apply flex-1 truncate px-1 py-3;
	}
</style>
