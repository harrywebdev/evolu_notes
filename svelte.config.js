import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess()],
	kit: { adapter: adapter() },
	extensions: ['.svelte']
};

export default config;
