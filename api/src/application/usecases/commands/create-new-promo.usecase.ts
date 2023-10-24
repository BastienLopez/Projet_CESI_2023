import { Code } from '../../../domain/Code/Code';
import { Pilot } from '../../../domain/Person/Pilot';
import { Promotion } from '../../../domain/Promotion/Promotion';
import { Sector } from '../../../domain/Sector/Sector';
import { Alias, Level } from '../../../domain/types';
import { PromotionRepository } from '../../promotion.repository';

export type NewPromoCommand = {
	code: Code;
	alias: Alias;
	startDate: string;
	endDate: string;
	level: Level;
	pilot: Pilot;
	sector: Sector;
};

export class CreateNewPromoUsecase {
	constructor(private readonly _promoRepository: PromotionRepository) {}

	async handle(promoCommand: NewPromoCommand) {
		const promo = new Promotion(
			promoCommand.code,
			promoCommand.alias,
			promoCommand.startDate,
			promoCommand.endDate,
			promoCommand.level,
			promoCommand.pilot,
			promoCommand.sector
		);

		await this._promoRepository.save(promo);
		/*	await this._notifier.notify(
			[intervenant.email()],
			'Welcome',
			'Welcome to our platform'
		);*/
	}
}
