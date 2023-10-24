import { RoomType } from '../types';

export class Room {
	constructor(
		private _ref: string,
		private _capacity: number,
		private _roomType: RoomType
	) {
		if (_ref === undefined || _ref === null || _ref.length < 0) {
			throw new Error('Room ref must be defined');
		}

		if (_capacity === undefined || _capacity === null || _capacity < 0) {
			throw new Error('Room capacity must be defined');
		}
if(_roomType === null || _roomType === undefined){
			throw new Error('Room type must be defined');
		}
	}
	ref(): string {
		return this._ref;
	}

	setCapacity(capacity: number) {
		this._capacity = capacity;
	}

	capacity(): number {
		return this._capacity;
	}

	roomType(): RoomType{
		return this._roomType;
	}

	// setRoomType(roomType: RoomType) {
	// 	this._roomType = roomType;
	// }
	getRoomType(): RoomType {
		return this._roomType;
	}
	updateCapacity(capacity: number) {
		if(capacity === 0){
			throw new Error('Capacity must be positive');
		} 
		this._capacity = capacity;
	}
	updateRoomType(roomType: RoomType) {
		if(roomType !== RoomType.Amphiteatre && roomType !== RoomType.Box && roomType !== RoomType.InformaticRoom && roomType !== RoomType.MeetingRoom  && roomType !== RoomType.NumeriLab){
			throw new Error('Room type must be defined');
		}
	}
}
