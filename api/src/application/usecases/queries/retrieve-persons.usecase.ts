import { PersonRepository } from '../../person.repository';

export class RetrievePersonsUseCase {
	constructor(
		private readonly _queryRepository: PersonRepository,
		private readonly _page: number,
		private readonly _nbPerPage: number,
		private readonly _filter: string
	) {}

	async handle() {
		return await this._queryRepository.getAllPersons(
			this._page,
			this._nbPerPage,
			this._filter
		);
	}
}
