<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { Home } from 'svelte-lucide';
	import type { TopbarItem } from '$lib/components/Topbar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	let groups = [[{ href: '/admin', icon: Home, label: 'الرئيسية' }]];
	const topbarItems: TopbarItem[] = [
		{ separator: true, label: 'جديد' },
		{ label: 'مستخدمين', href: '/admin/users/new' },
		{ label: 'اساتذة', href: '/admin/teachers/new' },
		{ label: 'طلاب', href: '/admin/students/new' },
		{ label: 'مقترحات', href: '/admin/proposals/new' },
		{ label: 'فرق', href: '/admin/teams/new' },
		{ separator: true, label: 'عرض' },
		{ label: 'مستخدمين', href: '/admin/users' },
		{ label: 'اساتذة', href: '/admin/teachers' },
		{ label: 'طلاب', href: '/admin/students' },
		{ label: 'مقترحات', href: '/admin/proposals' },
		{ label: 'فرق', href: '/admin/teams' }
	];
</script>

<div class="flex w-full overflow-hidden bg-white text-gray-800 antialiased">
	<Sidebar {groups} />
	<div class="flex flex-1 flex-col">
		<Topbar items={topbarItems} />
		<Breadcrumb />
		<main class="flex min-h-0 flex-grow border-t">
			<slot />
		</main>
	</div>
</div>
