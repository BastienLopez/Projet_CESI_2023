import { UUID } from '../../../domain/types';
import { SessionRepository } from '../../session.repository';
import { Code } from '../../../domain/Code/Code';
import { IntervenantRepository } from '../../intervenant.repository';
import { Notifier } from '../../notifier.provider';

export type ProposeRefererCommand = {
	refererCode: Code;
    sessionId: UUID;
};

export class ProposeRefererToSessionUsecase {
	constructor(
		private readonly _sessionRepository: SessionRepository,
		private readonly _intervenantRepository: IntervenantRepository,
		private readonly _notifier: Notifier
	) {}

	async handle(command: ProposeRefererCommand) {
		const s = await this._sessionRepository.getSession(command.sessionId);
		if (s === null) {
			throw new Error('Session not found');
		}

		const referer = await this._intervenantRepository.findByCode(
			command.refererCode
		);
		if (referer === null) {
			throw new Error('Referer not found');
		}

		s.proposeReferer(referer);

		await this._sessionRepository.updateSession(s);

		this._notifier.notify(
			[referer.email()],
			'New Session',
			'You have been proposed as referer for a session'
		);
	}
}
