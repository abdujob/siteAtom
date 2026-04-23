"use client";
import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null as File | null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pData, cData] = await Promise.all([
        adminApi.getProducts(),
        adminApi.getCategories(),
      ]);
      setProducts(pData);
      setCategories(cData);
    } catch (err) {
      alert("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category_id", formData.category_id);
    if (formData.image) data.append("image", formData.image);

    try {
      await adminApi.createProduct(data);
      setFormData({ name: "", description: "", price: "", category_id: "", image: null });
      setIsAdding(false);
      loadData();
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await adminApi.deleteProduct(id);
      loadData();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestion des Produits</h1>
          <p className="text-slate-500">Ajoutez et modifiez les articles de votre menu.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          {isAdding ? "✕ Annuler" : "＋ Ajouter un produit"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-100 space-y-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Nom du produit</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Burger Bacon"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Catégorie</label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Prix (FCFA)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="3500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Image</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                  className="w-full bg-slate-50 border-none p-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Détails du produit..."
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              Enregistrer le produit
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 font-bold uppercase text-xs tracking-widest text-slate-400">Produit</th>
              <th className="p-6 font-bold uppercase text-xs tracking-widest text-slate-400">Catégorie</th>
              <th className="p-6 font-bold uppercase text-xs tracking-widest text-slate-400">Prix</th>
              <th className="p-6 font-bold uppercase text-xs tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    {p.image_url ? (
                      <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-slate-100">
                        <Image src={`http://localhost:8000${p.image_url}`} alt={p.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">🍔</div>
                    )}
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px]">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {p.category?.name}
                  </span>
                </td>
                <td className="p-6 font-mono font-bold text-slate-700">
                  {p.price} FCFA
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-600 transition-colors py-2 px-4 rounded-lg hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && !loading && (
          <div className="p-20 text-center text-slate-400">Aucun produit trouvé.</div>
        )}
      </div>
    </div>
  );
}
