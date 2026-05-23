import React, { useState, useEffect } from "react";
import ModalEmpleado from "../components/ModalEmpleado";
import { useAuth } from "../context/AuthContext";
import { PencilIcon, Trash2Icon } from "lucide-react";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empleadoToEdit, setEmpleadoToEdit] = useState(null);
  const { authFetch } = useAuth();

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:8500/api/empleados"); 
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener la lista de empleados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (empleado = null) => {
    setEmpleadoToEdit(empleado);
    setShowModal(true);
  };

  const handleSaveSuccess = () => {
    setShowModal(false);
    setEmpleadoToEdit(null);
    fetchEmpleados();
  };

  const handleDelete = async (idEmpleado) => {
    if (!window.confirm(`¿Seguro de eliminar al empleado con ID ${idEmpleado}?`)) return;

    try {
      const res = await authFetch(`http://localhost:8500/api/empleados/${idEmpleado}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setEmpleados(empleados.filter((emp) => emp.idEmpleado !== idEmpleado));
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      alert("Fallo al eliminar el empleado.");
    }
  };


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h3>
        <button onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition">
          <i className="bi bi-person-plus-fill text-lg"></i>
          Agregar Empleado</button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-2xl">
        {loading ? (
          <p className="text-center py-4 text-gray-600">Cargando empleados...</p>
        ) : (
                <table className="min-w-full divide-y divide-indigo-500">
                  <thead className="bg-indigo-200">
                    <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.length > 0 ? (
                empleados.map((emp) => (
                  <tr key={emp.idEmpleado} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{emp.idEmpleado}</td>
                    <td className="px-4 py-3">{emp.user}</td>
                    <td className="px-4 py-3">{emp.username}</td>
                    <td className="px-4 py-3">{emp.rol?.rol}</td>
                    <td className="px-4 py-3 text-center flex justify-center gap-2">
                      {/* Botón Editar */}
                      <button onClick={() => handleOpenModal(emp)} title="Editar empleado">
                      <PencilIcon className="h-5 w-5 text-indigo-500 hover:text-indigo-700" />
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      {/* Botón Eliminar */}
                      <button onClick={() => handleDelete(emp.idEmpleado)} title="Eliminar empleado">
                        <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-700" />
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No hay empleados registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ModalEmpleado show={showModal} onClose={() => setShowModal(false)}
          onSave={handleSaveSuccess} empleadoData={empleadoToEdit}/>
      )}
    </div>
  );
}