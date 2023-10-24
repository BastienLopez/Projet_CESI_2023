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

import { Person } from "../../types/Person";

import Loader from "../Loader/Loader";

import "reactjs-popup/dist/index.css";

import ConfirmationPopup from "./ConfirmationPopup";

import { PersonDTO } from "../../types/PersonDTO";

import { PersonRole } from "../../types/types";

import PersonForm from "./PersonForm";

function VAEPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<PersonDTO>({
    _persons: [],
    _nbMaxPages: 1,
    _page: 1,
  });
  const [personToUpdate, setPersonToUpdate] = useState<Person | null>(null);
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

  function addNewUser() {
    setPersonToUpdate({
      code: "",
      firstName: "",
      lastName: "",
      personType: "",
      personRole: "",
      phone: "",
      password: "",
      createdAt: "",
      updatedAt: "",
    });
    setOpenForm(true);
  }

  async function loadData() {
    setLoading(true);
    let route = "";
    if (roleFilter === "Pas de filtre" || roleFilter === "") {
      route =
        "/person/all/page/" +
        nbPage +
        "/" +
        nbPerPage +
        "/" +
        (nameFilter !== "" ? nameFilter : "filter");
    } else {
      route =
        "/person/all/page/" +
        nbPage +
        "/role/" +
        roleFilter +
        "/" +
        nbPerPage +
        "/" +
        (nameFilter !== "" ? nameFilter : "filter");
    }
    const response = await api.get(route);
    if (response.data) {
      setData(response.data);
      setPages(
        Array.from(Array(response.data._nbMaxPages).keys()).map((x) => x + 1)
      );
      setLoading(false);
    } else {
      console.error("no data received");
    }

    //redirect home
  }

  function getRoles(): string[] {
    return Object.keys(PersonRole).filter((role) => {
      return isNaN(Number(role));
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

  function updatePerson(person: Person) {
    setPersonToUpdate(person);
    setOpenForm(true);
  }

  function deletePerson(person: Person) {
    api
      .delete("/person", { data: person })
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
              <h1 className="Title">Utilisateurs cesi</h1>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xs-4 col-md-4">
              <label className="control-label" htmlFor="role">
                Role
              </label>
              <select
                className="form-control"
                id="role"
                onChange={handleRoleInputChange}
                value={roleFilter}
              >
                <option value="Pas de filtre">Pas de filtre</option>
                {getRoles().map((role: string) => {
                  return <option value={role}>{role}</option>;
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
                Nom
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
                  onClick={addNewUser}
                  className="btn btn-success
          "
                >
                  <span className="me-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Ajouter un utilisateur
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
                  <PersonForm personToModify={personToUpdate as Person} />
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
      {data._persons.length > 0 ? (
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
                      <th className="col bg-secondary">Code</th>
                      <th className="col bg-secondary">Nom</th>
                      <th className="col bg-secondary">Prénom</th>
                      <th className="col bg-secondary">Téléphone</th>
                      <th className="col bg-secondary">Role</th>
                      <th className="col bg-secondary">Type</th>
                      <th className="col bg-secondary">Date de création</th>
                      <th className="col bg-secondary">Date de modification</th>
                      <th className="col bg-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data._persons.map((person: Person) => {
                      return (
                        <tr key={person.code}>
                          <th className="col">{person.code}</th>
                          <td>{person.firstName}</td>
                          <td>{person.lastName}</td>
                          <td>{person.phone}</td>
                          {person.personRole !== null &&
                          person.personRole !== "" ? (
                            <td>{person.personRole}</td>
                          ) : (
                            <td></td>
                          )}
                          {person.personType !== null &&
                          person.personType !== "" ? (
                            <td>{person.personType}</td>
                          ) : (
                            <td></td>
                          )}
                          <td>{person.createdAt.split("T")[0]}</td>
                          <td>{person.updatedAt.split("T")[0]}</td>
                          <td className="text-nowrap">
                            <button
                              onClick={updatePerson.bind(null, person)}
                              className="btn btn-primary me-2"
                            >
                              <FontAwesomeIcon icon={faGear} />
                            </button>
                            <ConfirmationPopup
                              onConfirm={() => deletePerson(person)}
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
            <h2 className="text-center">Aucun utilisateur</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default VAEPage;
