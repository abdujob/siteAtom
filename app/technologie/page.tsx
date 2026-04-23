"use client";
import { motion } from "framer-motion";

export default function Technologie() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Ingénierie de pointe</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-8 tracking-tight">
            Une technologie <br />
            <span className="text-primary italic">robuste et évolutive</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Logiciel Propriétaire</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre OS est optimisé pour la rapidité. Une interface fluide qui réduit 
                le temps de décision du client et élimine les erreurs de saisie.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Matériel Haute Précision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Écrans capacitifs 4K, imprimantes thermiques ultra-rapides et 
                terminaux de paiement certifiés pour une fiabilité sans faille.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
