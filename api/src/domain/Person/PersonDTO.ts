import { PersonModel } from '../../infra/person/person.sequelize.repository';

export class PersonDTO {
	private _persons: PersonModel[] = [];
	private _nbMaxPages: number = 1;
	private _page: number = 1;

	persons() {
		return this._persons;
	}
	setPersons(persons: PersonModel[]) {
		this._persons = persons;
	}
	nbMaxPages() {
		return this._nbMaxPages;
	}
	setNbMaxPages(nbm: number) {
		this._nbMaxPages = nbm;
	}
	page() {
		return this._page;
	}
	setPage(page: number) {
		this._page = page;
	}
}
