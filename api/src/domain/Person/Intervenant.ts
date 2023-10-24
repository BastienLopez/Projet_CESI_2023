import { Code } from '../Code/Code';
import { Subject } from '../Session/Subject';
import { PersonRole, PersonType } from '../types';
import { Referer } from './Referer';

export class Intervenant extends Referer {
	constructor(
		code: Code,
		firstName: string,
		lastName: string,
		phone: string,
		intervenantType: PersonType.CONTRACTOR | PersonType.INDEPEDANT
	) {
		super(
			code,
			firstName,
			lastName,
			phone,
			intervenantType,
			PersonRole.INTERVENANT
		);
	}
	addSubjectsAproved(subject: Subject): void {
		this._subjectsAproved.push(subject);
	}

	revokeSubjectsAproved(ref: string): void {
		this._subjectsAproved = this._subjectsAproved.filter(
			(subject) => subject.ref() !== ref
		);
	}

	getSubjectsAproved(): Subject[] {
		return this._subjectsAproved;
	}
}
