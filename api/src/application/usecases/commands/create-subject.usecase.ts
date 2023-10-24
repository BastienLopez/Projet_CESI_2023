import { Subject } from '../../../domain/Session/Subject';
import { Level } from '../../../domain/types';
import { SubjectRepository } from '../../subject.repository';

export type SubjectInfoCommand = {
	ref: string;
	name: string;
	level: Level;
};
export class CreateSubjectUsecase {
	constructor(
		private readonly _subjectRepository: SubjectRepository
	) {}

	async handle(subjectInfoCommand: SubjectInfoCommand) {
		const intervenant = new Subject(
			subjectInfoCommand.ref,
			subjectInfoCommand.name,
			subjectInfoCommand.level
		);

		await this._subjectRepository.save(intervenant);
	}
}
