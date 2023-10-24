/*import { Code } from '../../../domain/Code/Code';
import { Pilot } from '../../../domain/Person/Pilot';
import { Student } from '../../../domain/Person/Student';
import { Sector } from '../../../domain/Sector/Sector';
import { Level } from '../../../domain/types';
import { IntervenantRepository } from '../../intervenant.repository';
import { PromotionRepository } from '../../promotion.repository';

export type PromotionInfoCommand = {
	intervenantCode: Code;
	alias: string;
	startDate: string;
	endDate: string;
	level: Level;
	pilot: Pilot;
	sector: Sector;
	students?: Student[];
};

export class InfoPromotionUsecase {
	constructor(private readonly _promotionRepository: PromotionRepository) {}

	async handle(command: PromotionInfoCommand) {
		const promotion = await this._promotionRepository.findByCode(
			command.promotionCode
		);
		if (!promotion) {
			throw new Error('promotion not found');
		}

		promotion.updateintervenantCode(command.intervenantCode);
		promotion.updatealias(command.alias);
		promotion.updatestartDate(command.startDate);
		promotion.updateendDate(command.endDate);
		promotion.updatelevelCode(command.level);
		promotion.updatepilot(command.pilot);
		promotion.updatesector(command.sector);
		promotion.updatestudents(command.students);

		await this._promotionRepository.update(promotion);
	}
}
*/
