import { Code } from '../Code/Code';
import { Person } from './Person';
import { PersonRole, PersonType } from '../types';
import { Subject } from '../Session/Subject';

export abstract class Referer extends Person {
	protected _subjectsAproved: Subject[] = [];
	constructor(
		code: Code,
		firstName: string,
		lastName: string,
		phone: string,
		personType: PersonType,
		personRole: PersonRole = PersonRole.INTERVENANT | PersonRole.PILOT
	) {
		super(code, firstName, lastName, personType, personRole, phone);
	}

	addSubjectsAproved(subject: Subject): void {
		this._subjectsAproved.push(subject);
	}

	revokeSubjectsAproved(ref: string): void {
		this._subjectsAproved = this._subjectsAproved.filter(
			(subject) => subject.ref() !== ref
		);
	}

	public subjectsAproved(): Subject[] {
		return this._subjectsAproved;
	}
}
