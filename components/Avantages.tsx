"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const avantages = [
  {
    titre: "Vitesse d'Exécution",
    soustitre: "Un temps d'attente divisé par 3",
    texte: "Réduisez drastiquement les files d'attente. Vos clients commandent en quelques secondes, libérant votre personnel pour la préparation et la qualité.",
    image: "/avantage-attente.jpg",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    titre: "Personnalisation Totale",
    soustitre: "L'expérience sur mesure",
    texte: "Offrez à vos clients la liberté de personnaliser chaque plat selon leurs envies et restrictions. Satisfaction garantie à chaque bouchée.",
    image: "/avantage-personnalisation.jpg",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3" />
      </svg>
    )
  },
  {
    titre: "Fidélisation Intégrée",
    soustitre: "Récompensez chaque visite",
    texte: "Intégrez vos programmes de fidélité directement sur la borne. Encouragez les retours fréquents grâce à une expérience fluide et gratifiante.",
    image: "/avantage-fidelite.jpg",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0H4" />
      </svg>
    )
  },
  {
    titre: "Paiement Omnicanal",
    soustitre: "Fluidité et sécurité",
    texte: "Cartes bancaires, portefeuilles électroniques ou mobile money : nos bornes acceptent tous les modes de paiement modernes.",
    image: "/avantage-paiement.jpg",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    titre: "Optimisation du Panier",
    soustitre: "Augmentation du ticket moyen",
    texte: "Nos algorithmes de suggestion intelligente proposent automatiquement des compléments pertinents, augmentant naturellement vos ventes de 15 à 30%.",
    image: "/avantage-upsell.webp",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    titre: "Data & Insights",
    soustitre: "Pilotez avec précision",
    texte: "Accédez à des statistiques détaillées sur vos ventes et les préférences de vos clients pour ajuster votre stratégie en temps réel.",
    image: "/avantage-donnees.webp",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export default function Avantages() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-black tracking-widest uppercase text-xs mb-3"
          >
            Pourquoi nous choisir ?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mt-2 mb-4 text-white leading-tight max-w-3xl"
          >
            L'avantage Atom pour votre établissement
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {avantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-orange-500/20 shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 relative flex flex-col h-full overflow-hidden"
            >
              {/* Glow Overlay */}
              <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

              <div className="relative h-48 w-full mb-8 rounded-2xl overflow-hidden bg-slate-950/40 border border-white/5">
                <Image
                  src={item.image}
                  alt={item.titre}
                  fill
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  {item.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">{item.soustitre}</span>
                  <h3 className="text-xl font-black mt-2 text-white group-hover:text-orange-400 transition-colors">{item.titre}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-3">
                    {item.texte}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

