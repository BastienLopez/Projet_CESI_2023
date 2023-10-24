import { Code } from '../../../domain/Code/Code';
import { Person } from '../../../domain/Person/Person';
import { PersonRepository } from '../../person.repository';

export class RetrievePersonUseCase {
	constructor(private readonly _queryRepository: PersonRepository) {}

	async handle(personCode: Code): Promise<Person> {
		return await this._queryRepository.findByCode(personCode);
	}
}
