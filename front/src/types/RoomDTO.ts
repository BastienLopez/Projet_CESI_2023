import { Room } from "./Room";

export type RoomDTO = {
  _rooms: Room[];
  _nbMaxPages: number;
  _page: number;
};
