<script lang="ts">
	import { breadcrumb } from '$lib/stores';
	import { Jumper } from 'svelte-loading-spinners';

	breadcrumb.set([{ label: 'ادارة المشاريع' }, { label: 'المشاريع', href: '/teachers/projects' }]);
	export let data;
</script>

<div class="grid grid-cols-1 gap-5 p-2 sm:gap-10 md:grid-cols-3">
	{#await data.streamed.projects}
		<div class="flex justify-center">
			<Jumper size="60" color="#00ff2a" unit="px" duration="1s" />
		</div>
	{:then projects}
		{#each projects as project (project.id)}
			<div
				class="h-64 gap-5 rounded-xl bg-white p-8 shadow-xl shadow-black/5 sm:p-10"
				class:green={project.status === 'COMPLETED'}
				class:orange={project.status === 'PROGRESS'}
				class:red={project.status === 'CANCELED'}
				class:natural={project.status === 'PENDING'}
			>
				<div class="justify-left flex h-full w-full text-white/90 sm:justify-between">
					<div class="flex h-full flex-col justify-between">
						<h2 class="font-heading text-2xl font-black transition lg:text-3xl">
							<a class="group block" href={`/teachers/proposals/${project.id}`}>{project.name}</a>
						</h2>
						<div class=" flex w-full flex-col items-center justify-between">
							<a
								class="group mt-4 inline-block gap-2 bg-white px-4 py-2 font-medium text-black transition hover:brightness-110"
								href={`/teachers/projects/${project.id}`}
								>الاطلاع على المشروع<span aria-hidden="true" class=" transition">←</span></a
							>
							<a
								class="group mt-4 inline-block gap-2 bg-white px-4 py-2 font-medium text-black transition hover:brightness-110"
								href={`/teachers/proposals/${project.propsal_id}`}
								>الاطلاع على المقترح<span aria-hidden="true" class=" transition">←</span></a
							>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:catch error}
		<span class="text-red-500"> اسف حدث خطأ غير متوقع. </span>
	{/await}
</div>

<style lang="postcss">
	.green {
		@apply bg-green-400/80;
	}
	.orange {
		@apply bg-yellow-400/80;
	}
	.red {
		@apply bg-red-400/80;
	}
	.natural {
		@apply bg-slate-400/80;
	}
</style>
