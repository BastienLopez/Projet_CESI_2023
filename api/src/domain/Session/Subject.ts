import { Level } from '../types';

export class Subject {
	constructor(
		private _ref: string,
		private _name: string,
		private _level: Level
	) {
		if (_ref.length < 2) {
			throw new Error('Subject ref must have at least 2 characters');
		}

		if (_name.length < 2) {
			throw new Error('Subject name must have at least 2 characters');
		}
	}

	ref(): string {
		return this._ref;
	}

	name(): string {
		return this._name;
	}

	level(): Level {
		return this._level;
	}
}
