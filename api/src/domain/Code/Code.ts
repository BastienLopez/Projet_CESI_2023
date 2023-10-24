import { CodeType } from '../types';

export class Code {
	constructor(private _code: string, private _type: CodeType) {
		if (_type === CodeType.PERSON) {
			this._validatePersonCode();
		} else if (_type === CodeType.PROMOTION) {
			this._validatePromotionCode();
		} else {
			this._validateSectorCode();
		}
	}

	private _validateSectorCode() {
		if (this._code.length !== 1) {
			throw new Error('Code length must be equal to 1 characters');
		}
	}

	private _validatePersonCode() {
		if (this._code.length !== 7) {
			throw new Error('Code must be equal to 7 characters');
		}
	}

	private _validatePromotionCode() {
		if (this._code.length !== 8) {
			throw new Error('Promotion should have a length of 8');
		}

		if (this._code.substring(0, 2).match(/^[a-zA-Z]+$/) === null) {
			throw new Error('Promotion Code must start with 2 letters');
		}

		if (this._code.substring(3, 5).match(/^[a-zA-Z]+$/) === null) {
			throw new Error('Promotion Code must have 2 letters at position 4 and 5');
		}

		if (this._code.charAt(2).match(/^[0-9]+$/) === null) {
			throw new Error('Promotion Code must have a number in 3th place');
		}

		if (this._code.substring(5, 8).match(/^[0-9]+$/) === null) {
			throw new Error(
				'Promotion Code must have 3 digits at the end of the code'
			);
		}
	}

	code(): string {
		return this._code;
	}

	type(): CodeType {
		return this._type;
	}
}
