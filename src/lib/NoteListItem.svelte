<script lang="ts">
	import type { Note } from '../app/note.model';
	import { formatDateIso } from '../app/utils';
	import Anchor from './Anchor.svelte';

	interface NoteListItemProps {
		note: Pick<Note, 'id' | 'title' | 'createdAt'>;
	}

	let { note }: NoteListItemProps = $props();
</script>

<div class="rounded-md border border-gray-300 bg-white p-4 shadow-xs">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-lg font-medium">{note.title}</h2>
			<p class="text-sm text-gray-500">{formatDateIso(note.createdAt, true)}</p>
		</div>

		<Anchor href="/edit-note/{note.id}" testId="action:edit-note">edit</Anchor>
	</div>
</div>
