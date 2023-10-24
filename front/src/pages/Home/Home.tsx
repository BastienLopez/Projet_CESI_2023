import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPerson } from "../../domains/persons/persons.selector";
import { clearPerson } from "../../domains/persons/persons.slice";
import { clearToken } from "../../domains/tokens/tokens.slice";

export function Home() {
  const person = useSelector(selectPerson);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearPerson());
    dispatch(clearToken());

    navigate("/login");
  };

  return (
    <div className="Home">
      <h1>Home</h1>
      {person && <p>Bonjour utlisateur n°{person.code} !</p>}
      <Button onClick={logout}>Déconnexion</Button>
    </div>
  );
}
