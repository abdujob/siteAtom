"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px]"
        style={{ backgroundImage: "url('/arriere plan.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-black/25"></div>

      <div className="text-center relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-8"
          style={{ color: "#38b6ff" }} 
        >
          Commandez. Servez. Accélérez.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg max-w-2xl mx-auto mb-26 text-white"
        >
        Atom révolutionne la restauration rapide avec des bornes élégantes, ultra-rapides et simples comme un smartphone.  
        Plus de queue, plus d’erreur, paiement en 3 secondes.  
      
        
        Avec Atom, la restauration rapide devient enfin magique.
        </motion.p>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded-xl font-medium shadow-md text-white"
          style={{ backgroundColor: "#38b6ff" }} 
        >
          Demander un devis
        </motion.a>
      </div>
    </section>
  );
}
