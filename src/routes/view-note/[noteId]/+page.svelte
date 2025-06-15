<script lang="ts">
	import { Anchor, TopNav } from '$lib';
	import { queryState } from '@evolu/svelte';
	import { page } from '$app/state';
	import { marked } from 'marked';
	import { evolu } from '../../../app/evolu';
	import { queryNoteById } from '../../../app/note.data';
	import { NoteId } from '../../../app/note.model';
	import { goto } from '$app/navigation';
	import { getOrThrow } from '@evolu/common';
	import { LoadingIndicator } from '$lib';

	// TODO: refactor into guard, maybe organize the notes better for colocation
	const noteIdParam = NoteId.from(page.params.noteId);

	if (!noteIdParam.ok) {
		// TODO: 404
		goto('/');
	}

	const noteId = getOrThrow(noteIdParam);

	const noteState = queryState(evolu, () => queryNoteById(noteId));
	const note = $derived(noteState.rows?.[0]);
</script>

<TopNav title="e~notes:view">
	<Anchor slot="action" href="/">← home</Anchor>
</TopNav>

{#if note}
	<div class="prose max-w-none">
		<h1>{note.title ? note.title : 'note without name'}</h1>
		{@html marked(note.content ?? '')}
	</div>
{:else}
	<LoadingIndicator />
{/if}
