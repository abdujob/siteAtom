"use client";
import ContactForm from "../../components/ContactForm";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-8"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Nous contacter</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Prêt à transformer <br />
              <span className="text-primary">votre service ?</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Parlons de votre projet. Que vous soyez une petite enseigne ou une grande 
              chaîne de restauration, Atom a la solution pour booster votre performance.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">📍</div>
                <p className="font-medium">Dakar, Sénégal</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">📧</div>
                <p className="font-medium">contact@atom.sn</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 w-full"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

