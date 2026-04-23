"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with optimized handling */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: "url('/arriere plan.jpg')",
          filter: "brightness(0.6)" 
        }}
      ></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            L'excellence technologique <br />
            <span className="text-primary italic">au service de vos clients</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Atom transforme l'expérience de commande avec des bornes ultra-rapides, 
            intuitives et élégantes. Plus de files d'attente, plus d'erreurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all text-lg"
              >
                Demander un devis
              </motion.button>
            </Link>
            <Link href="/bornes">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all text-lg"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Découvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}

