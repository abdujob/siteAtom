"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simplified admin access check (using localStorage for this demo)
  useEffect(() => {
    const auth = localStorage.getItem("atom_admin_auth");
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== "/admin/login") return null;

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">A</div>
            <span className="text-xl font-bold tracking-tight">ATOM ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === "/admin" ? "bg-blue-600" : "hover:bg-slate-800"}`}
          >
            📊 Tableau de Bord
          </Link>
          <Link 
            href="/admin/categories" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname.includes("/categories") ? "bg-blue-600" : "hover:bg-slate-800"}`}
          >
            📁 Catégories
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname.includes("/products") ? "bg-blue-600" : "hover:bg-slate-800"}`}
          >
            🍔 Produits
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              localStorage.removeItem("atom_admin_auth");
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-900/30 text-red-400 transition-colors"
          >
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-[#f8fafc]">
        {children}
      </main>
    </div>
  );
}
