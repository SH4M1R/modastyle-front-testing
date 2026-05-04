import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import Empleados from "./pages/Empleados";
import PrivateRoute from "./components/PrivateRoute";
import Reportes from "./pages/Reportes";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}

      <main
        className={`flex-1 transition-all duration-300 ${
          isLoginPage ? "ml-0" : "ml-[250px]"
        } p-4`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ventas" element={<Ventas />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;