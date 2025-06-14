import { evolu } from './evolu';
import { NoteTitle, NoteContent, NoteId } from './note.model';
import type { kysely } from '@evolu/common';

export const queryNotes = evolu.createQuery(
	(db) =>
		db
			.selectFrom('note')
			.select(['id', 'title', 'createdAt'])
			.where('isDeleted', 'is not', 1)
			// Filter null value and ensure non-null type.
			.where('title', 'is not', null)
			.$narrowType<{ title: kysely.NotNull }>()
			.orderBy('createdAt', 'desc'),
	{
		// logQueryExecutionTime: true,
		// logExplainQueryPlan: true,
	}
);

export const queryNoteById = (noteId: NoteId) =>
	evolu.createQuery((db) =>
		db
			.selectFrom('note')
			.select(['id', 'title', 'content', 'createdAt'])
			.where('id', '=', noteId)
			.where('isDeleted', 'is not', 1)
			.limit(1)
	);

export const createNote = (title: NoteTitle, content: NoteContent) =>
	insert('note', {
		title,
		content
	});

export const deleteNote = (id: NoteId) => update('note', { id, isDeleted: true });

const { insert, update } = evolu;
