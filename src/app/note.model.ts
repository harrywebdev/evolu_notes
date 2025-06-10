import { NonEmptyTrimmedString1000, NonEmptyTrimmedString100, id, object } from '@evolu/common';

export const NoteId = id('NoteId');
export type NoteId = typeof NoteId.Type;

export const NoteContent = NonEmptyTrimmedString1000;
export type NoteContent = typeof NoteContent.Type;

export const NoteTitle = NonEmptyTrimmedString100;
export type NoteTitle = typeof NoteTitle.Type;

export const CreateNoteSchema = object({
	title: NoteTitle,
	content: NoteContent
});

export const NoteSchema = {
	id: NoteId,
	title: NoteTitle,
	content: NoteContent
};
export const Note = object(NoteSchema);
export type Note = typeof Note.Type;
