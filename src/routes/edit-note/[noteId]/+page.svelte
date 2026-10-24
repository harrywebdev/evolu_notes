<script lang="ts">
	import { goto } from '$app/navigation';
	import { Anchor, TopNav, NoteForm, LoadingIndicator } from '$lib';
	import { CreateNoteSchema, NoteId } from '../../../app/note.model';
	import { evolu } from '../../../app/evolu';
	import { page } from '$app/state';
	import { getOrThrow } from '@evolu/common';
	import { queryNoteById } from '../../../app/note.data';
	import { onMount } from 'svelte';

	let isLoading = true;
	let title = '';
	let content = '';

	// TODO: refactor into guard, maybe organize the notes better for colocation
	const noteIdParam = NoteId.from(page.params.noteId);

	if (!noteIdParam.ok) {
		// TODO: 404
		goto('/');
	}

	const noteId = getOrThrow(noteIdParam);

	async function loadNote() {
		isLoading = true;
		const note = await evolu.loadQuery(queryNoteById(noteId));
		if (note[0]) {
			title = note[0].title ?? '';
			content = note[0].content ?? '';
		} else {
			// TODO: 404
			goto('/');
		}
		isLoading = false;
	}

	onMount(loadNote);

	async function handleSubmit() {
		const validNote = CreateNoteSchema.from({
			title,
			content
		});

		if (!validNote.ok) {
			console.error(validNote.error);
			alert(validNote.error);
			return;
		}

		// Update the note
		await evolu.update('note', {
			id: noteId,
			title: validNote.value.title,
			content: validNote.value.content
		});

		goto('/');
	}
</script>

<TopNav title="e~notes:edit">
	<Anchor slot="action" href="/">← home</Anchor>
</TopNav>

{#if isLoading}
	<LoadingIndicator />
{:else}
	<NoteForm bind:content onSubmit={handleSubmit} buttonLabel="update note" />
{/if}
