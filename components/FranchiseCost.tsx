"use client";
import { useEffect, useRef, useState } from "react";

const costRows = [
  { label: "가맹비·교육비 등", a: "800", b: "800", us: "800" },
  { label: "인테리어비", a: "17,500", b: "15,400", us: "15,400" },
  { label: "가구", a: "—", b: "—", us: "1,400" },
  { label: "카페 장비", a: "18,000", b: "15,000", us: "1,500" },
  { label: "그 외", a: "—", b: "—", us: "6,000" },
  { label: "합계 (VAT별도)", a: "34,300", b: "31,200", us: "25,100", isTotal: true },
];

const COLS = "grid grid-cols-[1.5fr_1fr_1fr_1.2fr]";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: "0px 0px -18% 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function FranchiseCost() {
  const { ref, inView } = useInView();

  return (
    <section id="cost" className="relative py-28 bg-[#0a0a0a] overflow-hidden">
      {/* 시네마 무드 배경 — 살짝만 */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/images/00.new/10.png)", opacity: 0.5 }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── 제목+설명+스탯 (왼쪽) · 비교표 (오른쪽, 상단 정렬) ── */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-start"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* 왼쪽: 제목 + 설명 + 스탯 */}
          <div className="space-y-7">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05]">
              업계 최저<br />
              <span className="text-[#E41220]">창업비용</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              업계 최저 창업비용을 제시해드립니다. 반드시 <strong className="text-white">‘총 창업 비용’</strong>을 비교해주세요!
              창업비용 절감은 곧 점주님의 투자수익률 상승으로 이어집니다.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
                <p className="text-white/40 text-sm mb-2.5">A사 대비 최대 절감</p>
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums leading-none">
                  9,200<span className="text-base font-bold ml-0.5">만원</span>
                </div>
                <p className="text-[#E41220] text-sm font-black mt-2.5">약 27% 절감 ↓</p>
              </div>
              <div className="bg-[#2a0e11] border border-[#E41220]/45 rounded-2xl p-6">
                <p className="text-white/50 text-sm mb-2.5">온스팟 총 창업비용</p>
                <div className="text-3xl md:text-4xl font-black text-[#E41220] tabular-nums leading-none">
                  25,100<span className="text-base font-bold ml-0.5">만원</span>
                </div>
                <p className="text-white/35 text-sm mt-2.5">VAT별도 · 70평 기준</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 비교표 */}
          <div>
            <p className="text-white/30 text-sm text-right mb-2.5">단위: 만원 (70평 기준)</p>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#141414] table-glow">
              {/* 헤더 행 */}
              <div className={COLS}>
                <div className="px-5 py-4 text-sm font-bold text-white/50">항목</div>
                <div className="px-3 py-4 text-sm font-bold text-white/40 text-center">A사</div>
                <div className="px-3 py-4 text-sm font-bold text-white/40 text-center">B사</div>
                <div className="px-3 py-4 text-sm font-black text-white text-center bg-[#E41220]">온스팟</div>
              </div>
              {/* 데이터 행 */}
              {costRows.map((row, i) => (
                <div key={i} className={`${COLS} border-t border-white/5 ${row.isTotal ? "bg-white/[0.05]" : ""}`}>
                  <div className={`px-5 py-3.5 text-sm ${row.isTotal ? "text-white font-black" : "text-white/70"}`}>
                    {row.label}
                  </div>
                  <div className="px-3 py-3.5 text-sm text-center text-white/35 tabular-nums">{row.a}</div>
                  <div className="px-3 py-3.5 text-sm text-center text-white/35 tabular-nums">{row.b}</div>
                  <div
                    className={`px-3 py-3.5 text-center tabular-nums bg-[#E41220]/10 ${
                      row.isTotal ? "text-[#E41220] font-black text-lg" : "text-[#ff7079] font-bold text-sm"
                    }`}
                  >
                    {row.us}
                  </div>
                </div>
              ))}
              {/* 외부광선 반짝 sweep */}
              <span className="shine-sweep-strong" aria-hidden="true" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
