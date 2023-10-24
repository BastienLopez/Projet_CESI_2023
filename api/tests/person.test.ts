import test from 'ava';
import { Code } from '../src/domain/Code/Code';
import { Intervenant } from '../src/domain/Person/Intervenant';
import { Pilot } from '../src/domain/Person/Pilot';
import { Student } from '../src/domain/Person/Student';
import { CodeType, PersonType } from '../src/domain/types';

test('pilot should not have an empty firstname', (t) => {
	const error = t.throws(() => {
		const code = new Code('2837263', CodeType.PERSON);
		new Pilot(code, '', 'doe', '0606060606');
	});

	t.is(error?.message, 'Person firstname must have at least 2 characters');
});

test('person should not have an empty lastname', (t) => {
	const error = t.throws(() => {
		const code = new Code('2837263', CodeType.PERSON);
		new Pilot(code, 'john', '', '0606060606');
	});

	t.is(error?.message, 'Person lastname must have at least 2 characters');
});

test('person of type internal must be an email with format (jdoe@cesi.fr)', (t) => {
	const p = new Pilot(
		new Code('2837263', CodeType.PERSON),
		'john',
		'doe',
		'0606060606'
	);
	t.is(p.email(), 'jdoe@cesi.fr');
});

test('Intervenant must be an email with format', (t) => {
	const p = new Intervenant(
		new Code('2837263', CodeType.PERSON),
		'anne',
		'doe',
		'0606060606',
		PersonType.INDEPEDANT
	);
	t.is(p.email(), 'anne.doe@viacesi.fr');
});

test('Student must be an email with format', (t) => {
	const p = new Student(new Code('2837263', CodeType.PERSON), 'john', 'doe');
	t.is(p.email(), 'john.doe@viacesi.fr');
});

test('Intervenant should have a valid phone', (t) => {
	const error = t.throws(() => {
		new Intervenant(
			new Code('2837263', CodeType.PERSON),
			'anne',
			'doe',
			'',
			PersonType.INDEPEDANT
		);
	});

	t.is(error?.message, 'Person phone number is not valid');
});
