"use client";
import { useState, useEffect } from "react";
import { adminApi, getImageUrl } from "../../../lib/api";
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
    <div className="space-y-10">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
            Gestion des Produits
          </h1>
          <p className="text-slate-500 text-lg">
            Ajoutez, supprimez et modifiez les articles de votre menu
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          {isAdding ? "✕ Annuler" : "＋ Ajouter un produit"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleAdd}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 overflow-hidden max-w-4xl"
          >
            <h3 className="text-lg font-black text-slate-800">Nouveau Produit</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Nom du produit</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium text-slate-800"
                  placeholder="Ex: Burger Bacon"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Catégorie</label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold text-slate-700 appearance-none"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Prix (FCFA)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium text-slate-800"
                  placeholder="3500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Image du produit</label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-orange-500/50 rounded-2xl p-3 transition-all bg-slate-50/50 flex items-center justify-center gap-2 h-[58px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-bold text-slate-600 truncate max-w-[200px]">
                    {formData.image ? formData.image.name : "Choisir une image"}
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl h-24 focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none font-medium text-slate-800"
                  placeholder="Ingrédients, taille, accompagnement..."
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-md"
            >
              Enregistrer le produit
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Produit</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Catégorie</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Prix</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {p.image_url ? (
                          <div className="w-14 h-14 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100/50 flex-shrink-0">
                            <Image src={getImageUrl(p.image_url)} alt={p.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">🍔</div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 text-base">{p.name}</p>
                          <p className="text-xs font-medium text-slate-400 truncate max-w-[240px] mt-0.5">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-black uppercase tracking-wider">
                        {p.category?.name}
                      </span>
                    </td>
                    <td className="p-6 font-mono font-black text-slate-700">
                      {p.price.toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold text-sm py-2.5 px-4 rounded-xl hover:bg-rose-50 transition-all"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold">Aucun produit trouvé dans le menu.</div>
          )}
        </div>
      )}
    </div>
  );
}
