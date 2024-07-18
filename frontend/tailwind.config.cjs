/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light',
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#f60000',
					secondary: '#ffffff'
					// primary: '#0042f6',
					// secondary: '#00b0f6'
				}
			}
		]
	},
	darkMode: ['class', '[data-theme="dark"]']
};
