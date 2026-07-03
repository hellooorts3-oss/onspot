"use client";
import { useEffect, useRef, useState } from "react";

/* 가맹절차 8단계 */
const steps = [
  { step: "01", title: "가맹문의 및 상담", desc: "온라인 또는 전화로 창업 문의를 남겨주시면 담당 매니저가 상세히 상담해 드립니다.", icon: "/images/proc-ico-1.png" },
  { step: "02", title: "상권분석 및 점포 선정", desc: "대표가 직접 발로 뛰며 상권을 분석하고 최적의 점포를 선정합니다.", icon: "/images/proc-ico-2.png" },
  { step: "03", title: "가맹 계약 체결", desc: "표준 가맹 계약서를 체결하고 공식 가맹점으로 등록됩니다.", icon: "/images/proc-ico-3.png" },
  { step: "04", title: "도면 설계 및 인테리어 시공", desc: "매장에 맞는 도면 설계와 함께 브랜드 표준 디자인으로 인테리어를 시공합니다.", icon: "/images/proc-ico-4.png" },
  { step: "05", title: "매장 오픈 및 마케팅 지원", desc: "오픈과 동시에 본사 차원의 마케팅 지원이 진행됩니다.", icon: "/images/proc-ico-5.png" },
  { step: "06", title: "오픈지원 및 교육", desc: "본사 인력이 현장에 투입되어 오픈 운영을 지원하고 교육을 진행합니다.", icon: "/images/proc-ico-6.png" },
  { step: "07", title: "집기 및 초도물품 입고", desc: "운영에 필요한 집기와 초도물품이 매장으로 입고됩니다.", icon: "/images/proc-ico-7.png" },
  { step: "08", title: "기본 교육 및 오픈 준비", desc: "운영 시스템 기본 교육을 마치고 그랜드 오픈을 준비합니다.", icon: "/images/proc-ico-8.png" },
];

type Step = (typeof steps)[number];

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

function StepCard({ s, inView }: { s: Step; inView: boolean }) {
  const order = parseInt(s.step, 10) - 1; // 1→8 순차 등장용
  return (
    <div
      className="h-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(34px) scale(0.98)",
        transition: `opacity 0.4s ease ${(order * 0.12).toFixed(2)}s, transform 0.4s ease ${(order * 0.12).toFixed(2)}s, box-shadow 0.3s ease`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#E41220] text-white text-sm font-black tracking-wide">
          STEP {s.step}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.icon} alt="" className="w-14 h-14 object-contain" />
      </div>
      <h3 className="font-black text-[#111] text-base md:text-lg mb-1.5 leading-snug">{s.title}</h3>
      <p className="text-gray-400 text-base leading-relaxed">{s.desc}</p>
    </div>
  );
}

/* 카드 사이 가로 화살표 */
function ArrowH({ dir }: { dir: "right" | "left" }) {
  return (
    <div
      className={`hidden md:flex items-center absolute top-1/2 -translate-y-1/2 z-10 text-[#E41220] ${
        dir === "right" ? "-right-[19px]" : "-left-[19px]"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === "left" ? "scaleX(-1)" : "none" }}>
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

/* 행 사이 세로 연결로 (좌 또는 우) */
function DownPath({ side }: { side: "left" | "right" }) {
  const line = (
    <div className="relative h-full border-l-2 border-dashed border-[#E41220]/45">
      <svg className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 text-[#E41220]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v13M6 13l6 6 6-6" />
      </svg>
    </div>
  );
  return (
    <div className="hidden md:grid grid-cols-3 gap-6 h-16 my-1">
      <div className="flex justify-center">{side === "left" ? line : null}</div>
      <div />
      <div className="flex justify-center">{side === "right" ? line : null}</div>
    </div>
  );
}

export default function FranchiseProcess() {
  const { ref, inView } = useInView();

  /* 데스크탑 스네이크: 1 2 3 / 6 5 4 / 7 8 (흐름 1→2→3→4→5→6→7→8) */
  const rows: { cells: Step[]; dir: "right" | "left" }[] = [
    { cells: [steps[0], steps[1], steps[2]], dir: "right" },
    { cells: [steps[5], steps[4], steps[3]], dir: "left" },
    { cells: [steps[6], steps[7]], dir: "right" },
  ];

  return (
    <section id="process" className="relative py-28 bg-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">

        <div
          ref={ref}
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
            온스팟과 함께하는<br />창업 8단계
          </h2>
        </div>

        {/* ── 데스크탑: 스네이크 ── */}
        <div className="hidden md:block" style={{ opacity: inView ? 1 : 0, transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
          {rows.map((row, ri) => (
            <div key={ri}>
              <div className="grid grid-cols-3 gap-6 items-stretch">
                {row.cells.map((s, i) => {
                  const showArrow = row.dir === "right" ? i < row.cells.length - 1 : i > 0;
                  return (
                    <div key={s.step} className="relative">
                      <StepCard s={s} inView={inView} />
                      {showArrow && <ArrowH dir={row.dir} />}
                    </div>
                  );
                })}
              </div>
              {ri === 0 && <DownPath side="right" />}
              {ri === 1 && <DownPath side="left" />}
            </div>
          ))}
        </div>

        {/* ── 모바일: 세로 스택 1~8 ── */}
        <div className="md:hidden space-y-4">
          {steps.map((s) => (
            <StepCard key={s.step} s={s} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
          <a
            href="/#contact"
            className="inline-block px-10 py-4 bg-[#E41220] text-white font-black rounded-full text-base hover:bg-[#b50e1a] transition-all hover:scale-105 shadow-lg shadow-red-200"
          >
            지금 바로 창업 문의하기 →
          </a>
        </div>

      </div>
    </section>
  );
}
