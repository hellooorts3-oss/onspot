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

/* PDF 기획안 2-2) 기존 업체들의 문제점 */
const problems = [
  {
    no: "첫째",
    title: "과도한 창업 비용",
    desc: "인테리어 공사 대금을 본사에서 직접 받으며 거품이 발생합니다. 가맹점 한 개 창업 시 본사에서 수천만원 이상의 마진을 확보하며, 이는 곧 점주님들의 창업비용으로 전가됩니다.",
    img: "/images/problem-cost.png",
  },
  {
    no: "둘째",
    title: "잘못된 창업 권유",
    desc: "가맹점 신규 오픈만으로 큰 수익을 거두는 구조로, 가맹점주님의 인생이 걸린 사업의 성패보다 가맹점 유치만을 우선으로 하여 잘못된 창업을 권유합니다.",
    img: "/images/problem-location.png",
  },
  {
    no: "셋째",
    title: "법규 미준수",
    desc: "인허가를 받을 수 없는 구역에 창업을 권유하거나, 인허가를 받지 않은 채로 가맹점 창업을 진행하는 경우가 있습니다. 이는 점주님들에게 돌이킬 수 없는 손실을 초래할 수 있습니다.",
    img: "/images/problem-royalty.png",
  },
];

/* PDF 기획안 2-3) 온스팟의 약속 */
const promises = [
  {
    no: "첫째",
    title: "업계 최저 창업비용",
    desc: "인테리어는 업체와 직접 계약을 진행하시게 되며, 각종 기기나 가구도 세부견적을 받고 거래하시게 됩니다. 거품이 빠진 투명한 창업비용을 제시드립니다.",
    img: "/images/promise-cost.png",
  },
  {
    no: "둘째",
    title: "최소한의 로열티",
    desc: "불필요한 조직 운영으로 인한 관리 비용 상승을 점주님들께 전가하지 않습니다.",
    img: "/images/promise-royalty.png",
  },
  {
    no: "셋째",
    title: "진심 어린 사업동반자",
    desc: "베테랑 자영업자 출신 대표가 직접 진심을 담아 상권 분석을 위해 전국을 누빕니다. 유동, 상가 위치, 인허가 가능 여부 등 종합적으로 판단하여 최선의 선택을 제안드립니다.",
    img: "/images/promise-location.png",
  },
];

