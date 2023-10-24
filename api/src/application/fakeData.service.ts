import { Code } from '../domain/Code/Code';
import { Pilot } from '../domain/Person/Pilot';
import { Promotion } from '../domain/Promotion/Promotion';
import { Room } from '../domain/Room/Room';
import { Sector } from '../domain/Sector/Sector';
import { Subject } from '../domain/Session/Subject';
import { CodeType, Level, RoomType } from '../domain/types';

const code = new Code('RE3DU33', CodeType.PERSON);
const pilotReferer = new Pilot(code, 'jonh', 'doe', '0606060606');
const room = new Room('room1', 10, RoomType.Amphiteatre);
const sector = new Sector(code, 'test');
const subject = new Subject('cda10', 'subject1', Level.LVL6);
const promotion = new Promotion(
	code,
	'Promo 2020',
	'2025-05-02',
	'2026-02-03',
	Level.LVL6,
	pilotReferer,
	sector
);

export default {
	code,
	pilotReferer,
	room,
	sector,
	promotion,
	subject,
};
