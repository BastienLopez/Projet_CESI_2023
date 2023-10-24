import { Code } from '../domain/Code/Code';
import { Person } from '../domain/Person/Person';
import { PersonDTO } from '../domain/Person/PersonDTO';
import { PersonModel } from '../infra/person/person.sequelize.repository';

export interface PersonRepository {
	save(intervenent: Person): Promise<PersonModel>;
	update(intervenent: Person): Promise<void>;
	delete(code: Code): Promise<void>;
	findByCode(code: Code): Promise<Person | null>;
	getAllPersons(
		page: number,
		nbPerPage: number,
		name: string
	): Promise<PersonDTO>;
	getPersonsByPromotion(promotion: string): Promise<PersonDTO>;
	getFilteredPeople(
		page: number,
		role: string,
		nbPerPage: number,
		name: string
	): Promise<PersonDTO>;
	getPersonsByRoleAndPromotion(
		role: string,
		promotion: string,
		name: string
	): Promise<Person[]>;
}
