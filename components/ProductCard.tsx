import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  specs?: string[];
}

export default function ProductCard({ title, description, image, badge, specs = [] }: ProductCardProps) {
  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-md rounded-3xl p-5 border border-white/5 hover:border-orange-500/30 shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 overflow-hidden text-left h-full flex flex-col">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      
      {badge && (
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
            {badge}
          </span>
        </div>
      )}
      
      <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden bg-slate-950/40 border border-white/5 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-6 transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      </div>

      <div className="px-2 pb-2 flex-grow flex flex-col">
        <h3 className="text-xl font-black mb-2 text-white group-hover:text-orange-400 transition-colors">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {specs.length > 0 && (
          <div className="mb-6 space-y-2.5">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-semibold text-slate-300">{spec}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <span className="text-xs font-black uppercase tracking-wider text-orange-500 group-hover:text-orange-400 transition-colors">
            En savoir plus
          </span>
          <span className="text-sm text-orange-500 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

