import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalProducto from '../components/ModalProducto';
import ModalCategoria from '../components/ModalCategoria';
import { PencilIcon, TrashIcon, ArchiveBoxIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const API_PRODUCTS = 'http://localhost:8500/api/productos';
const API_CATEGORIES = 'http://localhost:8500/api/categorias';
const PAGE_SIZE = 20;

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showModalProducto, setShowModalProducto] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_CATEGORIES);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_PRODUCTS);
      const all = res.data || [];
      const filtered = all.filter(p => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          (p.producto || p.Producto || '') .toString().toLowerCase().includes(q) ||
          (p.descripcion || '') .toString().toLowerCase().includes(q) ||
          (p.talla || '') .toString().toLowerCase().includes(q) ||
          (p.color || '') .toString().toLowerCase().includes(q)
        );
      });

      const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      setTotalPages(pages);
      if (page > pages) setPage(1);
      const start = (page - 1) * PAGE_SIZE;
      const pageItems = filtered.slice(start, start + PAGE_SIZE);
      setProductos(pageItems);
    } catch (err) {
      console.error('Error fetching productos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [page, query]);

  const handleSaveProducto = async (producto, imagenFile) => {
    try {
      const form = new FormData();
      const jsonBlob = new Blob([JSON.stringify(producto)], { type: 'application/json' });
      form.append('producto', jsonBlob);
      if (imagenFile) form.append('imagen', imagenFile);

      if (producto.idProducto) {
        const res = await axios.put(`${API_PRODUCTS}/${producto.idProducto}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        const res = await axios.post(API_PRODUCTS, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await fetchProductos();
      setShowModalProducto(false);
      setEditingProducto(null);
    } catch (err) {
      console.error('Error saving producto', err);
      alert('Error al guardar el producto. Revisa la consola.');
    }
  };

  const handleDeleteProducto = async (id) => {
    if (!confirm('¿Eliminar producto? Esta acción no se puede deshacer.')) return;
    try {
      await axios.delete(`${API_PRODUCTS}/${id}`);
      await fetchProductos();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar.');
    }
  };

  const handleToggleEstado = async (producto) => {
    try {
      const updated = { ...producto, estado: !producto.estado };
      const form = new FormData();
      form.append('producto', new Blob([JSON.stringify(updated)], { type: 'application/json' }));
      await axios.put(`${API_PRODUCTS}/${producto.idProducto}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchProductos();
    } catch (err) {
      console.error(err);
      alert('Error al cambiar estado.');
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    try {
      const res = await axios.get(`${API_PRODUCTS}/${id}`);
      const prod = res.data;
      prod.stock = Number(newStock);
      const form = new FormData();
      form.append('producto', new Blob([JSON.stringify(prod)], { type: 'application/json' }));
      await axios.put(`${API_PRODUCTS}/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchProductos();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar stock');
    }
  };

  const handleCategoryCreated = async () => {
    await fetchCategories();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">GESTIÓN DE PRODUCTOS</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowModalCategoria(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-2xl shadow-sm hover:bg-indigo-700"
            >
              + Categoría
            </button>
            <button
              onClick={() => { setEditingProducto(null); setShowModalProducto(true); }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-2xl shadow-sm hover:bg-indigo-700"
            >
              + Producto
            </button>
          </div>
        </header>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex items-center gap-4 mb-4">
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar productos..."
              className="border rounded-md px-3 py-2 w-96 border-indigo-400 text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div className="text-sm text-gray-500">Resultados por página: {PAGE_SIZE}</div>
          </div>

          <div>
            {loading ? (
              <div className="p-6 text-center">Cargando...</div>
            ) : (
              <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full divide-y divide-indigo-500">
                  <thead className="bg-indigo-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">#</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Nombre</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Precio Venta</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Stock</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Categoría</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Imagen</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Estado</th>
                      <th className="px-4 py-2 text-left text-sm font-bold text-indigo-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {productos.map((p, idx) => (
                      <tr key={p.idProducto || idx}>
                        <td className="px-4 py-2 text-sm">{(page-1)*PAGE_SIZE + idx + 1}</td>
                        <td className="px-4 py-2 text-sm">{p.producto || p.Producto}</td>
                        <td className="px-4 py-2 text-sm">S/ {p.precioVenta || p.PrecioVenta}</td>
                        <td className="px-4 py-2 text-sm flex items-center gap-2">
                          <span>{p.stock}</span>
                          <button
                            onClick={async () => {
                              const nuevo = prompt('Nuevo stock', p.stock);
                              if (nuevo !== null) await handleUpdateStock(p.idProducto, nuevo);
                            }}
                            className="p-1 rounded border hover:bg-gray-50"
                            title="Modificar stock"
                          >
                            <ArchiveBoxIcon className="h-5 w-5 text-indigo-600" />
                          </button>
                        </td>
                        <td className="px-4 py-2 text-sm">{p.categoria?.categoria}</td>
                        <td className="px-4 py-2 text-sm">
                          <img src={`http://localhost:8500${p.imagen}`} alt={p.producto} className="h-10 w-10 object-cover rounded"/>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={!!p.estado} onChange={() => handleToggleEstado(p)} />
                            <span className="text-sm">{p.estado ? 'Activo' : 'Inactivo'}</span>
                          </label>
                        </td>
                        <td className="px-4 py-2 text-sm flex gap-2">
                          <button
                            onClick={() => { setEditingProducto(p); setShowModalProducto(true); }}
                            className="p-2 rounded-md hover:bg-gray-50"
                            title="Editar"
                          >
                            <PencilIcon className="h-5 w-5 text-indigo-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteProducto(p.idProducto)}
                            className="p-2 rounded-md hover:bg-gray-50"
                            title="Eliminar"
                          >
                            <TrashIcon className="h-5 w-5 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Página {page} de {totalPages}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="p-2 rounded-md border hover:bg-gray-50"
                  disabled={page === 1}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-indigo-600" />
                </button>
                <button
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-2 rounded-md border hover:bg-gray-50"
                  disabled={page === totalPages}
                >
                  <ChevronRightIcon className="h-5 w-5 text-indigo-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModalProducto && (
        <ModalProducto
          open={showModalProducto}
          onClose={() => { setShowModalProducto(false); setEditingProducto(null); }}
          onSave={handleSaveProducto}
          producto={editingProducto}
          categories={categories}
        />
      )}

      {showModalCategoria && (
        <ModalCategoria
          open={showModalCategoria}
          onClose={() => setShowModalCategoria(false)}
          onCreated={async () => { setShowModalCategoria(false); await handleCategoryCreated(); }}
        />
      )}
    </div>
  );
}