import { Code } from "../../../domain/Code/Code";
import { Pilot } from "../../../domain/Person/Pilot";
import { Student } from "../../../domain/Person/Student";
import { Promotion } from "../../../domain/Promotion/Promotion";
import { Sector } from "../../../domain/Sector/Sector";
import { Level } from "../../../domain/types";
import { Notifier } from "../../notifier.provider";
import { PromotionRepository } from "../../promotion.repository";

export type PromotionCommand = {
  code: Code;
  alias: string;
  startDate: string;
  endDate: string;
  level: Level;
  pilot: Pilot;
  sector: Sector;
  students?: Student[];
}

export class CreatePromotionUsecase {
  constructor(
		private readonly _promotionRepository: PromotionRepository,
		private readonly _notifier: Notifier
	) {}

  async handle(promotionCommand: PromotionCommand) {
    const promotion = new Promotion(
      promotionCommand.code,
      promotionCommand.alias,
      promotionCommand.startDate,
      promotionCommand.endDate,
      promotionCommand.level,
      promotionCommand.pilot,
      promotionCommand.sector,
      promotionCommand.students
    );

    await this._promotionRepository.save(promotion);
    await this._notifier.notify(
      ["test@gmail.com"],
      'Welcome',
      'Welcome to our platform'
    );
  }
}