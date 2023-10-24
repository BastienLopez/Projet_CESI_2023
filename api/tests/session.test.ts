import test from 'ava';
import { randomUUID } from 'crypto';
import { Session } from '../src/domain/Session/Session';
import fakeData from '../src/application/fakeData.service';

test('Start date must be defined', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(),
			//@ts-ignore
			null, //
			new Date(), //
			fakeData.promotion
		);
	});
});

test('End date must be defined', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(),
			new Date(), //
			//@ts-ignore
			undefined, //
			fakeData.promotion //
		);
	});
});
/*
test('Promotion must be defined', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(),
			[fakeData.room], //
			new Date(), //
			new Date(), //
			//@ts-ignore
			null //
		);
	});
});
*/

test('Start date must be before end date', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(),
			new Date(), //
			new Date(2019, 1, 1), //
			fakeData.promotion //
		);
	});
});
test('Start date must be different from end date', (t) => {
	let date = new Date();
	t.throws(() => {
		new Session(
			randomUUID(),
			date, //
			date, //
			fakeData.promotion //
		);
	});
});

test('Start date must be in the future', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(),
			new Date(2019, 1, 1), //
			new Date(), //
			fakeData.promotion //
		);
	});
});

test('Id must be a valid UUID', (t) => {
	t.throws(() => {
		new Session(
			'yolo', //
			new Date(), //
			new Date(), //
			fakeData.promotion //
		);
	});
});
/*

test('Session status must be confirmed before finished', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject, //
			ConventionStatus.RETURNED, //
			SessionStatus.FINISHED //
		);
	});
});

test('Referer must have at least one subject aproved', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject //
		);
	});
});
test('Referer must have this subject aproved', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject //
		);
	});
});
*/
test('End date must be in the past', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			new Date(), //
			new Date(2019, 1, 1), //
			fakeData.promotion //
		);
	});
});
/*
test('Session status must be pending or Refused', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject, //
			ConventionStatus.RETURNED, //
			SessionStatus.ACCEPTED //
		);
	});
});

test('Session status must be proposed before accepted', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(), //
			new Date(), //
			fakeData.promotion, //
			fakeData.subject, //
			//@ts-ignore
			null, //
			SessionStatus.ACCEPTED //
		);
	});
});

test('Session status must be proposed or accepted before refused', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(), //
			new Date(), //
			fakeData.promotion, //
			fakeData.subject, //
			//@ts-ignore
			null, //
			SessionStatus.REFUSED //
		);
	});
});

test('Convention status must be not send before send', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject, //
			ConventionStatus.RETURNED //
		);
	});
});

test('Convention status must be send before returned', (t) => {
	t.throws(() => {
		new Session(
			randomUUID(), //
			[fakeData.room], //
			fakeData.pilotReferer, //
			'yolo', //
			new Date(2023, 1, 1), //
			new Date(2023, 1, 2), //
			fakeData.promotion, //
			fakeData.subject, //
			ConventionStatus.NOT_SEND //
		);
	});
});
*/
