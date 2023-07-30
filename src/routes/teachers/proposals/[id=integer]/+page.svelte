<script lang="ts">
	import editor, { editorData } from '$lib/editor.js';
	import { breadcrumb } from '$lib/stores/index.js';
	import { PlusCircle } from 'svelte-lucide';
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Select from 'svelte-select';
	import Input from '$lib/components/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	// @ts-ignore
	editorData.set(JSON.parse(data.proposal.text ?? ''));
	breadcrumb.set([
		{ label: 'ادارة المشاريع' },
		{ label: 'مقترحات', href: '/teachers/proposals' },
		{ label: 'عرض' }
	]);
	const dialog = createDialog({ label: 'Add Project' });
</script>

<div class="relative z-10">
	<Transition show={$dialog.expanded}>
		<Transition
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="fixed inset-0 bg-black/25" on:click={dialog.close} />
		</Transition>

		<div class="fixed inset-0 overflow-y-auto">
			<div class="flex min-h-full items-center justify-center p-4 text-center">
				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<form
						class="flex w-full max-w-md transform flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
						use:dialog.modal
						method="post"
					>
						<h3 class="font-bold">تسجيل المشروع</h3>
						<input class="hidden" name="id" type="numric" value={data.proposal.id} required />

						<Input class="input" name="name" required placeholder="اسم المشروع" />
						<Select
							itemId="id"
							label="name"
							items={data.teams}
							name="team"
							required
							class="input"
							placeholder="الفريق"
							hideEmptyState
						/>
						<button class="btn md primary">اضافة</button>
					</form>
				</Transition>
			</div>
		</div>
	</Transition>
</div>

<section class="prose mx-auto basis-full px-2 py-4">
	<button on:click={dialog.open}>
		<PlusCircle class="stroke-purple-500 hover:fill-purple-500 hover:stroke-white" />
	</button>

	<h1 class="text-center">{data.proposal.title}</h1>
	<div use:editor class="prose mx-4 my-8 h-full w-full lg:prose-xl" />
</section>
