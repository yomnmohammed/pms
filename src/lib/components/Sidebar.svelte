<script lang="ts">
	import { page } from '$app/stores';

	let open = false;
	type SideItem = {
		label: string;
		href: string;
		icon: ConstructorOfATypedSvelteComponent;
	};
	export let groups: SideItem[][];
	function toggle() {
		open = !open;
	}
	export let selected: (item: SideItem) => boolean = (item) => $page.url.pathname === item.href;
</script>

<aside
	class="flex min-h-screen w-16 flex-none flex-col items-center overflow-hidden rounded bg-gray-100 text-gray-700"
	class:w-40={open}
	on:mouseenter={toggle}
	on:mouseleave={toggle}
>
	<a class="mt-3 flex items-center justify-center" class:px-3={open} href="/">
		<h1 class="text-lg font-semibold">PMS</h1>
	</a>
	{#each groups as items}
		<nav class="mt-3 flex flex-col items-center border-t border-gray-300" class:w-full={open}>
			{#each items as item}
				<a
					class="mt-2 flex h-12 items-center rounded hover:bg-gray-300"
					class:justify-center={!open}
					class:w-12={!open}
					class:w-full={open}
					class:px-3={open}
					href={item.href}
					class:bg-gray-300={selected(item)}
				>
					<svelte:component this={item.icon} class="h-6 w-6 stroke-current" />
					<span class="ml-2 text-sm font-medium" class:hidden={!open}>{item.label}</span>
				</a>
			{/each}
		</nav>
	{/each}
</aside>
