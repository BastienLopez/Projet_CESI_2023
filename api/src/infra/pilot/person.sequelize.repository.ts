import { DataTypes, Model, Sequelize } from 'sequelize';
import { PilotRepository } from '../../application/pilot.repository';
import { Code } from '../../domain/Code/Code';
import { Pilot } from '../../domain/Person/Pilot';
import { PersonModel } from '../person/person.sequelize.repository';
//import { SubjectModel } from '../subject/student.sequelize.repository';

export class PilotModel extends Model {}
export default class PilotSequelizeRepository implements PilotRepository {
	constructor(sequelize: Sequelize) {
		PilotModel.init(
			{
				piloteCode: {
					type: DataTypes.STRING,
					primaryKey: true,
				},
			},
			{
				sequelize,
				modelName: 'pilot',
			}
		);
		PilotModel.belongsTo(PersonModel, { foreignKey: 'piloteCode' });
		//PilotModel.belongsToMany(SubjectModel, { through: 'pilotSubjects' });
		PilotModel.sync();
	}

	save(pilot: Pilot): Promise<void> {
		let pilotInstance = PilotModel.build({
			code: pilot.code().toString(),
			firstName: pilot.firstName(),
			lastName: pilot.lastName(),
			piloteType: pilot.type(),
			pilotRole: pilot.role(),
			phone: pilot.phone(),
			password: pilot.password(),
		});
		pilotInstance.save().then(
			() => {
				console.log('new person created');
			},
			() => {
				console.log(
					'error something went wrong with the creation of the person'
				);
			}
		);
		return Promise.resolve();
	}

	update(pilot: Pilot): Promise<void> {
		PilotModel.update(
			{
				firstName: pilot.firstName(),
				lastName: pilot.lastName(),
				piloteType: pilot.type(),
				pilotRole: pilot.role(),
				phone: pilot.phone(),
				password: pilot.password(),
			},
			{
				where: {
					code: pilot.code().toString(),
				},
			}
		).then(
			() => {
				console.log('pilot updated');
			},
			(reason) => {
				console.log('error something went wrong with the update of the pilot');
				console.log(reason);
			}
		);
		return Promise.resolve();
	}

	delete(code: Code): Promise<void> {
		PilotModel.destroy({
			where: {
				code: code,
			},
		}).then(
			() => {
				console.log('pilot deleted');
			},
			() => {
				console.log(
					'error something went wrong with the deletion of the pilot'
				);
			}
		);
		return Promise.resolve();
	}

	findByCode(code: Code): Promise<Pilot | null> {
		try {
			const pilot = PilotModel.findAll({
				where: {
					code: code,
				},
			});
			return Promise.resolve(pilot as unknown as Pilot);
		} catch {
			return Promise.reject('pilot not found');
		}
	}
}
