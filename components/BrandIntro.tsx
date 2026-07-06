"use client";
import { useEffect, useRef, useState } from "react";

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

function CirclePlaceholder({ label, size = "w-full" }: { label: string; size?: string }) {
  return (
    <div className={`${size} aspect-square rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-300 mb-1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-gray-300 text-sm text-center px-4 leading-tight">{label}</span>
    </div>
  );
}

const points = [
  { title: "프라이빗 룸 구조", desc: "휴식 공간 (리클라이너 소파)\n커플, 가족 이용 최적화", label: "룸 내부 사진" },
  { title: "초고화질 빔프로젝터", desc: "집에서 느낄 수 없는\n몰입감 높은 시청 환경", label: "빔프로젝터 시청 사진" },
  { title: "다양한 멀티콘텐츠", desc: "OTT, 만화책\n닌텐도 스위치2, PS5", label: "게임 플레이 사진" },
  { title: "F&B 결합형 매장", desc: "직원 조리 메뉴\n다양한 간식·음료 메뉴", label: "스낵바·메뉴 사진" },
];

export default function BrandIntro() {
  const { ref, inView } = useInView();

  return (
    <section id="brand" className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── 비대칭 헤더 ── */}
        <div
          ref={ref}
          className="mb-20"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[#E41220] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                02 — 브랜드 소개
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
                영화, 게임, 카페를<br />
                <span className="text-[#E41220]">동시에.</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs md:text-right">
              OTT + 콘솔 게임 + F&B 결합형<br />
              24시간 프라이빗 체류형 공간
            </p>
          </div>
          {/* 긴 구분선 */}
          <div className="mt-8 h-px bg-gray-100 relative">
            <div className="absolute left-0 top-0 h-full w-24 bg-[#E41220]" />
          </div>
        </div>

        {/* ── 메인 2컬럼 — 이미지 왼쪽, 텍스트 오른쪽 ── */}
        <div
          className="grid md:grid-cols-2 gap-16 items-center mb-28"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
        >
          {/* 원형 이미지 + 떠있는 서브카드 */}
          <div className="relative flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96">
              <CirclePlaceholder label="브랜드 대표 사진\n(1:1 원형 이미지)" />
            </div>
            {/* 떠있는 수치 카드 */}
            <div className="absolute -bottom-4 -right-4 bg-[#E41220] text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-2xl font-black">65%+</div>
              <div className="text-sm text-white/70">평균 순수익률</div>
            </div>
            <div className="absolute -top-4 -left-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-lg">
              <div className="text-lg font-black text-[#111]">24H</div>
              <div className="text-sm text-gray-400">연중무휴 운영</div>
            </div>
          </div>

          {/* 텍스트 */}
          <div>
            <p className="text-gray-600 leading-[1.9] text-lg mb-6">
              온스팟은 OTT 콘텐츠, 콘솔 게임(닌텐도와 PS5), 유식, F&B를 결합한
              <strong className="text-[#111]"> 24시간 프라이빗 체류형 멀티 콘텐츠 공간</strong>입니다.
            </p>
            <p className="text-gray-600 leading-[1.9] text-lg mb-6">
              단순 방문형 매장이 아닌, 고객이 오랜 시간 머무르며 다양한 활동을 동시에
              즐길 수 있도록 설계된 공간으로, <strong className="text-[#111]">체류시간 증가와 높은 만족도를 동시에 제공</strong>합니다.
            </p>
            <p className="text-gray-600 leading-[1.9] text-lg mb-10">
              남녀노소 누구나 이용 가능하며, 커플·친구·가족 단위 고객까지 폭넓게 이용 가능합니다.
            </p>

            {/* 슬로건 — 박스 없이 라인으로 */}
            <div className="space-y-4">
              {["보고 싶은 건 더 크게!", "즐기고 싶은 건 더 신나게!", "쉬고 싶다면 더 편하게!"].map((s, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="text-2xl font-black text-gray-100 group-hover:text-[#E41220] transition-colors w-8 text-right select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#111] font-bold text-lg">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4 포인트 — 자유로운 레이아웃 ── */}
        <div>
          <p className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-10 text-center">
            온스팟 포인트
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {points.map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? `translateY(0)` : `translateY(${20 + i * 5}px)`,
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
                }}
              >
                {/* 원형 이미지 placeholder */}
                <div className="w-full max-w-[160px] mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <CirclePlaceholder label={p.label} />
                </div>
                <h3 className="font-black text-[#111] text-sm mb-1.5">{p.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed whitespace-pre-line">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
