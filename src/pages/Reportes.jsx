import React, { useEffect, useState } from "react";
import { DocumentTextIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Reportes() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8500/api/ventas/listar")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setVentas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener ventas:", err);
        setError("No se pudo obtener las ventas. Revisa si el backend está corriendo.");
        setVentas([]);
        setLoading(false);
      });
  }, []);

  const abrirModal = (venta) => {
    setDetalleSeleccionado(venta);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setDetalleSeleccionado(null);
    setModalOpen(false);
  };

  const verBoleta = (idVenta) => {
    const url = `http://localhost:8500/api/ventas/${idVenta}/boleta`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-indigo-600 text-lg font-semibold">Cargando ventas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Reporte de Ventas</h2>

      {ventas.length === 0 ? (
        <p className="text-gray-700">No hay ventas registradas</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full divide-y divide-indigo-500">
                  <thead className="bg-indigo-200">
                    <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Cliente</th>
                <th className="py-2 px-3 text-left">Fecha</th>
                <th className="py-2 px-3 text-right">Total</th>
                <th className="py-2 px-3 text-center">Detalles</th>
                <th className="py-2 px-3 text-center">Boleta</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.idVenta} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 px-3">{venta.idVenta}</td>
                  <td className="py-2 px-3">{venta.clienteNombre}</td>
                  <td className="py-2 px-3">{new Date(venta.fechaVenta).toLocaleString()}</td>
                  <td className="py-2 px-3 text-right font-semibold">S/ {venta.total.toFixed(2)}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => abrirModal(venta)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded flex items-center justify-center mx-auto"
                    >
                      <EyeIcon className="h-5 w-5 mr-1" />
                      Ver
                    </button>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => verBoleta(venta.idVenta)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded flex items-center justify-center mx-auto"
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-1" />
                      Boleta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalles */}
      {modalOpen && detalleSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
            <button
              onClick={cerrarModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Detalles de la Venta #{detalleSeleccionado.idVenta}</h3>
            <p className="mb-4">
              Cliente: <b>{detalleSeleccionado.clienteNombre}</b> <br />
              DNI: {detalleSeleccionado.clienteDocumento} <br />
              Fecha: {new Date(detalleSeleccionado.fechaVenta).toLocaleString()}
            </p>
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-2 px-3 text-left text-sm">Producto</th>
                  <th className="py-2 px-3 text-center text-sm">Cantidad</th>
                  <th className="py-2 px-3 text-right text-sm">Precio</th>
                  <th className="py-2 px-3 text-right text-sm">Subtotal</th>
                  <th className="py-2 px-3 text-left text-sm">Pago</th>
                  <th className="py-2 px-3 text-right text-sm">Monto</th>
                  <th className="py-2 px-3 text-right text-sm">Vuelto</th>
                </tr>
              </thead>
              <tbody>
                {detalleSeleccionado.detalles.map((det, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-1 px-2 text-sm">{det.productoNombre}</td>
                    <td className="py-1 px-2 text-center text-sm">{det.cantidad}</td>
                    <td className="py-1 px-2 text-right text-sm">S/ {det.precio.toFixed(2)}</td>
                    <td className="py-1 px-2 text-right text-sm">S/ {det.subtotal.toFixed(2)}</td>
                    <td className="py-1 px-2 text-sm">{det.metodoPago}</td>
                    <td className="py-1 px-2 text-right text-sm">S/ {det.montoPagado?.toFixed(2) || 0}</td>
                    <td className="py-1 px-2 text-right text-sm">S/ {det.vuelto?.toFixed(2) || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
