"use client";
import { useEffect, useState } from "react";
import { adminApi } from "../../../lib/api";
import { motion } from "framer-motion";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  options: string[];
}

interface Order {
  id: number;
  order_number: string;
  items: OrderItem[];
  total: string;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, [selectedDate]);

  async function loadOrders() {
    setLoading(true);
    try {
      const data = await adminApi.getOrders(selectedDate);
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = orders.reduce(
    (sum, o) => sum + parseFloat(o.total),
    0
  );

  const paymentIcon = (method: string) =>
    method === "wave" ? "📱" : "💵";

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Commandes
          </h1>
          <p className="text-slate-500 mt-1">
            Historique des commandes de la borne
          </p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-slate-200 rounded-2xl px-5 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Stats du jour */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl mb-4">
            🧾
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Commandes
          </p>
          <p className="text-4xl font-black text-slate-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl mb-4">
            💰
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Chiffre d'affaires
          </p>
          <p className="text-4xl font-black text-slate-900">
            {totalRevenue.toLocaleString("fr-FR")} F
          </p>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl mb-4">
            📊
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Panier moyen
          </p>
          <p className="text-4xl font-black text-slate-900">
            {orders.length > 0
              ? Math.round(totalRevenue / orders.length).toLocaleString("fr-FR")
              : 0}{" "}
            F
          </p>
        </div>
      </div>

      {/* Liste des commandes */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-slate-100">
          <p className="text-6xl mb-4">🧾</p>
          <p className="text-xl font-bold text-slate-600">
            Aucune commande pour cette date
          </p>
          <p className="text-slate-400 mt-2">
            Les commandes passées sur la borne apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* En-tête de commande */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-sm">
                    {order.order_number}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {order.items.length} article
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-slate-400">
                      {formatTime(order.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">
                    {paymentIcon(order.payment_method)}{" "}
                    {order.payment_method === "wave" ? "Wave" : "Espèces"}
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {parseFloat(order.total).toLocaleString("fr-FR")} F
                  </span>
                  <span className="text-slate-400">
                    {expandedOrder === order.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {/* Détail commande */}
              {expandedOrder === order.id && (
                <div className="border-t border-slate-100 p-5 bg-slate-50">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                        <th className="text-left pb-2">Article</th>
                        <th className="text-center pb-2">Qté</th>
                        <th className="text-right pb-2">Prix unit.</th>
                        <th className="text-right pb-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, j) => (
                        <tr key={j} className="border-b border-slate-100 last:border-0">
                          <td className="py-2">
                            <p className="font-semibold text-slate-800">
                              {item.name}
                            </p>
                            {item.options?.length > 0 && (
                              <p className="text-xs text-slate-400">
                                {item.options.join(", ")}
                              </p>
                            )}
                          </td>
                          <td className="py-2 text-center text-slate-600">
                            ×{item.quantity}
                          </td>
                          <td className="py-2 text-right text-slate-600">
                            {item.price.toLocaleString("fr-FR")} F
                          </td>
                          <td className="py-2 text-right font-bold text-slate-800">
                            {item.total.toLocaleString("fr-FR")} F
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="pt-3 font-black text-right text-slate-700">
                          TOTAL
                        </td>
                        <td className="pt-3 text-right font-black text-orange-600 text-lg">
                          {parseFloat(order.total).toLocaleString("fr-FR")} F
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
