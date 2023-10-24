import { DataTypes, Model, Sequelize } from 'sequelize';
import { IntervenantRepository } from '../../application/intervenant.repository';
import { Code } from '../../domain/Code/Code';
import { Intervenant } from '../../domain/Person/Intervenant';
import { PersonModel } from '../person/person.sequelize.repository';

export class IntervenantModel extends Model {}
export default class IntervenantSequelizeRepository
	implements IntervenantRepository
{
	constructor(sequelize: Sequelize) {
		IntervenantModel.init(
			{
				code: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false,
				},
				subjectsAprouved: {
					type: DataTypes.STRING,
					defaultValue: DataTypes.UUIDV4,
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'intervenant',
			}
		);
		console.log(sequelize.models, PersonModel);
		//IntervenantModel.hasOne(PersonModel); // deja essayer
		IntervenantModel.sync();
	}
	save(intervenent: Intervenant): Promise<void> {
		console.debug(intervenent);
		throw new Error('Method not implemented.');
	}
	update(intervenent: Intervenant): Promise<void> {
		console.debug(intervenent);
		throw new Error('Method not implemented.');
	}
	delete(code: Code): Promise<void> {
		console.debug(code);
		throw new Error('Method not implemented.');
	}
	findByCode(code: Code): Promise<Intervenant | null> {
		console.debug(code);
		throw new Error('Method not implemented.');
	}
}
