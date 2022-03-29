import {
  // Redirect,
  Route,
  Router,
} from "react-router-dom";

import LocalesPage from "../components/seguridad/Locales";
import ColaboradoresPage from "../components/seguridad/Colaboradores";
import ImagenesPage from "../components/seguridad/Imagenes";
//import ControlIngresoPage from "../pages/ControlIngresoPage";
//import ControlCierrePage from "../pages/ControlCierrePage";
//import AgregarColaboradorPage from "../pages/AgregarColaboradorPage";

export default function AppRouter() {
  return (
    <Router>
      <Route exact path="/locales" component={LocalesPage} />
      <Route exact path="/colaboradores" component={ColaboradoresPage} />
      <Route exact path="/imagenes" component={ImagenesPage} />
    </Router>
  );
}
