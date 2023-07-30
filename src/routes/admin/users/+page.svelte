<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { breadcrumb } from '$lib/stores';
	import { Jumper } from 'svelte-loading-spinners';
	import { ChevronLeft, ChevronRight, Trash2 } from 'svelte-lucide';
	import { success } from '$lib/components/toast.js';
	import { calculateRedirectToTablePage } from '$lib/client/redirect.js';
	breadcrumb.set([{ label: 'لوحة التحكم' }, { label: 'المستخدمين', href: '/admin/users' }]);

	export let data;
	const mapper = {
		ADMIN: 'رئيس قسم',
		TEACHER: 'استاذ',
		STUDENT: 'طالب'
	};
</script>

<section aria-label="main content" class="flex min-h-0 flex-auto flex-col border-l">
	<table>
		<thead>
			<tr>
				<th> اسم المستخدم </th>
				<th>الدور</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#await data.streamed.users}
				<div class="flex justify-center">
					<Jumper size="60" color="#00ff2a" unit="px" duration="1s" />
				</div>
			{:then users}
				{#each users as user (user.id)}
					<tr>
						<td>{user.username}</td>
						<td>
							<span
								class="rounded-md p-1 text-white"
								class:bg-green-500={user.role === 'ADMIN'}
								class:bg-blue-500={user.role === 'TEACHER'}
								class:bg-pink-500={user.role === 'STUDENT'}
							>
								{mapper[user.role]}
							</span>
						</td>
						<td>
							<form
								action={`?/delete&id=${user.id}${calculateRedirectToTablePage()}`}
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
