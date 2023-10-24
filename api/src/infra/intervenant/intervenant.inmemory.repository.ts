import { IntervenantRepository } from '../../application/intervenant.repository';
import { Code } from '../../domain/Code/Code';
import { Intervenant } from '../../domain/Person/Intervenant';
import { CodeType, PersonType } from '../../domain/types';

export const fakeIntervenants: Intervenant[] = [
	new Intervenant(
		new Code('2022001', CodeType.PERSON),
		'John',
		'Doe',
		'+33601020203',
		PersonType.CONTRACTOR
	),
	new Intervenant(
		new Code('2022002', CodeType.PERSON),
		'Jane',
		'Doe',
		'+33601020204',
		PersonType.CONTRACTOR
	),
];

export class IntervenantInmemoryRepository implements IntervenantRepository {
	constructor(private _intervenants: Intervenant[] = fakeIntervenants) {}

	async save(intervenant: Intervenant): Promise<void> {
		this._intervenants.push(intervenant);
	}

	async update(intervenant: Intervenant): Promise<void> {
		const index = this._intervenants.findIndex(
			(i) => i.code() === intervenant.code()
		);
		this._intervenants[index] = intervenant;
	}

	async delete(code: Code): Promise<void> {
		this._intervenants = this._intervenants.filter((i) => i.code() !== code);
	}

	async findByCode(code: Code): Promise<Intervenant | null> {
		return Promise.resolve(
			this._intervenants.find((i) => i.code() === code) || null
		);
	}

	async getAll(): Promise<Intervenant[]> {
		return Promise.resolve(this._intervenants);
	}
}
