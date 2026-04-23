"use client";
import { useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const [cats, prods] = await Promise.all([
          adminApi.getCategories(),
          adminApi.getProducts()
        ]);
        setStats({
          categories: cats.length,
          products: prods.length
        });
      } catch (err) {
        console.error("Failed to load stats");
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Tableau de Bord</h1>
        <p className="text-slate-500 text-lg">Bienvenue dans l'administration de votre borne Atom.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-6">📁</div>
          <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Catégories</h3>
          <p className="text-5xl font-black text-slate-900">{stats.categories}</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-6">🍔</div>
          <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Produits actifs</h3>
          <p className="text-5xl font-black text-slate-900">{stats.products}</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-6">✨</div>
          <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">État Borne</h3>
          <p className="text-4xl font-black text-green-600">EN LIGNE</p>
        </motion.div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Gérez votre menu en quelques clics</h2>
          <p className="text-slate-400 max-w-xl text-lg mb-8">
            Toutes les modifications effectuées ici sont répercutées instantanément 
            sur votre borne de commande.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Accéder aux produits</button>
            <button className="bg-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">Voir la borne</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
