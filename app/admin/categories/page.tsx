"use client";
import { useState, useEffect } from "react";
import { adminApi, getImageUrl } from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState<File | null>(null);
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

    const formData = new FormData();
    formData.append("name", newCatName);
    if (newCatImage) {
      formData.append("image", newCatImage);
    }

    try {
      await adminApi.createCategory(formData);
      setNewCatName("");
      setNewCatImage(null);
      setIsAdding(false);
      loadCategories();
    } catch (err) {
      alert("Erreur lors de l'ajout de la catégorie");
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
    <div className="space-y-10">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
            Gestion des Catégories
          </h1>
          <p className="text-slate-500 text-lg">
            Organisez et structurez le menu de votre restaurant
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          {isAdding ? "✕ Annuler" : "＋ Ajouter une catégorie"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleAdd}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 overflow-hidden max-w-2xl"
          >
            <h3 className="text-lg font-black text-slate-800">Nouvelle Catégorie</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Nom de la catégorie</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium"
                  placeholder="Ex: Burgers, Pizzas, Boissons..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Image d&apos;illustration</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-orange-500/50 rounded-2xl p-6 transition-all bg-slate-50/50 flex flex-col items-center justify-center gap-2 relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCatImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {newCatImage ? newCatImage.name : "Cliquez ou glissez une image ici"}
                  </span>
                  <span className="text-xs text-slate-400">Format JPG, PNG, WEBP (Max: 2Mo)</span>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-md"
            >
              Créer la catégorie
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div 
              layout
              key={cat.id}
              className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {cat.icon ? (
                  <div className="w-16 h-16 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                    <Image 
                      src={getImageUrl(cat.icon)} 
                      alt={cat.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    📁
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{cat.name}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                    {cat.products?.length || 0} produits
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => handleDelete(cat.id)}
                className="w-10 h-10 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white transition-all shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </motion.div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-400 font-bold">
              Aucune catégorie pour le moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
