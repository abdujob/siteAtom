import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#545454] border-b border-gray-700">
      <div className="flex justify-between items-center h-16 pl-12 pr-9 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/siteAtom/logo.jpg"
            alt="Logo Atom"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="flex gap-6 text-white text-sm font-medium">
          <Link href="/a-propos" className="hover:text-gray-300 transition">À propos</Link>
          <Link href="/bornes" className="hover:text-gray-300 transition">Bornes</Link>
          <Link href="/technologie" className="hover:text-gray-300 transition">Technologie</Link>
          <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
