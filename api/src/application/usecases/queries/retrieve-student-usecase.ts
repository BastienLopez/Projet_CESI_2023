import { QueryStudentRepository } from '../../student.repository';
import { Code } from '../../../domain/Code/Code';


export type StudentPresenter = {
	code: Code;
	firstName: string;
	lastName: string;
};

export class RetrieveStudentUsecase {
	constructor(private readonly _queryRepository: QueryStudentRepository) {}

	async handle() {
		return await this._queryRepository.getAllStudent();
	}
}
