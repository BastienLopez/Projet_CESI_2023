import { Code } from '../../../domain/Code/Code';
import { IntervenantRepository } from '../../intervenant.repository';

export type PromotionIntervenantPresenter = {
	code: Code;
	firstName: string;
	lastName: string;
	phone: string;
};

export class RetrieveIntervenantUseCase {
	constructor(private readonly _queryRepository: IntervenantRepository) {}

	async handle(IntervenantCode: Code) {
		return await this._queryRepository.findByCode(IntervenantCode);
	}
}