export default function BrandStory() {
  const { ref, inView } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();
  const { ref: ref3, inView: inView3 } = useInView();

  return (
    <>
      {/* ══ 출사표 — 프리미엄 레드 섹션 ══ */}
      <section id="story" className="relative py-24 md:py-32 bg-[#E41220] overflow-hidden">
        {/* 은은한 라이팅으로 고급감 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(ellipse 65% 55% at 50% 115%, rgba(0,0,0,0.30), transparent 55%)" }}
        />
        {/* 좌측 하단 5번 이미지 — 은은하게 (크게, 오른쪽으로 이동, 잘림 허용) */}
        <div
          className="pointer-events-none absolute bottom-0 left-8 md:left-40 w-64 h-64 md:w-[32rem] md:h-[32rem] bg-contain bg-no-repeat bg-left-bottom opacity-[0.15]"
          style={{ backgroundImage: "url(/images/00.new/05.png)" }}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className="relative max-w-4xl mx-auto px-6 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-black rounded-full px-5 py-2 mb-8 tracking-[0.2em] uppercase">
            Brand Story
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.12] mb-7">
            새로운 놀이문화에<br />출사표를 던지다
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-5">
            가장 빨리 성장하고 있는 보드게임카페 브랜드{" "}
            <strong className="font-black underline decoration-white/40 decoration-2 underline-offset-4">더홀릭</strong>에서,<br className="hidden md:block" />
            새로운 놀이문화 시장에 진출합니다.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            5개의 직영 매장 운영으로 사업성 및 경쟁력 검증이 완료되었으며,<br className="hidden md:block" />
            완성된 형태의 기준을 정리하여 점주님들께 창업을 제안드립니다.
          </p>

          {/* 핵심 지표 — 흰색 프리미엄 카드 (탕! 탕! 탕! 순차 팝) */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto mt-12 pop-seq ${inView ? "is-in" : ""}`}>
            {[
              { value: "5개", label: "직영 매장" },
              { value: "검증 완료", label: "사업성" },
              { value: "업계 1위", label: "2027 목표" },
            ].map((s, i) => (
              <div key={i}>
                <div className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 px-6 py-8 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1.5">
                  {/* 글래스 상단 광택 */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" aria-hidden="true" />
                  <div className="relative">
                    <div className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight">{s.value}</div>
                    <div className="text-sm font-bold text-white/75 mt-2.5">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 브랜드 롤링 텍스트 밴드 (좌측으로 무한 롤링) ══ */}
      <div className="bg-black py-3 md:py-3.5 overflow-hidden border-y border-white/10 select-none marquee-mask">
        <div className="flex w-max items-center marquee-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-5 pr-4 md:pr-5 whitespace-nowrap">
              <span className="text-white font-bold text-base md:text-lg tracking-wide">
                O<span className="text-[#E41220]">:</span>NSPOT
              </span>
              <span className="text-white/35 font-medium text-sm md:text-base">OTT · Nintendo Play Lounge</span>
              <span className="text-[#E41220]/60 text-[9px]">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 문제점 + 약속 — 다크 섹션 ══ */}
      <section className="py-28 bg-white overflow-hidden">
        <div ref={ref2} className="max-w-6xl mx-auto px-6">

        {/* ── 프랜차이즈 업계의 불합리함 — 좌측 제목 / 우측 세로 카드 ── */}
        <div className="mb-20 md:mb-28 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start">
          {/* 좌: 헤더 (좌측정렬) */}
          <div
            className="md:sticky md:top-28"
            style={{ opacity: inView2 ? 1 : 0, transform: inView2 ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s" }}
          >
            {/* 빨간 원형 · 흰색 느낌표 배지 */}
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E41220] text-white text-2xl font-black mb-6">!</span>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.05]">
              프랜차이즈 업계의<br /><span className="text-white/45">불합리함을 느끼다</span>
            </h3>
            <p className="text-white/40 text-lg mt-5">기존 업체들의 문제점</p>
            <p className="text-white/25 text-sm mt-5 hidden md:block">각 항목에 마우스를 올리면 자세한 내용이 나타납니다</p>
          </div>

          {/* 우: 카드 세로 나열 */}
          <div className="flex flex-col gap-4">
            {problems.map((p, i) => (
              <div
                key={i}
                style={{
                  opacity: inView2 ? 1 : 0,
                  transform: inView2 ? "none" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
                }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 md:px-7 py-5 cursor-pointer transition-all duration-300 hover:border-[#E41220]/60 hover:bg-white/[0.06]">
                  {/* 제목 + 호버 유도(+) 아이콘 — 한 줄 */}
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-black text-white text-xl md:text-2xl leading-snug">{p.title}</h4>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/50 shrink-0 transition-all duration-300 group-hover:bg-[#E41220] group-hover:border-[#E41220] group-hover:text-white group-hover:rotate-45">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </div>
                  {/* 내용 — 데스크탑: 호버 시 펼쳐짐 / 모바일: 항상 노출 */}
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden min-h-0">
                      <p className="text-white/55 text-sm md:text-base leading-relaxed pt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ 온스팟의 약속 — 풀폭 이미지 카드 (호버 시 밝아짐) ══ */}
      <div ref={ref3} className="mt-20 md:mt-28">
        <div
          className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center"
          style={{ opacity: inView3 ? 1 : 0, transform: inView3 ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="inline-block bg-[#E41220] text-white text-sm font-black rounded-full px-4 py-1.5 mb-4 tracking-wide">
            ONSPOT PROMISE
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
            <span className="text-[#E41220]">온스팟의 약속</span>
          </h3>
          <p className="text-gray-500 text-lg mt-3">가맹점주님과 진심으로 함께 성장합니다</p>
          {/* 스크롤 유도 그래픽 */}
          <div className="scroll-cue mt-8" aria-hidden="true">
            <span className="scroll-cue-dot" />
          </div>
        </div>

        {/* 3가지 약속 — 풀폭 이미지 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
          {promises.map((p, i) => (
            <div
              key={i}
              className="group relative overflow-hidden h-[420px] md:h-[540px] cursor-pointer"
              style={{ opacity: inView3 ? 1 : 0, transform: inView3 ? "none" : "translateY(40px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${(0.15 + i * 0.12).toFixed(2)}s` }}
            >
              {/* 실제 이미지 (7·8·9번) — 기본 어둡게, 호버 시 확대·밝아짐 */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(/images/00.new/0${7 + i}.jpg)` }}
                role="img"
                aria-label={p.title}
              />
              {/* 어둡게 덮는 오버레이 — 호버 시 옅어짐(밝아짐) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 transition-opacity duration-500 group-hover:opacity-55" />
              {/* 텍스트 */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E41220] text-white shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span className="text-white font-black text-base">{p.no}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white leading-snug mb-3 whitespace-pre-line">{p.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line transition-colors duration-500 group-hover:text-white/95">{p.desc}</p>
              </div>
              {/* 하단 레드 라인 — 호버 시 확장 */}
              <span className="absolute bottom-0 left-0 h-1 bg-[#E41220] w-0 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
