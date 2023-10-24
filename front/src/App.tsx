import { connect, useSelector } from "react-redux";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { clearPerson, updatePerson } from "./domains/persons/persons.slice";

import { selectToken } from "./domains/tokens/tokens.selector";

import { clearToken, updateToken } from "./domains/tokens/tokens.slice";

import { Home } from "./pages/Home/Home";

import { Login } from "./pages/Login/Login";

import PersonViewAddEdit from "./pages/Person/PersonViewAddEdit";

import PromotionsTable from "./pages/Promotion/Promotion";

import RoomViewAddEdit from "./pages/Room1/RoomViewAddEdit";

import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { State } from "./store/store";

export function App() {
  const token = useSelector(selectToken);
  function HeaderView() {
    const location = useLocation();
    if (location.pathname === "/login") {
      return <span></span>;
    } else {
      return <Navbar />;
    }
  }
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderView />
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/"}
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path={"/person/vae"}
            element={token ? <PersonViewAddEdit /> : <Navigate to="/login" />}
          />
          <Route path={"/room/vae"} Component={RoomViewAddEdit} />
          <Route
            path={"/promotion"}
            element={token ? <PromotionsTable /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: State) => ({
  person: state.person,
  token: state.token,
});

const mapDispatchToProps = {
  updatePerson: updatePerson,
  clearPerson: clearPerson,
  updateToken: updateToken,
  clearToken: clearToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
