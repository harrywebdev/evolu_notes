<script lang="ts">
	import { Anchor, NoteListItem } from '$lib';
	import { queryNotes } from '../app/note.data';
	import { queryState } from '@evolu/svelte';
	import { evolu } from '../app/evolu';
	import { TopNav } from '$lib';

	const allNotes = queryState(evolu, () => queryNotes);
</script>

<TopNav title="e~notes:list">
	<Anchor slot="action" href="/add-note" testId="action:add-note">&plus; add</Anchor>
</TopNav>

<div class="space-y-3">
	{#each allNotes.rows as note (note.id)}
		<NoteListItem {note}></NoteListItem>
	{/each}
</div>
