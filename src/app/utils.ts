import type { DateIsoString } from '@evolu/common';

export const formatDate = (date: Date, withTime = false) => {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: withTime ? '2-digit' : undefined,
		minute: withTime ? '2-digit' : undefined
	});
};

export const formatDateIso = (date: DateIsoString, withTime = false) =>
	formatDate(new Date(date), withTime);
