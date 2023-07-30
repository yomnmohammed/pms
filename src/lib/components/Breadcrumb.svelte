<script lang="ts">
	import { ChevronLeft } from 'svelte-lucide';
	import { breadcrumb } from '../stores';
	$: first = $breadcrumb[0];
</script>

{#if first}
	<ol
		class="flex h-16 min-w-0 flex-none items-center whitespace-nowrap border-t bg-gray-100 px-4"
		aria-label="Breadcrumb"
	>
		<li class="truncate text-sm font-semibold text-gray-800 dark:text-gray-200" aria-current="page">
			{first.label}
		</li>
		{#each $breadcrumb.slice(1) as item}
			<li class="text-sm">
				<a class="flex items-center text-gray-500 hover:text-blue-600" href={item.href}>
					<ChevronLeft
						class="mx-3 h-4 w-4 flex-shrink-0 overflow-visible text-gray-400 dark:text-gray-600"
					/>
					{item.label}
				</a>
			</li>
		{/each}
	</ol>
{/if}
