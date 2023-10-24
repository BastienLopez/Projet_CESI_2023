import { Code } from '../../../../domain/Code/Code';
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

export class DeletePersonUsecase {
	constructor(private readonly _personRepository: PersonRepository) {}

	async handle(personCommand: PersonCommand) {
		const codePerson = personCommand.code;
		return await this._personRepository.delete(codePerson).then((p) => {
			console.log('person deleted');
			return p;
		});
	}
}
