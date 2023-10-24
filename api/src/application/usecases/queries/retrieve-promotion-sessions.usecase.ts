import { Code } from '../../../domain/Code/Code';
import { QuerySessionRepository } from '../../session.repository';

export type PromotionSessionsPresenter = {
    code: Code;
    name: string;
    startDate: Date;
    endDate: Date;
    refererName: string | null; 
    rooms: string,
    status: string;
    subject: string;
    comment: string;
};

export class RetrievePromotionSessionsUsecase {
	constructor(
		private readonly _queryRepository: QuerySessionRepository
	) {}

	async handle(promotionCode: Code) {
        return await this._queryRepository.viewsByPromotionCode(promotionCode);
    }
}
