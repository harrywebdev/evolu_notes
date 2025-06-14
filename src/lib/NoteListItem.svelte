<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteNote } from '../app/note.data';
	import type { Note } from '../app/note.model';
	import { formatDateIso } from '../app/utils';

	interface NoteListItemProps {
		note: Pick<Note, 'id' | 'title' | 'createdAt'>;
	}

	let { note }: NoteListItemProps = $props();

	function handleDelete() {
		if (confirm('Are you sure you want to delete this note?')) {
			deleteNote(note.id);
		}
	}
</script>

<div class="rounded-md border border-gray-300 bg-white pr-4 shadow-xs">
	<div class="flex items-center justify-between gap-4">
		<a
			class="my-2 ml-2 flex-1 cursor-pointer rounded-md py-2 pl-2 transition-colors select-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			href={`/view-note/${note.id}`}
		>
			<h2 class="text-lg font-medium">{note.title}</h2>
			<p class="text-sm text-gray-500">{formatDateIso(note.createdAt, true)}</p>
		</a>

		<select
			class="rounded-md border-0 bg-gray-200 bg-none px-2 py-1 pl-2 text-center text-sm text-gray-500 transition-colors [text-align-last:center] focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
			data-test-id="action:note-item-actions"
			onchange={(ev) => {
				switch (ev.currentTarget.value) {
					case 'edit':
						goto(`/edit-note/${note.id}`);
						break;

					case 'delete':
						handleDelete();
						break;

					case 'action':
					default:
						break;
				}

				ev.currentTarget.value = 'action';
			}}
		>
			<option value="action">action</option>
			<option value="edit">✎ edit</option>
			<option value="delete">⊗ delete</option>
		</select>
	</div>
</div>
