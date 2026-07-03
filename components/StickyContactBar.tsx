"use client";
import { useState } from "react";
import { Phone } from "lucide-react";

export default function StickyContactBar() {
  const [form, setForm] = useState({ name: "", region: "", phone: "", agree: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) { alert("개인정보 수집 및 이용에 동의해주세요."); return; }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", region: "", phone: "", agree: false });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#E41220] shadow-2xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center gap-3 py-3"
        >
          {/* Phone */}
          <div className="flex items-center gap-2 text-white mr-2 flex-shrink-0">
            <Phone size={16} />
            <div>
              <div className="text-[10px] text-white/70 leading-none">빠른 상담문의</div>
              <div className="font-black text-base leading-tight">0000-0000</div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/30 mx-1" />

          {submitted ? (
            <div className="flex-1 text-center text-white font-bold text-sm py-1">
              ✅ 상담 신청이 완료되었습니다! 빠르게 연락드리겠습니다.
            </div>
          ) : (
            <>
              <input
                type="text"
                required
                placeholder="고객명"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="flex-1 min-w-0 bg-white/15 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all"
              />
              <input
                type="text"
                placeholder="희망지역"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="flex-1 min-w-0 bg-white/15 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all"
              />
              <input
                type="tel"
                required
                placeholder="연락처"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="flex-1 min-w-0 bg-white/15 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all"
              />

              <label className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="w-3.5 h-3.5 accent-white"
                />
                <span className="text-white/80 text-[11px] whitespace-nowrap">개인정보 동의</span>
              </label>

              <button
                type="submit"
                className="flex-shrink-0 bg-white text-[#E41220] font-black px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                상담 신청하기
              </button>
            </>
          )}
        </form>

        {/* Mobile */}
        <div className="md:hidden py-3 flex items-center justify-between">
          <a href="tel:00000000" className="flex items-center gap-2 text-white">
            <Phone size={18} />
            <div>
              <div className="text-[10px] text-white/70">빠른 상담문의</div>
              <div className="font-black text-sm">0000-0000</div>
            </div>
          </a>
          <a
            href="#contact"
            className="bg-white text-[#E41220] font-black px-4 py-2 rounded-lg text-sm"
          >
            창업 상담 신청
          </a>
        </div>
      </div>
    </div>
  );
}
