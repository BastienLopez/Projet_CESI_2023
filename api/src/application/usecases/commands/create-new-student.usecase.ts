import { Code } from '../../../domain/Code/Code';
import { Student } from '../../../domain/Person/Student';
import { Notifier } from '../../notifier.provider';
import { StudentRepository } from '../../student.repository';

export type StudentInfoCommand = {
	code: Code;
	firstName: string;
	lastName: string;
};
export class CreateStudentUsecase {
	constructor(
		private readonly _studentRepository: StudentRepository,
		private readonly _notifier: Notifier
	) {}

	async handle(studentInfoCommand: StudentInfoCommand) {
		const intervenant = new Student(
			studentInfoCommand.code,
			studentInfoCommand.firstName,
			studentInfoCommand.lastName
		);

		await this._studentRepository.save(intervenant);
		await this._notifier.notify(
			[intervenant.email()],
			'Welcome',
			'Welcome to our platform'
		);
	}
}
