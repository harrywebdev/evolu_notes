import { createEvolu, getOrThrow } from '@evolu/common';
import { evoluSvelteDeps } from '@evolu/svelte';
import Schema from './schema';
import { SITE_NAME } from './config';

export const evolu = createEvolu(evoluSvelteDeps)(Schema, {
	reloadUrl: '/',
	name: getOrThrow(SITE_NAME)
	// syncUrl: "https://your-sync-url", // optional, defaults to https://free.evoluhq.com
});
