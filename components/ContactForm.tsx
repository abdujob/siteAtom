"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="bg-background/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-2xl space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Nom Complet</label>
              <input
                type="text"
                required
                placeholder="Ex: Abdou Diop"
                className="w-full bg-secondary/50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Professionnel</label>
              <input
                type="email"
                required
                placeholder="votre@email.com"
                className="w-full bg-secondary/50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Message</label>
              <textarea
                required
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full bg-secondary/50 border-none p-4 rounded-2xl h-40 focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 p-12 rounded-[2.5rem] text-center space-y-4"
          >
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-green-500/20">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-green-700">Demande Envoyée !</h3>
            <p className="text-green-600/80 max-w-sm mx-auto">
              Merci de nous avoir contactés. Notre équipe commerciale vous répondra dans les plus brefs délais (généralement sous 24h).
            </p>
            <button 
              onClick={() => setSent(false)}
              className="text-green-700 font-bold hover:underline mt-4"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

