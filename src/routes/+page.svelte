<script lang="ts">
	import { Anchor } from '$lib';
	import { queryNotes } from '../app/note.data';
	import { queryState } from '@evolu/svelte';
	import { evolu } from '../app/evolu';
	import { formatDateIso } from '../app/utils';
	import { TopNav } from '$lib';

	const allNotes = queryState(evolu, () => queryNotes);
</script>

<TopNav title="e~notes:list">
	<Anchor slot="action" href="/add-note" testId="action:add-note">&plus; add</Anchor>
</TopNav>

<div class="space-y-3">
	{#each allNotes.rows as note}
		<div class="rounded-md border border-gray-300 bg-white p-4 shadow-xs">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-medium">{note.title}</h2>
					<p class="text-sm text-gray-500">{formatDateIso(note.createdAt, true)}</p>
				</div>
				<Anchor href="/edit-note/{note.id}" testId="action:edit-note">edit</Anchor>
			</div>
		</div>
	{/each}
</div>
