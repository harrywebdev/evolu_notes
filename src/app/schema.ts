import { type EvoluSchema } from '@evolu/common';
import { NoteSchema } from './note.model';

const DatabaseSchema = {
	note: NoteSchema
} satisfies EvoluSchema;

export default DatabaseSchema;

export type DatabaseSchema = typeof DatabaseSchema;
