import { Code } from '../Code/Code';
import { Person } from './Person';
import { PersonRole, PersonType } from '../types';

export class Administrator extends Person {
	constructor(code: Code, firstName: string, lastName: string) {
		super(
			code,
			firstName,
			lastName,
			PersonType.INTERNAL,
			PersonRole.ADMINISTRATOR,
			null
		);
	}
}
