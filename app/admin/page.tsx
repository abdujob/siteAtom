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
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
          Tableau de Bord
        </h1>
        <p className="text-slate-500 text-lg">
          Vue d&apos;ensemble de votre borne S&apos;TACOS
        </p>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            icon: "📁",
            label: "Catégories",
            value: stats.categories,
            bg: "bg-blue-50",
            link: "/admin/categories",
          },
          {
            icon: "🍔",
            label: "Produits",
            value: stats.products,
            bg: "bg-orange-50",
            link: "/admin/products",
          },
          {
            icon: "🧾",
            label: "Commandes aujourd'hui",
            value: orderStats?.today.orders ?? "—",
            bg: "bg-purple-50",
            link: "/admin/orders",
          },
          {
            icon: "💰",
            label: "CA aujourd'hui",
            value: orderStats
              ? `${orderStats.today.revenue.toLocaleString("fr-FR")} F`
              : "—",
            bg: "bg-green-50",
            link: "/admin/orders",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <Link href={s.link} className="block">
              <div
                className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-xl mb-4`}
              >
                {s.icon}
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Graphique ventes 7 jours */}
      {orderStats?.weekly && (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Ventes — 7 derniers jours
          </h2>
          <div className="flex items-end gap-3 h-40">
            {orderStats.weekly.map((day, i) => {
              const height = (day.revenue / maxRevenue) * 100;
              const isToday =
                day.date === new Date().toISOString().split("T")[0];
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-bold text-slate-500">
                    {day.revenue > 0
                      ? `${(day.revenue / 1000).toFixed(0)}k`
                      : ""}
                  </span>
                  <div className="w-full flex justify-center">
                    <div
                      className={`w-full rounded-xl transition-all ${
                        isToday ? "bg-orange-500" : "bg-slate-200"
                      }`}
                      style={{ height: `${Math.max(height, 4)}%`, minHeight: 4 }}
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
      <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3">
            Gérez votre menu en quelques clics
          </h2>
          <p className="text-slate-400 max-w-xl mb-6">
            Toutes les modifications sont répercutées instantanément sur votre
            borne de commande.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/admin/products"
              className="bg-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
            >
              Gérer les produits
            </Link>
            <Link
              href="/admin/orders"
              className="bg-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Voir les commandes
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
