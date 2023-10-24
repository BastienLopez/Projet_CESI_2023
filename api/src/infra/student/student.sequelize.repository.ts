import { Sequelize, DataTypes, Model } from 'sequelize';
import { StudentRepository } from '../../application/student.repository';
import { Student } from '../../domain/Person/Student';
import { Code } from '../../domain/Code/Code';

export class StudentModel extends Model {}

export class StudentSequelizeRepository implements StudentRepository {
	constructor(sequelize: Sequelize) {
		StudentModel.init(
			{
				code: {
					type: DataTypes.STRING,
					primaryKey: true,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},

			{
				sequelize,
				modelName: 'Student',
			}
		);
	}
	save(_: Student): Promise<void> {
		throw new Error('Method not implemented.');
	}
	update(_: Student): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(_: Code): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findByCode(_: Code): Promise<Student | null> {
		throw new Error('Method not implemented.');
	}

	static fromStudentDomain(student: Student): StudentModel {
		return new StudentModel({
			code: student.code,
			firstName: student.firstName,
			lastName: student.lastName,
		});
	}
}
