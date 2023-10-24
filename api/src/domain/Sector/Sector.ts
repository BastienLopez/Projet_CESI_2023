import { Code } from '../Code/Code';

export class Sector {
	constructor(private _code: Code, private _alias: string) {
		if (_alias.length >= 5 || _alias.length < 2) {
			throw new Error('Alias must be between 2 and 5 characters');
		}
	}

	code(): Code {
		return this._code;
	}

	alias(): string {
		return this._alias;
	}
}
