import { Room } from '../../../domain/Room/Room';
import { RoomRepository } from '../../room.repository';
import { RoomType} from '../../../domain/types';


export type RoomInfoCommand = {
	ref: string;
	capacity: number;
	roomType: RoomType;
};

export class CreateRoomUsecase {
	constructor(
		private readonly roomRepository: RoomRepository,) {}

	async handle(roomInfoCommand: RoomInfoCommand) {
		const room = new Room(
			roomInfoCommand.ref,
			roomInfoCommand.capacity,
			roomInfoCommand.roomType
		);

		await this.roomRepository.save(room);
	}
}