"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/* PDF 기획안: 상단메뉴 — 브랜드 스토리 / Why ONSPOT? / 가맹절차 / 지점찾기 */
const navItems = [
  { label: "브랜드 스토리", href: "/#story" },
  { label: "Why ONSPOT?", href: "/#why" },
  { label: "가맹절차", href: "/#process" },
  { label: "지점찾기", href: "/locations" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — 브랜드 가로형 워드마크 */}
        <a href="#" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-wordmark.png"
            alt="오티티카페 온스팟 ON:SPOT"
            className="h-7 md:h-8 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-base font-semibold transition-colors hover:text-[#E41220] ${
                scrolled ? "text-[#333]" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="px-6 py-2.5 bg-[#E41220] text-white text-base font-bold rounded-full hover:bg-[#b50e1a] transition-colors"
          >
            창업 문의
          </a>
        </nav>

        {/* Mobile: 메뉴 버튼 */}
        <div className="flex md:hidden items-center gap-3">
          <button
            className={scrolled ? "text-[#111]" : "text-white"}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-[#333] font-semibold text-base hover:text-[#E41220] hover:bg-red-50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-3 bg-[#E41220] text-white font-bold text-base rounded-lg text-center mt-2"
            >
              창업 문의하기
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
