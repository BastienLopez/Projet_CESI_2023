import { Code } from '../../../domain/Code/Code';
import { Intervenant } from '../../../domain/Person/Intervenant';
import { PersonType } from '../../../domain/types';
import { IntervenantRepository } from '../../intervenant.repository';
import { Notifier } from '../../notifier.provider';

export type IntervenantCommand = {
	code: Code;
	firstName: string;
	lastName: string;
	phone: string;
	intervenantType: PersonType.CONTRACTOR | PersonType.INDEPEDANT;
};

export class CreateIntervenentUsecase {
	constructor(
		private readonly _intervenantRepository: IntervenantRepository,
		private readonly _notifier: Notifier
	) {}

	async handle(intervenantCommand: IntervenantCommand) {
		const intervenant = new Intervenant(
			intervenantCommand.code,
			intervenantCommand.firstName,
			intervenantCommand.lastName,
			intervenantCommand.phone,
			intervenantCommand.intervenantType
		);

		await this._intervenantRepository.save(intervenant);
		await this._notifier.notify(
			[intervenant.email()],
			'Welcome',
			'Welcome to our platform'
		);
	}
}
