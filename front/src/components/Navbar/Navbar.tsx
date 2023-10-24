import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPerson } from "../../domains/persons/persons.selector";

function Navbar() {
  const person = useSelector(selectPerson);
  return (
    <div className="container-fluid">
      <div className="row mt-2 bg-secondary p-1">
        <div className="col">
          <img src="/lg_cesi.png" alt="" width={40} height={40} />
        </div>
        <div className="col text-end">{person ? person.code : ""}</div>
      </div>
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/person/vae">
                    Utilisateurs
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/promotion">
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/room/vae">
                    Salles
                  </Link>
                </li>
                <li></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
