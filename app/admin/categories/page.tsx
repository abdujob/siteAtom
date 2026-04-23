"use client";
import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await adminApi.getCategories();
      setCategories(data);
    } catch (err) {
      alert("Erreur lors du chargement des catégories");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      await adminApi.createCategory({ name: newCatName });
      setNewCatName("");
      setIsAdding(false);
      loadCategories();
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette catégorie et tous ses produits ?")) return;
    try {
      await adminApi.deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestion des Catégories</h1>
          <p className="text-slate-500">Organisez vos produits par familles.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          {isAdding ? "✕ Annuler" : "＋ Ajouter une catégorie"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-100 space-y-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Nom de la catégorie</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="Ex: Burgers, Tacos..."
                />
              </div>
              <button 
                type="submit"
                className="bg-slate-900 text-white py-4 px-8 rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Confirmer l'ajout
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div 
              layout
              key={cat.id}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
                <p className="text-slate-500 text-sm">{cat.products?.length || 0} produits</p>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)}
                className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                🗑
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
