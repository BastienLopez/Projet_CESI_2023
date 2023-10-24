import React, { useState, useEffect } from "react";
import { Room } from "../../types/Room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import api from "../../helpers/api";

interface RoomFormProps {
  roomToModify: Room;
}

function RoomForm({ roomToModify }: RoomFormProps) {
  const roomRef: string = roomToModify.ref;
  const [room, setRoom] = useState<Room>(roomToModify);
  const [isRoomTypeChosen, setIsRoomTypeChosen] =
  React.useState<boolean>(false);
useEffect(() => {
  setIsRoomTypeChosen(isRoomTypeChosen);
}, [isRoomTypeChosen]);
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    if (name === "roomType") {
      setIsRoomTypeChosen(false);
      if (value !== "" || value !== null) {
        setIsRoomTypeChosen(true);
      } else {
        setRoom((prevState) => ({ ...prevState, roomType: "" }));
      }
    }
    setRoom((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (room.ref === roomRef) {
      api
        .put("/rooms", room)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //room.createdAt = new Date().toISOString();
      api
        .post("/rooms", room)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(room);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ref">Référence :</label>
        <input
          type="text"
          className="form-control"
          id="ref"
          name="ref"
          value={room.ref}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="capacity">Capacité :</label>
        <input
          type="number"
          className="form-control"
          id="capacity"
          name="capacity"
          value={room.capacity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="roomType">Type de salle :</label>
        <input
          type="text"
          id="roomType"
          className="form-control"
          name="roomType"
          value={room.roomType}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mt-3">
        <div className="col text-center ">
          {" "}
          <button type="submit" className="btn btn-lg btn-primary mt-1">
            <span className="me-2">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
}

export default RoomForm;
