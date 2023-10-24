import validator from 'validator';
import { Code } from '../Code/Code';
import { Sector } from '../Sector/Sector';
import { Student } from '../Person/Student';
import { Alias, Level } from '../types';
import { Pilot } from '../Person/Pilot';

export class Promotion {
	private _startDate: Date;
	private _endDate: Date;

	constructor(
		private _code: Code,
		private _alias: Alias,
		startDate: string,
		endDate: string,
		private _level: Level,
		private _pilot: Pilot,
		private _sector: Sector,
		private _students: Student[] = []
	) {
		if (_alias.length < 6) {
			throw new Error(
				'Alias is too short, it must be at least 6 characters long'
			);
		}

		if (!validator.isDate(startDate)) {
			console.log(startDate);
			throw new Error('Start date is not a valid date');
		}

		if (!validator.isDate(endDate)) {
			throw new Error('End date is not a valid date');
		}

		if (!validator.isAfter(startDate, new Date().toISOString())) {
			throw new Error('Start date must be in the future');
		}

		this._startDate = new Date(startDate);
		this._endDate = new Date(endDate);

		if (this._startDate > this._endDate) {
			throw new Error('Start date must be before end date');
		}
	}

	setAlias(alias: Alias) {
		if (alias.length < 6) {
			throw new Error(
				'Alias is too short, it must be at least 6 characters long'
			);
		}

		this._alias = alias;
	}

	addStudent(student: Student) {
		this._students.push(student);
	}

	removeStudent(code: Code) {
		this._students = this._students.filter(
			(student) => student.code() !== code
		);
	}

	code(): Code {
		return this._code;
	}

	alias(): Alias {
		return this._alias;
	}

	startDate(): Date {
		return this._startDate;
	}

	endDate(): Date {
		return this._endDate;
	}

	level(): Level {
		return this._level;
	}

	pilot(): Pilot {
		return this._pilot;
	}

	sector(): Sector {
		return this._sector;
	}

	students(): Student[] {
		return this._students;
	}
}
