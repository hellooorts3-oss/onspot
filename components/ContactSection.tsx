"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", region: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(46px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              지금 바로
              <br />
              <span className="text-[#E41220]">상담 신청하세요</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              온스팟 가맹 창업에 관심 있으신 분들은 아래 양식을 작성해 주시면
              담당 매니저가 빠르게 연락드리겠습니다.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {/* PDF: 전화상담 대표번호 0000-0000 (미정) — 확정 시 교체 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E41220] rounded-xl flex items-center justify-center text-white text-base">
                  📞
                </div>
                <div>
                  <div className="text-white/40 text-sm">전화 상담 (모바일에서만 작동)</div>
                  <a href="tel:00000000" className="text-white font-bold hover:text-[#E41220] transition-colors">0000-0000</a>
                </div>
              </div>
              {/* PDF: 카카오톡 채널 링크 전달 예정 — 확정 시 교체 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E41220] rounded-xl flex items-center justify-center text-white text-base">
                  💬
                </div>
                <div>
                  <div className="text-white/40 text-sm">카카오톡 채널 (링크 추가 예정)</div>
                  <div className="text-white font-bold">@온스팟 창업문의</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E41220] rounded-xl flex items-center justify-center text-white text-base">
                  📧
                </div>
                <div>
                  <div className="text-white/40 text-sm">이메일</div>
                  <div className="text-white font-bold">holicmst@the-holic.kr</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white text-base">
                  📸
                </div>
                <div>
                  <div className="text-white/40 text-sm">인스타그램</div>
                  <a
                    href="https://www.instagram.com/official_onspot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-[#E41220] transition-colors"
                  >
                    @official_onspot
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="bg-white/5 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white font-black text-xl mb-2">문의가 접수되었습니다!</h3>
                <p className="text-white/60 text-sm">
                  담당 매니저가 빠른 시일 내에 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
              >
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-1.5">
                    성함 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E41220] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-1.5">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E41220] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-1.5">
                    희망 창업 지역
                  </label>
                  <input
                    type="text"
                    placeholder="예: 서울 강남구"
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E41220] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-1.5">
                    문의 내용
                  </label>
                  <textarea
                    rows={3}
                    placeholder="궁금하신 점을 자유롭게 작성해 주세요"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E41220] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#E41220] text-white font-black rounded-xl hover:bg-[#b50e1a] transition-colors text-base"
                >
                  창업 문의 보내기
                </button>
                <p className="text-white/30 text-sm text-center">
                  입력하신 정보는 창업 상담 목적으로만 사용됩니다
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
