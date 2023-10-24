import { Sequelize, DataTypes, Model, Op } from 'sequelize';
import { RoomRepository } from '../../application/room.repository';
import { Room } from '../../domain/Room/Room';
import { RoomDTO } from '../../domain/Room/RoomDTO';
export class RoomModel extends Model {}


export class RoomSequelizeRepository implements RoomRepository {
	constructor(sequelize: Sequelize) {
		RoomModel.init(
			{
				ref: {
					type: DataTypes.STRING,
					primaryKey: true,
				},
				capacity: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				roomType: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},

			{
				sequelize,
				modelName: 'Room',
			}
		);
		console.log(sequelize.models, RoomModel);
		RoomModel.sync();
        
	}
	
    async save(room: Room): Promise<void> {
		let RoomInstance = RoomModel.build({
			ref: room.ref,
			capacity: room.capacity,
			roomType: room.roomType,
		//this.room.push(room);
		
	});
	RoomInstance.save().then(() => {
		console.log('new room created');
	},
	() => {
		console.log(
			'error something went wrong with the creation of the room'
		);
	}
);
return Promise.resolve();
}
    update(room: Room): Promise<void> {
        RoomModel.update(
			{
				//ref: room.ref(),
				capacity: room.capacity(),
				roomType: room.roomType(),
			},
			{
				where: {
					ref: room.ref(),
				},
			}
		).then(
			() => {
				console.log('room updated');
			},
			(reason) => {
				console.log('error something went wrong with the update of the room');
				console.log(reason);
			}
		);
		return Promise.resolve();
    }
    delete(room: Room): Promise<void> {
        RoomModel.destroy({
			where: {
				ref: room.ref,
			},
		}).then(
			() => {
				console.log('room deleted');
			},
			() => {
				console.log(
					'error something went wrong with the deletion of the room'
				);
			}
		);
		return Promise.resolve();
    }

	// static fromRoomDomain(room: Room): RoomModel {
	// 	return new RoomModel({
	// 		ref: room.ref,
	// 		capacity: room.capacity,
	// 		roomType: room.roomType,
	// 	});
	// }
	findByRef(ref: string): Promise<Room | null> {
		try{
			const room = RoomModel.findAll({
				where: {
					ref: ref,
				}
		});
		return Promise.resolve(room as unknown as Room);
		} catch {
			return Promise.reject('room not found');
		}
		// console.debug(ref);
		// throw new Error('Method not implemented.');
	}
	// getAllRooms(): Promise<Room> {
	// 	try {
	// 		const rooms = RoomModel.findAll({});
	// 		return Promise.resolve(rooms as unknown as Room);
	// 	} catch {
	// 		return Promise.reject('room not found');
	// 	}
	// }


	async getAllRooms(
		page: number,
		nbPerPage: number,
		nameFilter: string
	): Promise<RoomDTO> {
		let count = await RoomModel.count();

		nbPerPage = +nbPerPage;
		if (nbPerPage < 2) nbPerPage = 2;

		let pDTO = new RoomDTO();
		if (page < 1 || page > Math.round(nbPerPage / count) + 1 || isNaN(page)) {
			page = 1;
		}
		if (nameFilter == null || nameFilter == 'filter') {
			nameFilter = '';
		}
		pDTO.setPage(page);
		pDTO.setNbMaxPages(Math.round(count / nbPerPage));

		pDTO.setRooms(
			await RoomModel.findAll({
				limit: nbPerPage,
				offset: (page - 1) * nbPerPage,
				where: {
					[Op.or]: {
						firstName: {
							[Op.like]: '%' + nameFilter + '%',
						},
						lastName: {
							[Op.like]: '%' + nameFilter + '%',
						},
					},
				},
			})
		);
		return pDTO;
	}
	async getFilteredRoom(
		page: number,
		type: string,
		nbPerPage: number,
		name: string
	): Promise<RoomDTO> {
		if (name == null || name == 'filter') {
			name = '';
		}
		let count = await RoomModel.count({
			where: {
				roomType: type,
				[Op.or]: {
					ref: {
						[Op.like]: '%' + name + '%',
					},
					typeRoom: {
						[Op.like]: '%' + name + '%',
					},
				},
			},
		});

		nbPerPage = +nbPerPage;
		if (nbPerPage < 2) nbPerPage = 2;

		let pDTO = new RoomDTO();
		if (page < 1 || page > Math.round(nbPerPage / count) + 1 || isNaN(page)) {
			page = 1;
		}
		pDTO.setPage(page);
		pDTO.setNbMaxPages(Math.round(count / nbPerPage));
		console.log(name);
		if (name == null || name == 'filter') {
			name = '';
		}
		pDTO.setRooms(
			
				await RoomModel.findAll({
					limit: nbPerPage,
					offset: (page - 1) * nbPerPage,
					where: {
						roomType: type,
						[Op.or]: {
							ref: {
								[Op.like]: '%' + name + '%',
							},
							typeRoom: {
								[Op.like]: '%' + name + '%',
							},
						},
					},
				})
			);
		return pDTO;
	}

 }