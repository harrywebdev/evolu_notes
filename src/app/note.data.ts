import { evolu } from './evolu';
import { NoteTitle, NoteContent } from './note.model';
import type { kysely } from '@evolu/common';

export const notes = evolu.createQuery(
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

const { insert } = evolu;

export const createNewNote = (title: NoteTitle, content: NoteContent) =>
	insert('note', {
		title,
		content
	});
