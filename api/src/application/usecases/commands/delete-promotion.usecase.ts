import { Code } from "../../../domain/Code/Code";
import { Notifier } from "../../notifier.provider";
import { PromotionRepository } from "../../promotion.repository";

export type PromotionCommand = {
  code: Code;
}

export class DeletePromotionUsecase {
  constructor(
		private readonly _promotionRepository: PromotionRepository,
		private readonly _notifier: Notifier
	) {}

  async handle(promotionCommand: PromotionCommand) {
    await this._promotionRepository.delete(promotionCommand.code);

    await this._notifier.notify(
      ["test@gmail.com"],
      'Welcome',
      'Welcome to our platform'
    );
  }
}
