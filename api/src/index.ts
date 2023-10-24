import * as dotenv from 'dotenv';
import fs from 'fs';
import { Dialect, Sequelize } from 'sequelize';
import { expressAdapter } from './adapters/express';
import { AuthSubRouter } from './adapters/express/auth';
import { IntervenantSubRouter } from './adapters/express/intervenant';
import { PersonSubRouter } from './adapters/express/person';
import { PromotionSubRouter } from './adapters/express/promotion';
import { RoomSubRouter } from './adapters/express/room';
import { StudentSubRouter } from './adapters/express/student';
import IntervenantSequelizeRepository from './infra/intervenant/intervenant.sequelize.repository';
import { FakeSMTP } from './infra/notifier/fake-smtp.notifier';
import PersonSequelizeRepository from './infra/person/person.sequelize.repository';
import PilotSequelizeRepository from './infra/pilot/person.sequelize.repository';
import { PromotionSequelizeRepository } from './infra/promotion/promotion.sequelize.repository';

import { StudentInmemoryRepository } from './infra/student/student.inmemory.repository';
import { SubjectSequelizeRepository } from './infra/subject/student.sequelize.repository';
import { RoomSequelizeRepository } from './infra/room/room.sequelize.repository';

async function run() {
	console.log('Starting server...');
	dotenv.config({ path: '/.env' });

	/*try {
		fs.readFileSync('./config/private_key.pem', 'utf8');
	} catch (error) {
		console.error('ERROR : Cant read private_key.pem !');
		process.exit(1);
	}*/

	const port = process.env.API_PORT || '2900';

	const sequelize = new Sequelize(
		process.env.DB_NAME || 'cube',
		process.env.DB_USER || 'root',
		process.env.DB_PASSWORD || 'root',
		{
			// uncomment this on local
			host: process.env.DB_HOST || 'localhost',
			port: parseInt(process.env.DB_PORT, 10) || 3306, // ricardo c'est 3310 mais normalment c'est port 3306
			dialect: 'mariadb',
		}
	);
	console.log(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		process.env.DB_PORT
	);
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	const notifier = new FakeSMTP();

	const personRepository = new PersonSequelizeRepository(sequelize);
	const personRouter = PersonSubRouter(personRepository);

	const intervenantRepository = new IntervenantSequelizeRepository(sequelize);
	const intervenantRouter = IntervenantSubRouter(
		intervenantRepository,
		notifier
	);

	const studentRepository = new StudentInmemoryRepository();
	const studentRouter = StudentSubRouter(studentRepository, notifier);

	const promotionRepository = new PromotionSequelizeRepository(sequelize);
	const promotionRouter = PromotionSubRouter(promotionRepository, notifier);
	const roomRepository = new RoomSequelizeRepository(sequelize);
	const roomRouter = RoomSubRouter(roomRepository);

	const authRouter = AuthSubRouter(personRepository);

	//@ts-ignore
	const PilotRepository = new PilotSequelizeRepository(sequelize);

	//@ts-ignore
	const subjectRepository = new SubjectSequelizeRepository(sequelize);

	// const sessionRepository = new SessionSequelizeRepository(sequelize);

	await expressAdapter(
		port,
		intervenantRouter,
		promotionRouter,
		roomRouter,
		personRouter,
		studentRouter,
		authRouter
	);
}

run();
