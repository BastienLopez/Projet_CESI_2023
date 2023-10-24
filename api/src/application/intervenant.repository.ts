import { Code } from '../domain/Code/Code';
import { Intervenant } from '../domain/Person/Intervenant';

export interface IntervenantRepository {
	save(intervenent: Intervenant): Promise<void>;
	update(intervenent: Intervenant): Promise<void>;
	delete(code: Code): Promise<void>;
	findByCode(code: Code): Promise<Intervenant | null>;
}
