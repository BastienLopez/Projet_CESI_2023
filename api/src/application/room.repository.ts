import { Room } from '../domain/Room/Room';
import { RoomDTO } from '../domain/Room/RoomDTO';

export interface RoomRepository {
	save(room: Room): Promise<void>;
	update(room: Room): Promise<void>;
	delete(room: Room): Promise<void>;
	findByRef(ref: string): Promise<Room | null>;
	// getAllRooms1(

	// ): Promise<Room | null>;
	getAllRooms(page: number, nbPerPage: number, name: string): Promise<RoomDTO>;
	getFilteredRoom(
		page: number,
		role: string,
		nbPerPage: number,
		name: string
	): Promise<RoomDTO>;
}
