"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Notre Histoire</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-8 tracking-tight">
            L'innovation au cœur <br />
            <span className="text-primary italic">de la restauration</span>
          </h1>
          
          <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
            <p>
              Atom est une startup sénégalaise visionnaire qui redéfinit les standards 
              de la restauration rapide en Afrique. Nous concevons des solutions de 
              commande intelligentes qui allient esthétique premium et performance technologique.
            </p>
            <p>
              Notre mission est de propulser les restaurateurs vers une nouvelle ère 
              d'efficacité opérationnelle, tout en offrant aux clients une expérience 
              de commande fluide, rapide et moderne.
            </p>
            <p className="font-medium text-foreground italic">
              « Chez Atom, nous croyons que la technologie est le moteur du changement 
              positif pour la restauration africaine. »
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

