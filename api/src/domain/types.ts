import validator from 'validator';

export type UUID = string;
export type Date = string;
export type Alias = string;
export type CodeCesi = string;

export type StaffType = 'pilot' | 'intervenat' | 'admin';
export enum RoomType {
	Fablab,
	Box,
	MeetingRoom,
	NumeriLab,
	Amphiteatre,
	ConvetionalRoom,
	InformaticRoom,
}
export enum CodeType {
	PROMOTION,
	PERSON,
	SECTOR,
}

export enum PersonType {
	INTERNAL,
	CONTRACTOR,
	INDEPEDANT,
}

export enum PersonRole {
	PILOT,
	INTERVENANT,
	ADMINISTRATOR,
	STUDENT,
	HEIMDALL,
}

export enum Level {
	RAN,
	LVL5,
	LVL6,
	LVL7,
}

export enum SessionStatus {
	PENDING,
	PROPOSED,
	ACCEPTED,
	REFUSED,
	CANCELLED,
	CONFIRMED,
	FINISHED,
}

export enum ConventionStatus {
	NOT_SEND,
	SEND,
	RETURNED,
}

export enum StatusReferer {
	NOT_CONTACTED,
	CONTACTED,
	ACCEPTED,
}

export const codeValidator = (code: CodeCesi): boolean => {
	return code.length === 7;
};

export function stringValidator(stringToValidate: string, stringName: string) {
	if (
		stringToValidate === undefined ||
		stringToValidate === null ||
		stringToValidate === null
	) {
		throw new Error('Staff ' + stringName + ' must be defined');
	} else if (!validator.isAlpha(stringToValidate)) {
		throw new Error('Staff ' + stringName + ' must be a valid name');
	}
}
