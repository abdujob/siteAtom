"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with optimized handling */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] scale-105"
        style={{ 
          backgroundImage: "url('/arriere plan.jpg')",
          filter: "brightness(0.35) contrast(1.1)" 
        }}
      ></div>

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 shadow-inner backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-widest text-slate-200 uppercase">
              Bornes Tactiles de Nouvelle Génération
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none max-w-4xl">
            L&apos;excellence technologique <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
              au service de vos clients
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mt-6">
            Atom transforme l&apos;expérience de commande avec des bornes ultra-rapides, 
            intuitives et élégantes. Plus de files d&apos;attente, plus d&apos;erreurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10 w-full sm:w-auto">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all text-base cursor-pointer"
              >
                Demander un devis
              </motion.button>
            </Link>
            <Link href="/bornes">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-white transition-all text-base backdrop-blur-md cursor-pointer"
              >
                Voir nos modèles
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-black">Découvrir</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
      </motion.div>
    </section>
  );
}
