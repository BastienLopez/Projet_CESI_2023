import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { updatePerson } from "../../domains/persons/persons.slice";

import { updateToken } from "../../domains/tokens/tokens.slice";

import parseJwt from "../../helpers/parseJwt";

import { login } from "../../services/authService";

import "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [username, password]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const token = await login(username, password);

      dispatch(updateToken(token));

      const parsedToken = await parseJwt(token.access_token);

      if (!parsedToken) {
        setError("Identifiant ou mot de passe incorrect.");
        return;
      }

      dispatch(
        updatePerson({
          code: parsedToken.code._code,
        })
      );

      navigate("/");
    } catch (error) {
      const apiError = error as Error;

      console.log(apiError);
      setError("Identifiant ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container bg-dark">
      <div className="auth-form bg-warning">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Connexion</h3>
          <div className="form-group mt-3">
            <label>Identifiant</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="mt-3 alert alert-danger">{error}</div>}
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-dark text-white"
              onClick={handleSubmit}
              disabled={isLoading || !!error}
            >
              {isLoading ? "Connexion..." : error ? "..." : "Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
