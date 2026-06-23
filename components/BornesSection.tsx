"use client";
import { motion, Variants } from "framer-motion";
import ProductCard from "./ProductCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function BornesSection() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col items-center"
        >
          <span className="text-orange-500 font-black tracking-widest uppercase text-xs mb-3">
            Gamme de bornes tactiles
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white max-w-2xl">
            Nos Solutions de Commande
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Découvrez notre gamme de bornes intelligentes conçues pour s'adapter 
            à toutes les configurations et dynamiser vos encaissements.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="h-full">
            <ProductCard
              title="Atom One"
              description="Compacte et élégante, parfaite pour les comptoirs de vente et les petits espaces."
              image="/borne3.png"
              badge="Compact"
              specs={[
                "Écran Tactile IPS 15.6\"",
                "Paiement CB & NFC Intégré",
                "Imprimante Ticket Haute Vitesse"
              ]}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <ProductCard
              title="Atom Standard"
              description="Le compromis idéal entre visibilité et encombrement pour un flux de commande continu."
              image="/borne4.png"
              badge="Populaire"
              specs={[
                "Écran Tactile Vertical 21.5\"",
                "Support TPE Automatique",
                "Structure Autoportante Premium"
              ]}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <ProductCard
              title="Atom Pro"
              description="La puissance ultime avec double écran et paiement ultra-rapide pour les flux intenses."
              image="/borne1.png"
              badge="Premium"
              specs={[
                "Écran Client 24\" + Écran Commande",
                "Scanner QR & Code-barres Intégré",
                "Monnayeur Intelligent Optionnel"
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

