//import { Room } from '../../../domain/Room/Room';
import { RoomRepository } from '../../room.repository';

export class RetrieveRoomUseCase {
	constructor(private readonly _queryRepository: RoomRepository) {}

	async handle(ref: string) {
		return await this._queryRepository.findByRef(ref);
	}
}
