import test from 'ava';
import { Code } from '../src/domain/Code/Code';
import { CodeType } from '../src/domain/types';

test('code for person should have a valid length (7)', (t) => {
	const c = new Code('2837263', CodeType.PERSON);
	t.is(c.code(), '2837263');
});

test('code for promotion should have a length of 8', (t) => {
	const error = t.throws(() => {
		new Code('7', CodeType.PROMOTION);
	});

	t.is(error?.message, 'Promotion should have a length of 8');
});

test('code for promotion should start with 2 letters', (t) => {
	const error = t.throws(() => {
		new Code('283DU633', CodeType.PROMOTION);
	});

	t.is(error?.message, 'Promotion Code must start with 2 letters');
});

test('code for promotion should have a number in 3th place', (t) => {
	const error = t.throws(() => {
		new Code('EEXDU633', CodeType.PROMOTION);
	});

	t.is(error?.message, 'Promotion Code must have a number in 3th place');
});

test('code for promotion should have 2 letters at position 4 and 5', (t) => {
	const error = t.throws(() => {
		new Code('RE327633', CodeType.PROMOTION);
	});

	t.is(
		error?.message,
		'Promotion Code must have 2 letters at position 4 and 5'
	);
});

test('code for promotion should finish with 3 digits', (t) => {
	const error = t.throws(() => {
		new Code('RE3DUZZZ', CodeType.PROMOTION);
	});

	t.is(
		error?.message,
		'Promotion Code must have 3 digits at the end of the code'
	);
});

test('code for sector should have a length of 1', (t) => {
	const error = t.throws(() => {
		new Code('RZ', CodeType.SECTOR);
	});

	t.is(error?.message, 'Code length must be equal to 1 characters');
});
