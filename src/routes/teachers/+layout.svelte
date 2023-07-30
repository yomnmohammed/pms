<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { Home } from 'svelte-lucide';
	import type { TopbarItem } from '$lib/components/Topbar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	let groups = [[{ href: '/teachers', icon: Home, label: 'الرئيسية' }]];
	const topbarItems: TopbarItem[] = [
		{ separator: true, label: 'جديد' },
		{ label: 'مقترحات', href: '/teachers/proposals/new' },
		{ separator: true, label: 'عرض' },
		{ label: 'مقترحات', href: '/teachers/proposals' },
		{ label: 'فرق', href: '/admin/teams' }
	];
</script>

<div class="flex h-full w-full overflow-hidden bg-white text-gray-800 antialiased">
	<Sidebar {groups} />
	<div class="flex flex-1 flex-col">
		<Topbar items={topbarItems} />
		<Breadcrumb />
		<main class="flex min-h-0 flex-grow border-t bg-gray-50">
			<slot />
		</main>
	</div>
</div>
