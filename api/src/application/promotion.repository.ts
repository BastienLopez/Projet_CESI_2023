import { Code } from '../domain/Code/Code';
import { Promotion } from '../domain/Promotion/Promotion';

export interface PromotionRepository {
	save(intervenent: Promotion): Promise<void>;
	update(intervenent: Promotion): Promise<void>;
	delete(code: Code): Promise<void>;
	findByCode(code: Code): Promise<Promotion | null>;
}
