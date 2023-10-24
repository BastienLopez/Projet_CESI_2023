import { UUID } from '../../../domain/types';
import { SessionRepository } from '../../session.repository';
import { PromotionRepository } from '../../promotion.repository';
import { Session } from '../../../domain/Session/Session';
import { Code } from '../../../domain/Code/Code';

export type InitPromotionSessionsCommand = {
	promotionCode: Code;
	sessions: SessionCommand[];
};

type SessionCommand = {
	id: UUID;
	startDate: Date;
	endDate: Date;
};

export class InitPromotionSessionsUsecase {
	constructor(
		private readonly _sessionRepository: SessionRepository,
		private readonly _promotionRepository: PromotionRepository
	) {}

	async handle(command: InitPromotionSessionsCommand) {
		const promo = await this._promotionRepository.findByCode(
			command.promotionCode
		);
		if (promo === null) {
			throw new Error('Promotion not found');
		}

		const hasSessions = await this._sessionRepository.getSessionByPromotionCode(command.promotionCode);
		if (hasSessions.length > 0) {
			throw new Error('Sessions already initialized');
		}

		const sessions: Session[] = [];
		command.sessions.forEach((session) => {
			sessions.push(
				new Session(session.id, session.startDate, session.endDate, promo)
			);
		});

		await this._sessionRepository.initSessions(sessions);
	}
}
