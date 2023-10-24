import { Code } from "../../../domain/Code/Code";
import { Notifier } from "../../notifier.provider";
import { StudentRepository } from "../../student.repository";

export type StudentCommand = {
  code: Code;
}

export class DeleteStudentUsecase {
  constructor(
		private readonly _studentRepository: StudentRepository,
		private readonly _notifier: Notifier
	) {}

  async handle(studentCommand: StudentCommand) {
    await this._studentRepository.delete(studentCommand.code);

    await this._notifier.notify(
      ["test@gmail.com"],
      'Welcome',
      'Welcome to our platform'
    );
  }
}
