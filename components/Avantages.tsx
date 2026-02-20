import Image from "next/image";

const avantages = [
  // --- Pour les clients ---
  {
    titre: "Un temps d’attente plus court",
    texte:
      "Grâce à nos bornes Atom, vos clients commandent directement sans faire la queue, réduisant considérablement le temps d’attente et fluidifiant le service.",
    image: "/siteAtom/avantage-attente.jpg",
  },
  {
    titre: "Des commandes personnalisées",
    texte:
      "Les clients peuvent adapter leurs plats selon leurs goûts et restrictions alimentaires, garantissant une satisfaction maximale à chaque commande.",
    image: "/siteAtom/avantage-personnalisation.jpg",
  },
  {
    titre: "Accès au programme de fidélité",
    texte:
      "Les bornes Atom s’intègrent à votre système de fidélité pour récompenser vos clients réguliers et encourager leur retour.",
    image: "/siteAtom/avantage-fidelite.jpg",
  },
  {
    titre: "Différents moyens de paiement",
    texte:
      "Nos bornes acceptent cartes, portefeuilles électroniques et paiements mobiles, offrant une expérience fluide et sans contrainte.",
    image: "/siteAtom/avantage-paiement.jpg",
  },
  {
    titre: "Une expérience client interactive",
    texte:
      "Les écrans tactiles haute définition et une interface intuitive rendent chaque commande agréable et moderne.",
    image: "/siteAtom/avantage-interactif.jpg",
  },

  // --- Pour vous et votre personnel ---
  {
    titre: "Augmentation de la valeur moyenne par client",
    texte:
      "Les suggestions automatiques et offres promotionnelles incitent les clients à ajouter des produits supplémentaires, augmentant ainsi le panier moyen.",
    image: "/siteAtom/avantage-vente.jpg",
  },
  {
    titre: "Données sur vos ventes et préférences",
    texte:
      "Les bornes collectent des statistiques précieuses sur les ventes et les habitudes clients, vous permettant d’ajuster vos stratégies commerciales.",
    image: "/siteAtom/avantage-donnees.webp",
  },
  {
    titre: "« Upselling » ciblé",
    texte:
      "Notre système intelligent propose automatiquement des options ou menus complémentaires selon la commande, favorisant la montée en gamme.",
    image: "/siteAtom/avantage-upsell.webp",
  },
  {
    titre: "Réduction de la charge de travail",
    texte:
      "En automatisant la prise de commande, votre personnel peut se concentrer sur le service, la qualité et l’accueil client.",
    image: "/siteAtom/avantage-charge.png",
  },
];

export default function Avantages() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-6 space-y-10">
        {avantages.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Image circulaire */}
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden rounded-full shadow-lg border-4 border-[#38b6ff]/20">
                <Image
                  src={item.image}
                  alt={item.titre}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-3 text-[#38b6ff]">
                {item.titre}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {item.texte}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
