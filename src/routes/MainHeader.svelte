<script lang="ts">
	import { onMount } from 'svelte';
	let watcher: HTMLDivElement;
	let isIntersecting: boolean;
	import { createMenu } from 'svelte-headlessui';
	import { ChevronDown, LogOut, User } from 'svelte-lucide';
	import Transition from 'svelte-transition';
	// intersection for header to be sticky
	const menu = createMenu({ label: 'user-drop-down' });
	onMount(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			isIntersecting = entries[0].isIntersecting;
		});

		intersectionObserver.observe(watcher);
	});
	export let user: { userId: string; username: string };
	const groups = [[{ text: 'تسجيل الخروج', href: '/logout', icon: LogOut }]];
</script>

<div bind:this={watcher} />
<header
	class:intersected={!isIntersecting}
	class="left-0 top-0 z-10 flex w-full items-center justify-between px-4 py-2"
>
	<h1 class="text-lg font-semibold">PMS</h1>

	<nav class="text-md m-auto font-bold">
		<ul
			class="fixed left-0 top-0 hidden min-h-full w-[80%] flex-col items-center justify-center gap-4 md:relative md:flex md:h-auto md:w-auto md:flex-row"
		>
			<li>
				<a href="/">About</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/playground">playground</a>
			</li>
		</ul>
	</nav>
	{#if !user}
		<a class="btn primary md" href="/login">تسجيل الدخول</a>
	{:else}
		<div class="z-10 flex flex-col items-center justify-center">
			<div class="relative text-right">
				<div class="relative inline-block text-left">
					<button use:menu.button class="btn sm black w-full rounded-full">
						<User class="h-5 w-5" />
					</button>
					<Transition
						show={$menu.expanded}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<div
							use:menu.items
							class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							{#each groups as group}
								<div class="px-1 py-1">
									{#each group as option}
										{@const active = $menu.active === option.text}
										<a
											href={option.href}
											use:menu.item
											class="group flex w-full items-center rounded-md px-2 py-2 text-sm {active
												? 'bg-gray-500 text-white'
												: 'text-gray-900'}"
										>
											{option.text}
										</a>
									{/each}
								</div>
							{/each}
						</div>
					</Transition>
				</div>
			</div>
		</div>
	{/if}
</header>

<style lang="postcss">
	.intersected {
		@apply sticky bg-white bg-opacity-20 shadow-md backdrop-blur;
	}
</style>
