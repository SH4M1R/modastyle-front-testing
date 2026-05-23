import React, { useState } from 'react';
import axios from 'axios';

const API_CATEGORIES = 'http://localhost:8500/api/categorias';

export default function ModalCategoria({ open, onClose, onCreated }) {
  const [nombre, setNombre] = useState('');
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert('Ingrese nombre de categoría');
    setSaving(true);
    try {
      const payload = { categoria: nombre };
      await axios.post(API_CATEGORIES, payload);
      setNombre('');
      if (onCreated) onCreated();
    } catch (err) {
      console.error('Error creando categoria', err);
      alert('Error creando categoría');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-indigo-700">Agregar Categoría</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Nombre categoría</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border rounded px-2 py-1" />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">{saving ? 'Guardando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
