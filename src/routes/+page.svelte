<script lang="ts">
	import Features from './Features.svelte';
	import MainHeader from './MainHeader.svelte';

	import Goals from './Goals.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="m-auto flex flex-col">
	<MainHeader user={data.user} />
	<section class="content relative mt-8 grid place-items-center p-2">
		<div class="background" />
		<div class="text-center leading-relaxed text-black">
			<h1 class="text-2xl font-extrabold">ادارة مشاريع التخرج</h1>
			<p class="text-md mt-4 font-semibold leading-loose">
				يهدف المشروع للاستغناء عن المعاملات الورقية مع تقليل الوقت المستغرق سواء للطالب او الاستاذ.
			</p>
		</div>
	</section>
	<Features />
	<Goals />
</main>

<style lang="postcss">
	.content {
		height: 80vh;
	}
	.content .background {
		@apply absolute inset-0 -z-10 bg-cover blur-md;
		background-image: url('$lib/assets/01.webp');
	}
	@media (max-width: 768px) {
		.content {
			@apply h-screen;
		}
	}
</style>
