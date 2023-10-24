import { Room } from '../../../domain/Room/Room';
import { RoomType } from '../../../domain/types';
import { RoomRepository } from '../../room.repository';

export type RoomInfoCommand = {
	ref: Room;
	capacity: number;
	roomType: RoomType;
};

export class InfoRoomUsecase {
	constructor(private readonly _roomRepository: RoomRepository) {}

	async handle(command: RoomInfoCommand) {
		// BUG!!!
		// const room = await this._roomRepository.findByRef(
		// 	command.ref
		// );
		// if (!room) {
		// 	throw new Error('Intervenant not found');
		// }
		// room.updateCapacity(command.capacity);
		// room.updateRoomType(command.roomType);
		// await this._roomRepository.update(room);
	}
}
