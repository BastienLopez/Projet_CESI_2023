import { Sequelize, DataTypes, Model } from 'sequelize';
import { SessionRepository } from '../../application/session.repository';
import { Code } from '../../domain/Code/Code';
import { Session } from '../../domain/Session/Session';
import { PromotionModel } from '../promotion/promotion.sequelize.repository';

class SessionModel extends Model {}

export class SessionSequelizeRepository implements SessionRepository {
	constructor(sequelize: Sequelize) {
		SessionModel.init(
			{
				id: {
					type: DataTypes.UUID,
					primaryKey: true,
					autoIncrement: true,
				},
				startDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				endDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				comment: {
					type: DataTypes.STRING,
				},
				sessionStatus: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				conventionStatus: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				codePromotion: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'Sessions',
			}
		);

		// SessionModel.belongsTo(PromotionSequelizeRepository),
		// SessionModel.belongsTo(Room),
		// SessionModel.belongsTo(Subject),
		// SessionModel.belongsTo(Referer),
		async () => {
			console.log('SessionModel has been initialized');
		};
	}

	static fromSessionDomain(session: Session): SessionModel {
		return new SessionModel({
			id: session.id,
			startDate: session.startDate,
			endDate: session.endDate,
			comment: session.comment,
			sessionStatus: session.sessionStatus,
			conventionStatus: session.conventionStatus,
		});
	}

	async createSession(session: Session): Promise<void> {
		const sm = SessionSequelizeRepository.fromSessionDomain(session);
		await sm.save();
		return Promise.resolve();
	}

	async initSessions(sessions: Session[]): Promise<void> {
		if (sessions.length === 0) {
			return Promise.resolve();
		}

		const sms = sessions.map((s) =>
			SessionSequelizeRepository.fromSessionDomain(s)
		);
		await SessionModel.bulkCreate(sms as any);
		return Promise.resolve();
	}

	getSession(sessionId: string): Promise<Session | null> {
		SessionModel.findOne({
			include: [PromotionModel],
		});
		throw new Error('Method not implemented.');
	}
	updateSession(session: Session): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteSession(sessionId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getSessionByPromotionCode(promotionCode: Code): Promise<Session[]> {
		throw new Error('Method not implemented.');
	}
}
