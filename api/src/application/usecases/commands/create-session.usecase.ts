import { UUID } from '../../../domain/types';
import { SessionRepository } from '../../session.repository';
import { Session } from '../../../domain/Session/Session';
import { Code } from '../../../domain/Code/Code';
import { PromotionRepository } from '../../promotion.repository';

export type NewSessionCommand = {
	id: UUID;
	startDate: Date;
	endDate: Date;
	promotionCode: Code;
};

export class CreateSessionUsecase {
	constructor(
		private readonly _sessionRepository: SessionRepository,
		private readonly _promotionRepository: PromotionRepository
	) {}

	async handle(command: NewSessionCommand) {
        const promo = await this._promotionRepository.findByCode(command.promotionCode);
        if (promo === null) {
            throw new Error('Promotion not found');
        }

		const s = new Session(command.id, command.startDate, command.endDate, promo);
		await this._sessionRepository.createSession(s);
	}
}
