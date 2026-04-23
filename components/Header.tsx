"use client";
import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/logo.jpg"
              alt="Logo Atom"
              width={45}
              height={45}
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              style={{ height: 'auto' }}
              priority
            />
          </div>
          <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            ATOM
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
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
                  className={`text-lg font-medium ${pathname === link.href ? "text-primary" : "text-foreground"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

