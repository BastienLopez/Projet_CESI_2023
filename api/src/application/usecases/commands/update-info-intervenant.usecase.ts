import { Code } from '../../../domain/Code/Code';
import { IntervenantRepository } from '../../intervenant.repository';

export type IntervenantInfoCommand = {
	intervenantCode: Code;
	firstName: string;
	lastName: string;
	phone: string;
};

export class InfoIntervenentUsecase {
	constructor(private readonly _intervenantRepository: IntervenantRepository) {}

	async handle(command: IntervenantInfoCommand) {
		const intervenant = await this._intervenantRepository.findByCode(
			command.intervenantCode
		);
		if (!intervenant) {
			throw new Error('Intervenant not found');
		}

        intervenant.updateNames(command.firstName, command.lastName);
		intervenant.updatePhone(command.phone);

		await this._intervenantRepository.update(intervenant);
	}
}
