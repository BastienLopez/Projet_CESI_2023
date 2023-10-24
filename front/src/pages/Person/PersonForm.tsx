import React, { useEffect } from "react";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import api from "../../helpers/api";

import { Person } from "../../types/Person";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PersonRole, PersonType } from "../../types/types";

function PersonForm({ personToModify }: { personToModify: Person }) {
  const personCode: string = personToModify.code;
  const [person, setPerson] = React.useState(personToModify);
  useEffect(() => {
    setPerson(personToModify);
  }, [personToModify]);
  const [isPersonTypeChosen, setIsPersonTypeChosen] =
    React.useState<boolean>(false);
  useEffect(() => {
    setIsPersonTypeChosen(isPersonTypeChosen);
  }, [isPersonTypeChosen]);

  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    if (name === "personType") {
      setIsPersonTypeChosen(false);
      if (value !== "" || value !== null) {
        setIsPersonTypeChosen(true);
      } else {
        setPerson((prevState) => ({ ...prevState, personRole: "" }));
      }
    }
    setPerson((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    person.updatedAt = new Date().toISOString();
    // eslint-disable-next-line prefer-const
    for (let key in person) {
      if (person[key] === null || person[key] === "") {
        if (key === "phone" && person.personType !== "INTERVENANT") {
          continue;
        } else if (key === "createdAt") {
          continue;
        } else {
          alert("vous devez remplir tous les champs");
          return;
        }
      }
    }
    if (person.code === personCode) {
      api
        .put("/person", person)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      person.createdAt = new Date().toISOString();
      api
        .post("/person", person)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(person);
  };
  return (
    <div>
      <hr></hr>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            disabled={person.code === personCode && personCode !== ""}
            value={person.code}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={person.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={person.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="personType">Person Type:</label>
          <select
            className="form-control"
            id="personType"
            name="personType"
            value={person.personType?.toString()}
            onChange={handleInputChange}
          >
            <option value="">Select a person type</option>
            <option value={PersonType[0]}>Internal</option>
            <option value={PersonType[1]}>Contractor</option>
            <option value={PersonType[2]}>Indepedant</option>
          </select>
        </div>
        {isPersonTypeChosen ? (
          <div className="form-group">
            <label htmlFor="personRole">Person Role:</label>
            <select
              className="form-control"
              id="personRole"
              name="personRole"
              value={person.personRole?.toString()}
              onChange={handleInputChange}
            >
              <option value="">Select a person role</option>
              <option
                disabled={
                  person.personType === PersonType[1].toString() ||
                  person.personType === PersonType[2].toString()
                }
                value={PersonRole[0]}
              >
                Pilot
              </option>
              <option value={PersonRole[1]}>Intervenant</option>
              <option
                value={PersonRole[2]}
                disabled={person.personType !== PersonType[0].toString()}
              >
                Administrator
              </option>
              <option
                value={PersonRole[3]}
                disabled={person.personType !== PersonType[0].toString()}
              >
                Student
              </option>
              <option
                value={PersonRole[4]}
                disabled={person.personType !== PersonType[0].toString()}
              >
                Heimdall
              </option>
            </select>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              Person Role:
              <br />
              Vous devez chosir un type pour la personne avant de choisir un
              role
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={person.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={person.password}
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
    </div>
  );
}

export default PersonForm;
