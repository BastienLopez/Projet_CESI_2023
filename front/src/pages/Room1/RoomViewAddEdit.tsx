import {
  faCircleXmark,
  faGear,
  faMagnifyingGlass,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import api from "../../helpers/api";

import { Room } from "../../types/Room";

import Loader from "../Loader/Loader";

import "reactjs-popup/dist/index.css";

import ConfirmationPopup from "./ConfirmationPopup";

import { RoomDTO } from "../../types/RoomDTO";

import { RoomType } from "../../types/types";

import RoomForm from "./RoomForm";

function VAEPage1() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RoomDTO>({
    _rooms: [],
    _nbMaxPages: 1,
    _page: 1,
  });
  const [roomToUpdate, setRoomToUpdate] = useState<Room | null>(null);
  const [isFormOpen, setOpenForm] = useState<boolean>(false);
  const [nbPage, setNbpage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [nbPerPage, setNbPerpage] = useState<number>(10);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [cleanFilter, setCleanFilter] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [nbPage, cleanFilter]);

  function addNewRoom() {
    setRoomToUpdate({
      ref:"",
      capacity:0,
      roomType:"",
    });
    setOpenForm(true);
  }

  async function loadData() {
    setLoading(true);
    let route = "";
    if (roleFilter === "Pas de filtre" || roleFilter === "") {
      route =
        "/rooms/all/page/" +
        nbPage +
        "/" +
        nbPerPage +
        "/" +
        (nameFilter !== "" ? nameFilter : "filter");
    } else {
      route =
        "/rooms/all/page/" +
        nbPage +
        "/type/" +
        roleFilter +
        "/" +
        nbPerPage +
        "/" +
        (nameFilter !== "" ? nameFilter : "filter");
    }
    try {
      const response = await api.get(route);
      if (response.data) {
        setData(response.data);
        setPages(Array.from(Array(response.data._nbMaxPages).keys()).map((x) => x + 1));
        setLoading(false);
      } else {
        console.error("no data received");
      }
    } catch (error) {
      console.error("Axios error:", error);
      setLoading(false);
    }
  
    //redirect home 
  }
  

  function getRoles(): string[] {
    return Object.keys(RoomType).filter((type) => {
      return isNaN(Number(type));
    });
  }

  const handleRoleInputChange = (event: { target: { value: string } }) => {
    setRoleFilter(event.target.value);
  };

  const handleNbPerPageInputChange = (event: { target: { value: string } }) => {
    setNbPerpage(+event.target.value);
  };

  const handlenameFilterChange = (event: { target: { value: string } }) => {
    setNameFilter(event.target.value);
  };

  function updateRoom(room: Room) {
    setRoomToUpdate(room);
    setOpenForm(true);
  }

  function deleteRoom(room: Room) {
    api
      .delete("/rooms", { data: room })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function cleanFilters() {
    setLoading(true);
    setRoleFilter("");
    setNbPerpage(10);
    setNameFilter("");
    setCleanFilter(!cleanFilter);
  }

  function filtersChaged() {
    if (nbPerPage < 2) {
      setNbPerpage(2);
    }
    loadData();
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="container-fluid">
      <div className="row mt-2 bg-warning bg-opacity-25">
        <div className="col">
          <div className="row text-center">
            <div className="col">
              <h1 className="Title">Salles cesi</h1>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xs-4 col-md-4">
              <label className="control-label" htmlFor="role">
                Type de salle
              </label>
              <select
                className="form-control"
                id="role"
                onChange={handleRoleInputChange}
                value={roleFilter}
              >
                <option value="Pas de filtre">Pas de filtre</option>
                {getRoles().map((type: string) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
            <div className="form-group col-xs-4 col-md-4">
              <label className="control-label" htmlFor="limitPerPage">
                Limite par page (2 minimum)
              </label>
              <input
                className="form-control"
                id="limitPerPage"
                type="number"
                min={2}
                onChange={handleNbPerPageInputChange}
                value={nbPerPage}
              />
            </div>
            <div className="form-group col-xs-4 col-md-4">
              <label className="control-label" htmlFor="name">
                Référence
              </label>
              <input
                className="form-control"
                id="name"
                type="text"
                onChange={handlenameFilterChange}
                value={nameFilter}
              />
            </div>
          </div>
          <div className="row mt-3 text-end justify-content-end">
            <div className="col-auto align-self-end ">
              <button className="btn btn-warning" onClick={cleanFilters}>
                <span className="me-2">
                  <FontAwesomeIcon icon={faX} />
                </span>
                Annuler
              </button>
            </div>
            <div className="col-auto align-self-end ">
              <button className="btn btn-primary" onClick={filtersChaged}>
                <span className="me-2">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                Filtrer
              </button>
            </div>
          </div>

          <div className="row mt-3 mb-2">
            <div className="col ">
              {isFormOpen ? (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setOpenForm(false);
                  }}
                >
                  <span className="me-2">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </span>
                  Annuler
                </button>
              ) : (
                <button
                  onClick={addNewRoom}
                  className="btn btn-success"
          
                >
                  <span className="me-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Ajouter une salle
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {isFormOpen ? (
            <div>
              <div className="row">
                <div className="col">
                  <RoomForm roomToModify={roomToUpdate as Room} />
                </div>
              </div>
            </div>
          ) : (
            <div className="row fixed-bottom">
              <div className="col text-center mb-3">
                {pages.map((page) => {
                  return (
                    <button
                      key={page}
                      className={
                        "btn btn-sm me-2" +
                        (page === nbPage
                          ? " disabled btn-primary"
                          : " btn-secondary")
                      }
                      onClick={() => {
                        setNbpage(page);
                      }}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {data._rooms.length > 0 ? (
        <div className="row mt-5">
          <div className="col">
            <div className="row">
              <div className="col">
                <hr></hr>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <table className="table table-responsive table-striped">
                  <thead>
                    <tr>
                      <th className="col">Référence</th>
                      <th className="col">Capacité</th>
                      <th className="col">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data._rooms.map((room: Room) => {
                      return (
                        <tr key={room.ref}>
                          <th className="col">{room.ref}</th>
                          <td>{room.capacity}</td>
                          
                          {room.roomType !== null &&
                          room.roomType !== "" ? (
                            <td>{room.roomType}</td>
                          ) : (
                            <td></td>
                          )}
                          
                          <td className="text-nowrap">
                            <button
                              onClick={updateRoom.bind(null, room)}
                              className="btn btn-primary me-2"
                            >
                              <FontAwesomeIcon icon={faGear} />
                            </button>
                            <ConfirmationPopup
                              onConfirm={() => deleteRoom(room)}
                            ></ConfirmationPopup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <h2 className="text-center">Aucune salle</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default VAEPage1;
