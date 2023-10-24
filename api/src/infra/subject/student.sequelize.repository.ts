import { Sequelize, DataTypes, Model } from 'sequelize';
import { SubjectRepository } from '../../application/subject.repository';

import { Code } from '../../domain/Code/Code';
import { Subject } from '../../domain/Session/Subject';
//import { PilotModel } from '../pilot/person.sequelize.repository';

export class SubjectModel extends Model {}

export class SubjectSequelizeRepository implements SubjectRepository {
	constructor(sequelize: Sequelize) {
		SubjectModel.init(
			{
				ref: {
					type: DataTypes.STRING,
					primaryKey: false,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				codeLevel: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},

			{
				sequelize,
				modelName: 'subject',
			}
		);
		//	SubjectModel.belongsToMany(PilotModel, { through: 'pilotSubjects' });
		SubjectModel.sync();
	}
	//@ts-ignore
	delete(ref: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	//@ts-ignore
	findByRef(code: string): Promise<Subject | null> {
		throw new Error('Method not implemented.');
	}
	save(_: Subject): Promise<void> {
		throw new Error('Method not implemented.');
	}
	update(_: Subject): Promise<void> {
		throw new Error('Method not implemented.');
	}

	findByCode(_: Code): Promise<Subject | null> {
		throw new Error('Method not implemented.');
	}
}
