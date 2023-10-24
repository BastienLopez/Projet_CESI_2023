import { Code } from '../domain/Code/Code';
import { Pilot } from '../domain/Person/Pilot';

export interface PilotRepository {
	save(intervenent: Pilot): Promise<void>;
	update(intervenent: Pilot): Promise<void>;
	delete(code: Code): Promise<void>;
	findByCode(code: Code): Promise<Pilot | null>;
}
