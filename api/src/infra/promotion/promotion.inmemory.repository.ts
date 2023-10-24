import { PromotionRepository } from "../../application/promotion.repository";
import { Code } from "../../domain/Code/Code";
import { Pilot } from "../../domain/Person/Pilot";
import { Promotion } from "../../domain/Promotion/Promotion";
import { Sector } from "../../domain/Sector/Sector";
import { CodeType, Level } from "../../domain/types";

export const fakePromotions: Promotion[] = [
  new Promotion(
    new Code('2022001', CodeType.PERSON),
    "Promotion 1",
    "2024-01-01",
    "2024-12-31",
    Level.LVL5,
    new Pilot(
      new Code('2022001', CodeType.PERSON),
      "John",
      "Doe",
      "+33601020203"
    ),
    new Sector(
      new Code('2022001', CodeType.PERSON),
      "001"
    ),
    []
  )
];

export class PromotionInmemoryRepository implements PromotionRepository {
  constructor (private _promotions: Promotion[] = fakePromotions) {}

  async save(promotion: Promotion): Promise<void> {
		this._promotions.push(promotion);
	}

	async update(promotion: Promotion): Promise<void> {
		const index = this._promotions.findIndex(
			(i) => i.code() === promotion.code()
		);
		this._promotions[index] = promotion;
	}

	async delete(code: Code): Promise<void> {
		this._promotions = this._promotions.filter((i) => i.code() !== code);
	}

	async findByCode(code: Code): Promise<Promotion | null> {
		return Promise.resolve(
			this._promotions.find((i) => i.code() === code) || null
		);
	}
}