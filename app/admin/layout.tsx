"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Admin access check verifying backend token
  useEffect(() => {
    const auth = localStorage.getItem("atom_admin_auth");
    const token = localStorage.getItem("atom_admin_token");

    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    if (auth !== "true" || !token) {
      setIsAuthenticated(false);
      router.push("/admin/login");
      return;
    }

    // Verify token validity with backend
    adminApi.verifyToken(token)
      .then((res) => {
        if (res && res.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("atom_admin_auth");
          localStorage.removeItem("atom_admin_token");
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      })
      .catch(() => {
        localStorage.removeItem("atom_admin_auth");
        localStorage.removeItem("atom_admin_token");
        setIsAuthenticated(false);
        router.push("/admin/login");
      });
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== "/admin/login") return null;

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-outfit text-slate-800 antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col z-20">
        {/* Header / Logo */}
        <div className="p-6 border-b border-slate-900">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative">
              <svg className="w-10 h-10 transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18C6 11.3726 11.3726 6 18 6H26V14C26 20.6274 20.6274 26 14 26H6V18Z" fill="url(#logo-grad)"/>
                <path d="M10 14C10 11.7909 11.7909 10 14 10H22V18C22 20.2091 20.2091 22 18 22H10V14Z" fill="white" fill-opacity="0.2"/>
                <defs>
                  <linearGradient id="logo-grad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F97316"/>
                    <stop offset="1" stop-color="#EF4444"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                S&apos;TACOS
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-widest -mt-0.5 uppercase">
                Console Admin
              </span>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          {[
            {
              href: "/admin",
              label: "Tableau de Bord",
              match: (p: string) => p === "/admin",
              color: "from-orange-500 to-red-500",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )
            },
            {
              href: "/admin/categories",
              label: "Catégories",
              match: (p: string) => p.includes("/categories"),
              color: "from-orange-500 to-red-500",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )
            },
            {
              href: "/admin/products",
              label: "Produits",
              match: (p: string) => p.includes("/products"),
              color: "from-orange-500 to-red-500",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )
            },
            {
              href: "/admin/orders",
              label: "Commandes",
              match: (p: string) => p.includes("/orders"),
              color: "from-orange-500 to-red-500",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              )
            }
          ].map((item) => {
            const active = item.match(pathname);
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  active 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-orange-500/10` 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/40 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center font-bold text-orange-500">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200">Administrateur</span>
              <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> En ligne
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("atom_admin_auth");
              localStorage.removeItem("atom_admin_token");
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 font-bold transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-[#f8fafc] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
