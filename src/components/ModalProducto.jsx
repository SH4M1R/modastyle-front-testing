import React, { useEffect, useState } from 'react';

export default function ModalProducto({ open, onClose, onSave, producto = null, categories = [] }) {
  const [form, setForm] = useState({
    idProducto: null,
    producto: '',
    precioCompra: '',
    precioVenta: '',
    stock: 0,
    categoria: null,
    descripcion: '',
    talla: '',
    color: '',
    genero: true,
    estado: true,
  });
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (producto) {
      setForm({
        idProducto: producto.idProducto,
        producto: producto.producto || producto.Producto || '',
        precioCompra: producto.precioCompra || producto.PrecioCompra || '',
        precioVenta: producto.precioVenta || producto.PrecioVenta || '',
        stock: producto.stock || 0,
        categoria: producto.categoria || null,
        descripcion: producto.descripcion || '',
        talla: producto.talla || '',
        color: producto.color || '',
        genero: typeof producto.genero === 'boolean' ? producto.genero : true,
        estado: typeof producto.estado === 'boolean' ? producto.estado : true,
      });
      setImagenFile(null);
    } else {
      setForm({
        idProducto: null,
        producto: '',
        precioCompra: '',
        precioVenta: '',
        stock: 0,
        categoria: categories[0] || null,
        descripcion: '',
        talla: '',
        color: '',
        genero: true,
        estado: true,
      });
      setImagenFile(null);
    }
  }, [producto, categories]);

  if (!open) return null;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idProducto: form.idProducto,
      producto: form.producto,
      precioCompra: form.precioCompra === '' ? null : Number(form.precioCompra),
      precioVenta: form.precioVenta === '' ? null : Number(form.precioVenta),
      stock: Number(form.stock),
      categoria: form.categoria,
      descripcion: form.descripcion,
      talla: form.talla,
      color: form.color,
      genero: !!form.genero,
      estado: !!form.estado,
    };

    await onSave(payload, imagenFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-indigo-700">{form.idProducto ? 'EDITAR PRODUCTO' : 'AGREGAR PRODUCTO'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm">Nombre</label>
              <input required value={form.producto} onChange={e => handleChange('producto', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Categoría</label>
              <select value={form.categoria?.idCategoria || ''} onChange={e => {
                const found = categories.find(c => String(c.idCategoria) === String(e.target.value));
                handleChange('categoria', found || null);
              }} className="w-full border rounded px-2 py-1">
                <option value="">-- Seleccionar --</option>
                {categories.map(c => (
                  <option key={c.idCategoria} value={c.idCategoria}>{c.categoria}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm">Precio Compra</label>
              <input type="number" step="0.01" value={form.precioCompra} onChange={e => handleChange('precioCompra', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Precio Venta</label>
              <input type="number" step="0.01" value={form.precioVenta} onChange={e => handleChange('precioVenta', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Stock</label>
              <input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Talla</label>
              <input value={form.talla} onChange={e => handleChange('talla', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Color</label>
              <input value={form.color} onChange={e => handleChange('color', e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm">Género</label>
              <select value={form.genero ? 'M' : 'F'} onChange={e => handleChange('genero', e.target.value === 'M')} className="w-full border rounded px-2 py-1">
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm">Estado</label>
              <select value={form.estado ? '1' : '0'} onChange={e => handleChange('estado', e.target.value === '1')} className="w-full border rounded px-2 py-1">
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm">Descripción</label>
            <textarea value={form.descripcion} onChange={e => handleChange('descripcion', e.target.value)} className="w-full border rounded px-2 py-1" rows={3}></textarea>
          </div>

          <div>
            <label className="block text-sm">Imagen</label>
            <input type="file" accept="image/*" onChange={e => setImagenFile(e.target.files?.[0] || null)} />
            {producto?.imagen && (
              <div className="mt-2 text-sm">Imagen actual: {producto.imagen}</div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-red-600 text-red-600 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
