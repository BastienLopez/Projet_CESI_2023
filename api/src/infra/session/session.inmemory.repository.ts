import { SessionRepository } from '../../application/session.repository';
import { PromotionSessionsPresenter } from '../../application/usecases/queries/retrieve-promotion-sessions.usecase';
import { Code } from '../../domain/Code/Code';
import { Session } from '../../domain/Session/Session';
import { UUID } from '../../domain/types';

export class SessionInmemoryRepository implements SessionRepository {
	constructor(private readonly _sessions: Session[] = []) {}

	getSessionByPromotionCode(promotionCode: Code): Promise<Session[]> {
		return Promise.resolve(
			this._sessions.filter((s) => s.promo().code() === promotionCode)
		);
	}

	initSessions(sessions: Session[]): Promise<void> {
		this._sessions.push(...sessions);
		return Promise.resolve();
	}

	createSession(session: Session): Promise<void> {
		this._sessions.push(session);
		return Promise.resolve();
	}

	getSession(sessionId: UUID): Promise<Session | null> {
		return Promise.resolve(
			this._sessions.find((session) => session.id() === sessionId) || null
		);
	}

	updateSession(session: Session): Promise<void> {
		const index = this._sessions.findIndex((s) => s.id() === session.id());
		if (index === -1) {
			throw new Error('Session not found');
		}
		this._sessions[index] = session;
		return Promise.resolve();
	}

	deleteSession(sessionId: UUID): Promise<void> {
		const index = this._sessions.findIndex((s) => s.id() === sessionId);
		if (index === -1) {
			throw new Error('Session not found');
		}
		this._sessions.splice(index, 1);
		return Promise.resolve();
	}

	viewsByPromotionCode(
		promotionCode: Code
	): Promise<PromotionSessionsPresenter[]> {

		const sessions = this._sessions.filter(
			(s) => s.promo().code() === promotionCode
		);

		const queries: PromotionSessionsPresenter[] = sessions.map((s) => ({
			code: s.promo().code(),
			name: s.promo().alias(),
			startDate: s.startDate(),
			endDate: s.endDate(),
			refererName: null,
			rooms: s.rooms().join(', '),
			status: "s.sessionStatus().toString()",
			subject: "s.subject()",
			comment: s.comment(),
		}));
		
		return Promise.resolve(queries);
	}
}
