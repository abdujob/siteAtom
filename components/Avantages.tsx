"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const avantages = [
  {
    titre: "Vitesse d'Exécution",
    soustitre: "Un temps d'attente divisé par 3",
    texte: "Réduisez drastiquement les files d'attente. Vos clients commandent en quelques secondes, libérant votre personnel pour la préparation et la qualité.",
    image: "/avantage-attente.jpg",
    icon: "⚡"
  },
  {
    titre: "Personnalisation Totale",
    soustitre: "L'expérience sur mesure",
    texte: "Offrez à vos clients la liberté de personnaliser chaque plat selon leurs envies et restrictions. Satisfaction garantie à chaque bouchée.",
    image: "/avantage-personnalisation.jpg",
    icon: "🎨"
  },
  {
    titre: "Fidélisation Intégrée",
    soustitre: "Récompensez chaque visite",
    texte: "Intégrez vos programmes de fidélité directement sur la borne. Encouragez les retours fréquents grâce à une expérience fluide et gratifiante.",
    image: "/avantage-fidelite.jpg",
    icon: "💎"
  },
  {
    titre: "Paiement Omnicanal",
    soustitre: "Fluidité et sécurité",
    texte: "Cartes bancaires, portefeuilles électroniques ou mobile money : nos bornes acceptent tous les modes de paiement modernes.",
    image: "/avantage-paiement.jpg",
    icon: "💳"
  },
  {
    titre: "Optimisation du Panier",
    soustitre: "Augmentation du ticket moyen",
    texte: "Nos algorithmes de suggestion intelligente proposent automatiquement des compléments pertinents, augmentant naturellement vos ventes de 15 à 30%.",
    image: "/avantage-upsell.webp",
    icon: "📈"
  },
  {
    titre: "Data & Insights",
    soustitre: "Pilotez avec précision",
    texte: "Accédez à des statistiques détaillées sur vos ventes et les préférences de vos clients pour ajuster votre stratégie en temps réel.",
    image: "/avantage-donnees.webp",
    icon: "📊"
  }
];

export default function Avantages() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Pourquoi nous choisir ?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mt-4 mb-6"
          >
            L'avantage Atom pour votre établissement
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1.5 w-24 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-secondary/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="relative h-48 w-full mb-8 rounded-2xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.titre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg">
                  {item.icon}
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">{item.soustitre}</span>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.titre}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.texte}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

