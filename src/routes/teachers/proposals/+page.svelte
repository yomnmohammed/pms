<script lang="ts">
	import { breadcrumb } from '$lib/stores/index.js';
	import { Jumper } from 'svelte-loading-spinners';

	export let data;
	breadcrumb.set([{ label: 'ادارة المشاريع' }, { label: 'مقترحات', href: '/teachers/proposals' }]);
</script>

<div class="grid grid-cols-1 gap-5 p-2 sm:gap-10 md:grid-cols-3">
	{#await data.streamed.proposals}
		<div class="flex justify-center">
			<Jumper size="60" color="#00ff2a" unit="px" duration="1s" />
		</div>
	{:then proposals}
		{#each proposals as proposal (proposal.id)}
			<div class="h-64 gap-5 rounded-xl bg-white p-8 shadow-xl shadow-black/5 sm:p-10">
				<div class="justify-left flex w-full sm:justify-between">
					<div>
						<h2 class="font-heading text-2xl font-black transition lg:text-3xl">
							<a class="group block" href={`/teachers/proposals/${proposal.id}`}>{proposal.title}</a
							>
						</h2>
						<div class="mt-20 flex w-full items-center justify-between space-x-5">
							<a
								class="group mt-4 inline-block gap-2 rounded-full bg-red-500 px-4 py-2 font-medium text-white transition hover:brightness-110"
								href={`/teachers/proposals/${proposal.id}`}
								>الاطلاع على المقترح<span
									aria-hidden="true"
									class="text-white/90 transition group-hover:text-white">←</span
								></a
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
