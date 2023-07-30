<script context="module" lang="ts">
	export type TopbarItem = { label: string; href: string } | { separator: true; label: string };
</script>

<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import { Plus } from 'svelte-lucide';

	const menu = createMenu({ label: 'user-drop-down' });
	import Transition from 'svelte-transition';
	export let items: TopbarItem[];
</script>

<nav aria-label="top bar" class="flex h-16 flex-none justify-between bg-white">
	<ul aria-label="top bar right" class="flex">
		<li class="group relative">
			<button
				use:menu.button
				aria-controls="add"
				aria-expanded="false"
				aria-haspopup="listbox"
				class="flex h-full items-center px-4 text-sm"
			>
				<Plus class="h-4 w-4" />
				<span class="ml-2">اضافة</span>
			</button>
			<span class="absolute z-10 hidden p-1 group-hover:block">
				<Transition
					show={$menu.expanded}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<nav
						class="w-screen max-w-md rounded-md border bg-white py-2 leading-relaxed shadow-lg outline-none focus:outline-none"
						use:menu.items
					>
						{#each items as item}
							{#if 'separator' in item}
								<span class="block px-4 py-3 font-semibold">
									{item.label}
								</span>
								<hr />
							{:else if 'href' in item}
								<a
									class="my-1 inline-block w-full cursor-pointer px-6 py-1 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
									href={item.href}
								>
									{item.label}
								</a>
							{/if}
						{/each}
					</nav>
				</Transition>
			</span>
		</li>
	</ul>
</nav>
