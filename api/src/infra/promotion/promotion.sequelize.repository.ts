import { PromotionRepository } from '../../application/promotion.repository';
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Promotion } from '../../domain/Promotion/Promotion';
import { Code } from '../../domain/Code/Code';

export class PromotionModel extends Model {}

export class PromotionSequelizeRepository implements PromotionRepository {
	constructor(sequelize: Sequelize) {
		PromotionModel.init(
			{
				code: {
					type: DataTypes.STRING,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				alias: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				level: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				startDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				endDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'promotion',
			}
		);
		//PromotionModel.hasMany(PersonModel, { foreignKey: 'myFooId' });
		PromotionModel.sync();
	}
	update(_: Promotion): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(_: Code): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findByCode(_: Code): Promise<Promotion | null> {
		throw new Error('Method not implemented.');
	}

	save(_: Promotion): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
