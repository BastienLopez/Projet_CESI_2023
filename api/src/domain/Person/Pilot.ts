import { Code } from '../Code/Code';
import { PersonRole, PersonType } from '../types';
import { Referer } from './Referer';

export class Pilot extends Referer {
	constructor(code: Code, firstName: string, lastName: string, phone: string) {
		super(
			code,
			firstName,
			lastName,
			phone,
			PersonType.INTERNAL,
			PersonRole.PILOT
		);
	}
}
