import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-20 text-slate-400 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-max">
              <div className="relative">
                <svg className="w-9 h-9 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" stroke="url(#footer-logo-grad)" strokeWidth="2.5" />
                  <circle cx="16" cy="16" r="7" stroke="url(#footer-logo-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="16" cy="16" r="2.5" fill="#F97316" />
                  <defs>
                    <linearGradient id="footer-logo-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F97316" />
                      <stop offset="1" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ATOM
              </span>
            </Link>
            <p className="text-slate-300 max-w-sm leading-relaxed text-sm">
              La technologie de pointe au service de la restauration rapide au Sénégal. 
              Simplifiez vos opérations et enchantez vos clients avec nos bornes intelligentes.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-6 uppercase text-[10px] tracking-widest text-orange-500">Navigation</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/a-propos" className="text-slate-400 hover:text-orange-500 transition-colors">À propos</Link></li>
              <li><Link href="/bornes" className="text-slate-400 hover:text-orange-500 transition-colors">Nos Bornes</Link></li>
              <li><Link href="/technologie" className="text-slate-400 hover:text-orange-500 transition-colors">Technologie</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase text-[10px] tracking-widest text-orange-500">Contact</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="text-slate-400">Dakar, Sénégal</li>
              <li className="text-slate-400 hover:text-orange-500 transition-colors"><a href="mailto:contact@atom.sn">contact@atom.sn</a></li>
              <li className="text-slate-400 hover:text-orange-500 transition-colors"><a href="tel:+221330000000">+221 33 000 00 00</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} Atom SN. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-500 transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

