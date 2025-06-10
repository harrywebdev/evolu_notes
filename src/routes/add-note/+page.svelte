<script>
	import { goto } from '$app/navigation';
	import { Anchor, Input, Textarea, Button } from '$lib';
	import { CreateNoteSchema } from '../../app/note.model';
	import { createNewNote } from '../../app/note.data';

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

		const note = createNewNote(validNote.value.title, validNote.value.content);
		console.log({ note });

		goto('/');
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-medium">evolu_notes:add</h1>
		<Anchor href="/">← to list</Anchor>
	</div>

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<Input id="title" label="title" bind:value={title} placeholder="enter note title..." required />

		<Textarea
			id="content"
			label="content"
			bind:value={content}
			placeholder="write your note in markdown..."
			rows={12}
			required
		/>

		<div class="flex gap-3">
			<Button type="submit" variant="primary">Save Note</Button>
		</div>
	</form>
</div>
