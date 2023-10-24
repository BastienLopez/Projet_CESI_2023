import { Code } from '../../../domain/Code/Code';
import { Subject } from '../../../domain/Session/Subject';
import { Level } from '../../../domain/types';
import { IntervenantRepository } from '../../intervenant.repository';
import { Notifier } from '../../notifier.provider';

export type SubjectAprovedCommand = {
	intervenantCode: Code;
	ref: string;
	name: string;
	level: Level;
};

export class UpdateSubjectIntervenentUsecase {
	constructor(
		private readonly _intervenantRepository: IntervenantRepository,
		private readonly _notifier: Notifier
	) {}

	async handle(command: SubjectAprovedCommand) {
		const intervenant = await this._intervenantRepository.findByCode(
			command.intervenantCode
		);
		if (!intervenant) {
			throw new Error('Intervenant not found');
		}

		const subject = new Subject(command.ref, command.name, command.level);
		intervenant.addSubjectsAproved(subject);

		await this._intervenantRepository.update(intervenant);

		await this._notifier.notify(
			[intervenant.email()],
			'New Subject Aproved',
			'You have a new subject aproved'
		);
	}
}
