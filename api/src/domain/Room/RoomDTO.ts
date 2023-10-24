import { RoomModel } from '../../infra/room/room.sequelize.repository';

export class RoomDTO {
	private _rooms: RoomModel[] = [];
	private _nbMaxPages: number = 1;
	private _page: number = 1;

	rooms() {
		return this._rooms;
	}
	setRooms(rooms: RoomModel[]) {
		this._rooms = rooms;
	}
	nbMaxPages() {
		return this._nbMaxPages;
	}
	setNbMaxPages(nbm: number) {
		this._nbMaxPages = nbm;
	}
	page() {
		return this._page;
	}
	setPage(page: number) {
		this._page = page;
	}
}
