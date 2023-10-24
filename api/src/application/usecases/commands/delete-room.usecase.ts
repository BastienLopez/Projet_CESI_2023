import { Room } from "../../../domain/Room/Room";
import { RoomRepository } from "../../room.repository";

export type RoomCommand = {
  ref: Room;
}

export class DeleteRoomUsecase {
  constructor(
		private readonly _roomRepository: RoomRepository,
		//private readonly _notifier: Notifier
	) {}

  async handle(roomCommand: RoomCommand) {
    await this._roomRepository.delete(roomCommand.ref);

    // await this._notifier.notify(
    //   ["test@gmail.com"],
    //   'Welcome',
    //   'Welcome to our platform'
    // );
  }
}
