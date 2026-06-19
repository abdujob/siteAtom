"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "../../lib/api";
import { motion } from "framer-motion";

interface DayStat {
  date: string;
  count: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0 });
  const [orderStats, setOrderStats] = useState<{
    today: { orders: number; revenue: number };
    weekly: DayStat[];
  } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [cats, prods, orders] = await Promise.all([
          adminApi.getCategories(),
          adminApi.getProducts(),
          adminApi.getOrderStats(),
        ]);
        setStats({ categories: cats.length, products: prods.length });
        setOrderStats(orders);
      } catch (err) {
        console.error("Failed to load stats");
      }
    }
    loadStats();
  }, []);

  const maxRevenue = orderStats?.weekly
    ? Math.max(...orderStats.weekly.map((d) => d.revenue), 1)
    : 1;

  const dayLabel = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("fr-FR", { weekday: "short" });
  };

  return (
    <div className="space-y-10">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
            Tableau de Bord
          </h1>
          <p className="text-slate-500 text-lg">
            Vue d&apos;ensemble et performance de votre borne de commande
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-600">Mise à jour en direct</span>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
            label: "Catégories",
            value: stats.categories,
            textColor: "text-orange-600",
            bg: "bg-orange-50",
            borderColor: "hover:border-orange-500/30",
            link: "/admin/categories",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ),
            label: "Produits",
            value: stats.products,
            textColor: "text-amber-600",
            bg: "bg-amber-50",
            borderColor: "hover:border-amber-500/30",
            link: "/admin/products",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            ),
            label: "Commandes aujourd'hui",
            value: orderStats?.today.orders ?? "0",
            textColor: "text-rose-600",
            bg: "bg-rose-50",
            borderColor: "hover:border-rose-500/30",
            link: "/admin/orders",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            label: "Chiffre d'Affaires",
            value: orderStats
              ? `${orderStats.today.revenue.toLocaleString("fr-FR")} F`
              : "0 F",
            textColor: "text-emerald-600",
            bg: "bg-emerald-50",
            borderColor: "hover:border-emerald-500/30",
            link: "/admin/orders",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 ${s.borderColor} hover:shadow-md transition-all duration-300`}
          >
            <Link href={s.link} className="block">
              <div
                className={`w-12 h-12 ${s.bg} ${s.textColor} rounded-2xl flex items-center justify-center mb-4`}
              >
                {s.icon}
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Graphique ventes 7 jours */}
      {orderStats?.weekly && (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Statistiques Hebdomadaires
              </h2>
              <p className="text-sm text-slate-500">Chiffre d&apos;affaires des 7 derniers jours</p>
            </div>
            <span className="text-xs font-extrabold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">FCFA (XOF)</span>
          </div>
          
          <div className="flex items-end gap-3 h-48 pt-6 border-b border-slate-50">
            {orderStats.weekly.map((day, i) => {
              const height = (day.revenue / maxRevenue) * 100;
              const isToday =
                day.date === new Date().toISOString().split("T")[0];
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                >
                  {/* Tooltip value */}
                  <span className="text-[10px] font-black text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-100 px-1.5 py-0.5 rounded shadow-sm">
                    {day.revenue.toLocaleString("fr-FR")} F
                  </span>
                  
                  {/* Bar */}
                  <div className="w-full flex justify-center">
                    <div
                      className={`w-full max-w-[24px] rounded-t-xl transition-all duration-500 ease-out ${
                        isToday 
                          ? "bg-gradient-to-t from-orange-600 to-red-500 shadow-lg shadow-orange-500/20" 
                          : "bg-slate-200 hover:bg-orange-300"
                      }`}
                      style={{ height: `${Math.max(height, 6)}px`, minHeight: 6 }}
                      title={`${day.date}: ${day.revenue} F (${day.count} commandes)`}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isToday ? "text-orange-600" : "text-slate-400"
                    }`}
                  >
                    {dayLabel(day.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions rapides */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 rounded-[3rem] p-10 text-white relative overflow-hidden border border-slate-900 shadow-xl">
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-orange-500/20">
            Gestion Simplifiée
          </span>
          <h2 className="text-3xl font-black mb-3 tracking-tight">
            Pilotez votre restaurant en temps réel
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Modifiez vos tarifs, ajoutez des catégories ou contrôlez l&apos;état des commandes instantanément depuis cette interface.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/admin/products"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Gérer les produits
            </Link>
            <Link
              href="/admin/orders"
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold border border-slate-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Voir les commandes
            </Link>
          </div>
        </div>
        {/* Abstract vector glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500 to-red-500/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/20 blur-[50px] rounded-full opacity-30 pointer-events-none" />
      </div>
    </div>
  );
}
