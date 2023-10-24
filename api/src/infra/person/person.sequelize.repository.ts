import { DataTypes, Model, Sequelize, Op } from 'sequelize';
import { PersonRepository } from '../../application/person.repository';
import { Code } from '../../domain/Code/Code';
import { Person } from '../../domain/Person/Person';
import { PersonDTO } from '../../domain/Person/PersonDTO';
import { CodeType } from '../../domain/types';
import bcrypt from 'bcrypt';

export class PersonModel extends Model {}
export default class PersonSequelizeRepository implements PersonRepository {
	constructor(sequelize: Sequelize) {
		PersonModel.init(
			{
				code: {
					type: DataTypes.STRING,
					primaryKey: true,
					defaultValue: DataTypes.UUIDV4,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				personType: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				personRole: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				phone: {
					type: DataTypes.STRING, //number passe pas avec mysql
					allowNull: true,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'people',
			}
		);
		PersonModel.sync().then(() => {
			this.createDefaultPerson();
		});
	}

	async getAllPersons(
		page: number,
		nbPerPage: number,
		nameFilter: string
	): Promise<PersonDTO> {
		let count = await PersonModel.count();

		nbPerPage = +nbPerPage;
		if (nbPerPage < 2) nbPerPage = 2;

		let pDTO = new PersonDTO();
		if (page < 1 || page > Math.round(nbPerPage / count) + 1 || isNaN(page)) {
			page = 1;
		}
		if (nameFilter == null || nameFilter == 'filter') {
			nameFilter = '';
		}
		pDTO.setPage(page);
		pDTO.setNbMaxPages(Math.round(count / nbPerPage));

		pDTO.setPersons(
			await PersonModel.findAll({
				limit: nbPerPage,
				offset: (page - 1) * nbPerPage,
				where: {
					[Op.or]: {
						firstName: {
							[Op.like]: '%' + nameFilter + '%',
						},
						lastName: {
							[Op.like]: '%' + nameFilter + '%',
						},
					},
				},
			})
		);
		return pDTO;
	}

	getPersonsByPromotion(_promotion: string): Promise<PersonDTO> {
		throw new Error('Method not implemented.');
	}

	async getFilteredPeople(
		page: number,
		role: string,
		nbPerPage: number,
		name: string
	): Promise<PersonDTO> {
		if (name == null || name == 'filter') {
			name = '';
		}
		let count = await PersonModel.count({
			where: {
				personRole: role,
				[Op.or]: {
					firstName: {
						[Op.like]: '%' + name + '%',
					},
					lastName: {
						[Op.like]: '%' + name + '%',
					},
				},
			},
		});

		nbPerPage = +nbPerPage;
		if (nbPerPage < 2) nbPerPage = 2;

		let pDTO = new PersonDTO();
		if (page < 1 || page > Math.round(nbPerPage / count) + 1 || isNaN(page)) {
			page = 1;
		}
		pDTO.setPage(page);
		pDTO.setNbMaxPages(Math.round(count / nbPerPage));
		console.log(name);
		if (name == null || name == 'filter') {
			name = '';
		}
		pDTO.setPersons(
			await PersonModel.findAll({
				limit: nbPerPage,
				offset: (page - 1) * nbPerPage,
				where: {
					personRole: role,
					[Op.or]: {
						firstName: {
							[Op.like]: '%' + name + '%',
						},
						lastName: {
							[Op.like]: '%' + name + '%',
						},
					},
				},
			})
		);
		return pDTO;
	}

	getPersonsByRoleAndPromotion(
		role: string,
		promotion: string,
		name: string
	): Promise<Person[]> {
		throw new Error('Method not implemented.');
	}

	save(person: Person): Promise<PersonModel> {
		let personInstance = PersonModel.build({
			code: person.code().toString(),
			firstName: person.firstName(),
			lastName: person.lastName(),
			personType: person.type(),
			personRole: person.role(),
			phone: person.phone(),
			password: bcrypt.hashSync(person.password(), 10),
		});
		return personInstance.save().then((a) => {
			return a;
		});
	}

	update(person: Person): Promise<void> {
		return PersonModel.update(
			{
				firstName: person.firstName(),
				lastName: person.lastName(),
				personType: person.type(),
				personRole: person.role(),
				phone: person.phone(),
				password: person.password(),
			},
			{
				where: {
					code: person.code().toString(),
				},
			}
		).then(
			() => {
				console.log('person updated');
			},
			(err) => {
				console.error(
					'error something went wrong with the update of the person'
				);
				console.error(err);
				return err;
			}
		);
	}

	delete(code: Code): Promise<void> {
		return PersonModel.destroy({
			where: {
				code: code,
			},
		}).then(
			() => {
				console.log('person deleted');
			},
			(err) => {
				console.error(
					'error something went wrong with the deletion of the person'
				);
				return err;
			}
		);
	}

	async findByCode(code: Code): Promise<Person> {
		console.log(code);
		try {
			const person = await PersonModel.findOne({
				where: {
					code: code,
				},
			});
			if (person === null) {
				throw new Error('Person not found');
			}
			return new Person(
				new Code(person.dataValues.code, CodeType.PERSON),
				person.dataValues.firstName,
				person.dataValues.lastName,
				person.dataValues.personType,
				person.dataValues.personRole,
				person.dataValues.phone,
				person.dataValues.password
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	createDefaultPerson() {
		try {
			PersonModel.findOrCreate({
				where: {
					lastName: 'admin',
					firstName: 'admin',
					code: 'adminUs',
				},
				defaults: {
					code: 'adminUs',
					firstName: 'admin',
					lastName: 'admin',
					personType: 'INTERNAL',
					personRole: 'HEIMDALL',
					phone: 'admin',
					password: bcrypt.hashSync('adminPassword', 10),
				},
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
