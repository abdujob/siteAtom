"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/bornes", label: "Bornes" },
  { href: "/technologie", label: "Technologie" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <svg className="w-9 h-9 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" stroke="url(#header-logo-grad)" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="7" stroke="url(#header-logo-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="16" cy="16" r="2.5" fill="#F97316" />
              <defs>
                <linearGradient id="header-logo-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F97316" />
                  <stop offset="1" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={`text-xl font-black tracking-wider bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>
            ATOM
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-colors relative py-1 ${
                    isActive 
                      ? (scrolled ? "text-primary" : "text-primary-foreground") 
                      : (scrolled ? "text-foreground/80 hover:text-primary" : "text-white/80 hover:text-white")
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link href="/admin">
            <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-black hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-orange-500/10 cursor-pointer">
              Console Admin
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""} ${scrolled ? "text-foreground" : "text-white"}`}></span>
            <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""} ${scrolled ? "text-foreground" : "text-white"}`}></span>
            <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""} ${scrolled ? "text-foreground" : "text-white"}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold ${pathname === link.href ? "text-primary" : "text-foreground"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setIsOpen(false)} className="mt-2">
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/10 cursor-pointer">
                  Console Admin
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

