import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Logo Atom"
                width={40}
                height={40}
                className="rounded-lg"
                style={{ height: 'auto' }}
              />
              <span className="text-xl font-bold tracking-tighter">ATOM</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              La technologie de pointe au service de la restauration rapide au Sénégal. 
              Simplifiez vos opérations et enchantez vos clients avec nos bornes intelligentes.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">À propos</Link></li>
              <li><Link href="/bornes" className="text-muted-foreground hover:text-primary transition-colors">Nos Bornes</Link></li>
              <li><Link href="/technologie" className="text-muted-foreground hover:text-primary transition-colors">Technologie</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-muted-foreground">Dakar, Sénégal</li>
              <li className="text-muted-foreground">contact@atom.sn</li>
              <li className="text-muted-foreground">+221 33 000 00 00</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Atom SN. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-primary transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

