import { Code } from '../../../domain/Code/Code';
import { StudentRepository } from '../../student.repository';

export type StudentInfoCommand = {
	studentCode: Code;
	firstName: string;
	lastName: string;
	phone: string;
};

export class InfoStudentUsecase {
	constructor(private readonly _studentRepository: StudentRepository) {}

	async handle(command: StudentInfoCommand) {
		const student = await this._studentRepository.findByCode(
			command.studentCode
		);
		if (!student) {
			throw new Error('Student not found');
		}

        student.updateNames(command.firstName, command.lastName);
		student.updatePhone(command.phone);

		await this._studentRepository.update(student);
	}
}
