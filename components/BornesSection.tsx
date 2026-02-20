"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function BornesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12" style={{ color: "#565656" }}>
          Nos bornes de commande
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.05 }}>
            <ProductCard
              title="Borne Atom One"
              description="Compacte et élégante, idéale pour les petits espaces."
              image="/siteAtom/borne3.png"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <ProductCard
              title="Borne Atom"
              description="Pour un débit de commande maximal."
              image="/siteAtom/borne4.png"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <ProductCard
              title="Borne Atom Pro"
              description="Haute performance et design premium pour les grandes enseignes."
              image="/siteAtom/borne1.png"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
