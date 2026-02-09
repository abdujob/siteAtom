// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Atom — Tous droits réservés.
      </div>
    </footer>
  );
}
