"use client";
import { useState } from "react";
import { MessageCircle, X, ChevronUp } from "lucide-react";

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-center gap-2">
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
        aria-label="창업 문의"
        className={`w-[72px] h-[72px] bg-[#E41220] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#E41220]/30 hover:bg-[#b50e1a] transition-colors ${open ? "" : "float-bounce"}`}
      >
        {open ? <X size={30} /> : (
          <div className="flex flex-col items-center justify-center">
            <MessageCircle size={28} />
            <span className="text-[12px] font-bold mt-0.5">문의</span>
          </div>
        )}
      </button>

      {/* Scroll to top — TOP 버튼 */}
      <button
        onClick={scrollToTop}
        aria-label="맨 위로"
        title="맨 위로"
        className="w-14 h-14 bg-[#111] rounded-full flex flex-col items-center justify-center text-white shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all"
      >
        <ChevronUp size={20} strokeWidth={2.5} />
        <span className="text-[10px] font-black tracking-wide -mt-0.5">TOP</span>
      </button>
    </div>
  );
}
