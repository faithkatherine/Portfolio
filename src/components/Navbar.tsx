"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#writing", label: "Writing" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 shadow-sm backdrop-blur-md"
          : "bg-[#FAFAF8]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-bold text-[#20201F] transition-colors hover:text-[#55514C] focus:outline-none focus:ring-4 focus:ring-[#FF87C3]/30"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#20201F] text-sm text-white">
                FO
              </span>
              <span>Faith Otieno</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-sm font-bold text-[#55514C] transition-colors hover:text-[#20201F] focus:outline-none focus:ring-4 focus:ring-[#FF87C3]/25"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-[#55514C] transition hover:bg-white hover:text-[#20201F] focus:outline-none focus:ring-4 focus:ring-[#FF87C3]/25"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-black/[0.05] bg-white px-4 pb-4 pt-2 shadow-paper">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-xl px-3 py-3 font-bold text-[#55514C] hover:bg-[#FAFAF8] hover:text-[#20201F]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
