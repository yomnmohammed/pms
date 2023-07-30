/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'text-lg',
		'text-md',
		'text-sm',
		'text-xs',
		'not-prose',
		{ pattern: /ml-(2|4|6|8|10|12)/ }
	],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
