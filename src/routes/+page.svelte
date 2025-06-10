<script>
	import { Anchor } from '$lib';
	import { notes } from '../app/note.data';
	import { queryState } from '@evolu/svelte';
	import { evolu } from '../app/evolu';
	import { formatDateIso } from '../app/utils';

	const allNotes = queryState(evolu, () => notes);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-medium pl-1">evolu_notes:list</h1>

		<Anchor href="/add-note" testId="action:add-note">&plus; add</Anchor>
	</div>

	<div class="space-y-4">
		{#each allNotes.rows as note}
			<div class="rounded-md border border-gray-300 bg-white p-4 shadow-xs">
				<h2 class="text-lg font-medium">{note.title}</h2>
				<p class="text-sm text-gray-500">{formatDateIso(note.createdAt, true)}</p>
			</div>
		{/each}
	</div>
</div>
