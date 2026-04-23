// app/layout.tsx
import "./globals.css";
import { Outfit } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Atom — Bornes de Commande Intelligent pour Restaurants",
    template: "%s | Atom"
  },
  description: "Atom révolutionne la restauration au Sénégal avec des bornes de commande tactiles élégantes et ultra-rapides. Réduisez l'attente, augmentez vos ventes.",
  keywords: ["borne de commande", "restaurant", "Sénégal", "Atom", "fast food", "automatisation", "kiosque tactile"],
  authors: [{ name: "Atom Team" }],
  openGraph: {
    title: "Atom — Bornes de Commande pour Restaurants",
    description: "La technologie au service de la restauration rapide au Sénégal.",
    url: "https://atom-sn.com",
    siteName: "Atom",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-outfit antialiased selection:bg-primary/30 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

