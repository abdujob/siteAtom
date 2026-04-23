import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export default function ProductCard({ title, description, image, badge }: ProductCardProps) {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] p-4 border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 hover:shadow-primary/10 transition-all duration-500 overflow-hidden text-left h-full flex flex-col">
      {badge && (
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            {badge}
          </span>
        </div>
      )}
      
      <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden bg-secondary/50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="px-4 pb-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="mt-auto pt-4 flex items-center">
          <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
            En savoir plus →
          </span>
        </div>
      </div>
    </div>
  );
}

