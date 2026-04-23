"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function BornesSection() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Nos Solutions de Commande
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Découvrez notre gamme de bornes intelligentes conçues pour s'adapter 
            à toutes les tailles d'établissements.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={itemVariants}>
            <ProductCard
              title="Atom One"
              description="Compacte et élégante, parfaite pour les comptoirs et petits espaces."
              image="/borne3.png"
              badge="Compact"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProductCard
              title="Atom Standard"
              description="Le compromis idéal entre visibilité et encombrement pour un flux constant."
              image="/borne4.png"
              badge="Populaire"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProductCard
              title="Atom Pro"
              description="La puissance ultime avec double écran et paiement ultra-rapide pour haut débit."
              image="/borne1.png"
              badge="Premium"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

