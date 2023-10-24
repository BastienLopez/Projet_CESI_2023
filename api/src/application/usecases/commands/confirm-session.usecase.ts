import { UUID } from '../../../domain/types';
import { Notifier } from '../../notifier.provider';
import { SessionRepository } from '../../session.repository';

export class ConformSessionUsecase {
	constructor(
		private readonly _sessionRepository: SessionRepository,
		private readonly _notifier: Notifier
	) {}

	async handle(sessionId: UUID) {
		const s = await this._sessionRepository.getSession(sessionId);
		if (s === null) {
			throw new Error('Session not found');
		}

		s.confirm();

		await this._sessionRepository.updateSession(s);
		this._notifier.notifySessionConfirmed(s);
	}
} 
