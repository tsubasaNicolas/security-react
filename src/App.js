import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./components/Register";
import ColaboradoresPage from "./components/seguridad/Colaboradores";
//import LayoutApp from "./components/seguridad/LayoutApp";
import LocalesPage from "./components/seguridad/Locales";
import ImagenesPage from "./components/seguridad/Imagenes";
import { AuthProvider } from "./context/authContext";
import "antd/dist/antd.css";
function App() {
  return (
    <div className="bg-slate-300 h-screen text-white flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locales"
            element={
              <ProtectedRoute>
                <LocalesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colaboradores"
            element={
              <ProtectedRoute>
                <ColaboradoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imagenes"
            element={
              <ProtectedRoute>
                <ImagenesPage />
              </ProtectedRoute>
            }
          />
          v
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
<script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>;
