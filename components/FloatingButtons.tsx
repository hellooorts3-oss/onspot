"use client";
import { useState } from "react";
import { MessageCircle, X, ChevronUp } from "lucide-react";

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-2">
      {/* Expandable buttons */}
      {open && (
        <div className="flex flex-col items-center gap-2 mb-1" style={{ animation: "fadeInUp 0.3s ease" }}>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/official_onspot/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
            title="인스타그램"
          >
            <span className="text-sm font-bold">IG</span>
          </a>

          {/* Kakao */}
          <a
            href="https://pf.kakao.com/_placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ background: "#FEE500" }}
            title="카카오톡 창업문의"
          >
            <MessageCircle size={18} className="text-[#3a1d1d]" />
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#E41220] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-[#b50e1a] transition-all hover:scale-105"
      >
        {open ? <X size={22} /> : (
          <div className="flex flex-col items-center justify-center">
            <MessageCircle size={20} />
            <span className="text-[8px] font-bold mt-0.5">문의</span>
          </div>
        )}
      </button>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:bg-white/20 transition-all"
        title="맨 위로"
      >
        <ChevronUp size={18} />
      </button>
    </div>
  );
}
