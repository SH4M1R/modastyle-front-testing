import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  PowerIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

function Collapsible({ open, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [open]);

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
    >
      <div className="opacity-100 transition-opacity duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openAnalisis, setOpenAnalisis] = useState(false);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white shadow-xl flex flex-col justify-between">
      {/* Logo */}
      <div className="p-5 border-b border-gray-700 flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-xlindigo font-bold text-indigo-500 tracking-wide">
            YOURBRAND - ModaStyle
          </h2>
        </div>
      </div>

      {/* Usuario */}
      {usuario && (
        <div className="px-4 py-3 bg-gray-900 border-b border-gray-700 text-center">
          <p className="text-sm font-medium flex justify-center items-center gap-1">
            <UserIcon className="h-4 w-4 text-indigo-400" />
            {usuario.user} ({usuario.rol})
          </p>
        </div>
      )}

      {/* Navegación */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-2">
        <p className="text-indigo-400 uppercase text-xs font-semibold">
          General
        </p>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-700/40 rounded-md transition-colors"
        >
          <ChartBarIcon className="h-5 w-5 text-indigo-400" />
          <span>Dashboard</span>
        </Link>

        <Link to="/ventas"
          className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-700/40 rounded-md transition-colors"
        >
          <ShoppingCartIcon className="h-5 w-5 text-indigo-400" />
          <span>Ventas</span>
        </Link>
        {/* Administración */}
        <div>
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-700/40 transition-colors flex justify-between items-center"
            aria-expanded={openAdmin}
          >
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-indigo-400" />
              <span>Administración</span>
            </div>
          </button>
            <div className="ml-4 mt-1 space-y-1 py-2">
              <Link
                to="/empleados"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-indigo-700/40 transition-colors">
                <UserIcon className="h-5 w-5 text-indigo-400" />
                <span>Gestión de Empleados</span>
              </Link>
              <Link
                to="/Productos"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-indigo-700/40 transition-colors">
                <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-400" />
                <span>Gestión de Productos</span>
              </Link>
            </div>
        </div>
          <Link
            to="/reportes"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-indigo-700/40 transition-colors">
              <ChartBarIcon className="h-5 w-5 text-indigo-400" />
              <span>Reportes de Venta</span>
          </Link>
      </nav>

      {/* Cerrar sesión */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => logout()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors w-full font-semibold"
        >
          <PowerIcon className="h-5 w-5 text-white" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
