import bcrypt from 'bcrypt';
import { Code } from '../../../../domain/Code/Code';
import { Person } from '../../../../domain/Person/Person';
import { PersonRole, PersonType } from '../../../../domain/types';
import { PersonRepository } from '../../../person.repository';

export type PersonCommand = {
	code: Code;
	firstName: string;
	lastName: string;
	personType: PersonType;
	personRole: PersonRole;
	phone: string | null;
	password: string | null;
};

export class CreatePersonUsecase {
	constructor(private readonly _personRepository: PersonRepository) {}

	async handle(personCommand: PersonCommand) {
		const person = new Person(
			personCommand.code,
			personCommand.firstName,
			personCommand.lastName,
			personCommand.personType,
			personCommand.personRole,
			personCommand.phone,
			bcrypt.hashSync(personCommand.password, 10)
		);
		return await this._personRepository.save(person).then((p) => {
			console.log('person created');
			return p;
		});
	}
}
