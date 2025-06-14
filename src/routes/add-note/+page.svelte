<script lang="ts">
	import { goto } from '$app/navigation';
	import { Anchor, TopNav, NoteForm } from '$lib';
	import { CreateNoteSchema } from '../../app/note.model';
	import { createNote } from '../../app/note.data';

	let title = '';
	let content = '';

	function handleSubmit() {
		const validNote = CreateNoteSchema.from({
			title,
			content
		});

		if (!validNote.ok) {
			console.error(validNote.error);
			alert(validNote.error);
			return;
		}

		const note = createNote(validNote.value.title, validNote.value.content);

		goto('/');
	}
</script>

<TopNav title="e~notes:add">
	<Anchor slot="action" href="/">← home</Anchor>
</TopNav>

<NoteForm bind:title bind:content onSubmit={handleSubmit} buttonLabel="save note" />
