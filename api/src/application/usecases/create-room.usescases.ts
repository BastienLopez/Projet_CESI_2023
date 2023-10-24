
import { Room } from '../../domain/Room/Room';
import { RoomType } from '../../domain/types';
import { RoomRepository } from '../room.repository';


export type RoomCommand = {
	ref:string,
    capacity:number,
    roomType:RoomType
};

export class CreateRoomUsecase {
	constructor(
		private readonly _roomRepository: RoomRepository,
		
	) {}

	async handle(roomCommand: RoomCommand) {
		const room = new Room(
			roomCommand.ref,
			roomCommand.capacity,
			roomCommand.roomType,
			
		);

		await this._roomRepository.save(room);
		
	}
}
