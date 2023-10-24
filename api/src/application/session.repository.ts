import { Code } from '../domain/Code/Code';
import { Session } from '../domain/Session/Session';
import { UUID } from '../domain/types';
import { PromotionSessionsPresenter } from './usecases/queries/retrieve-promotion-sessions.usecase';

export interface SessionRepository {
	createSession(session: Session): Promise<void>;
	initSessions(sessions: Session[]): Promise<void>;
	getSession(sessionId: UUID): Promise<Session | null>;
	updateSession(session: Session): Promise<void>;
	deleteSession(sessionId: UUID): Promise<void>;
	getSessionByPromotionCode(promotionCode: Code): Promise<Session[]>;
}

export interface QuerySessionRepository {
	viewsByPromotionCode(
		promotionCode: Code
	): Promise<PromotionSessionsPresenter[]>;
}
