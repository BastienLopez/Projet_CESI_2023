// import { RoomRepository } from '../../application/room.repository';
// import { Room } from '../../domain/Room/Room';
// import { RoomType } from '../../domain/types';
// import { RoomModel } from './room.sequelize.repository';
// //import { DataTypes, Model, Sequelize } from 'sequelize';

// export const fakeRoom: Room[] = [
// 	new Room('RE00111', 35, RoomType.Box),
// 	new Room('RE00112', 40, RoomType.InformaticRoom),
// ];

// export class RoomInmemoryRepository implements RoomRepository {
// 	constructor(private _rooms: Room[] = fakeRoom) {}
	
	

// 	async update(room: Room): Promise<void> {
// 		const index = this._rooms.findIndex(
// 			(i) => i.ref() === room.ref()
// 		);
// 		this._rooms[index] = room;
// 	}

// 	async delete(room: Room): Promise<void> {
// 		RoomModel.destroy({
// 			where: {
				
// 				ref: room.ref,
// 			},
// 		}).then(
// 			() => {
// 				console.log('room deleted');
// 			},
// 			() => {
// 				console.log(
// 					'error something went wrong with the deletion of the room'
// 				);
// 			}
// 		);
// 		return Promise.resolve();
// 	}
// 	async findByRef(ref: string): Promise<Room | null> {
// 		return Promise.resolve(
// 			this._rooms.find((i) => i.ref() === ref) || null
// 		);
// 	}

// 	async getAll(): Promise<Room[]> {
// 		return Promise.resolve(this._rooms);
// 	}
// 	async getAllRooms1(): Promise<Room> {
// 		try {
// 			const rooms = RoomModel.findAll({});
// 			return Promise.resolve(rooms as unknown as Room);
// 		} catch {
// 			return Promise.reject('room not found');
// 		}
// 	}
// 	async save(room: Room): Promise<void> {
// 		this._rooms.push(room);
// 	}
// }
