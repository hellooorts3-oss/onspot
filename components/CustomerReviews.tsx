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

/* 리뷰 캡처 이미지 (public/review/1.png ~ 7.png, 811x1080 = 3:4) */
const reviewImages = Array.from({ length: 7 }, (_, i) => ({
  src: `/review/${i + 1}.png`,
  label: `네이버 플레이스 리뷰 ${i + 1}`,
}));

/* 리뷰 이미지 무한 마퀴 — 끊김 없이 계속 흐름 (2배 복제 후 -50% 루프, 호버 시 정지) */
function ReviewCarousel() {
  return (
    <div className="group relative w-full overflow-hidden select-none marquee-mask">
      <div className="flex w-max gap-5 md:gap-7 py-4 marquee-track group-hover:[animation-play-state:paused]">
        {[...reviewImages, ...reviewImages].map((r, i) => (
          <div
            key={i}
            className="group/card relative flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-xl cursor-pointer"
            style={{ width: "min(62vw, 240px)", aspectRatio: "3 / 4" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover/card:scale-110"
              style={{ backgroundImage: `url(${r.src})` }}
              role="img"
              aria-label={r.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* 숫자 카운트업 — 스크롤로 진입할 때 0 → target 으로 상승 */
function useCountUp(target: number, run: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

function StatItem({ target, decimals, suffix, label, run }: { target: number; decimals: number; suffix: string; label: string; run: boolean }) {
  const v = useCountUp(target, run);
  return (
    <div>
      <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
        {v.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
}

function NaverBubble() {
  return (
    <div className="relative inline-block float-bounce" aria-label="100% 실제 네이버 리뷰">
      <div className="bg-[#E41220] text-white font-black rounded-2xl shadow-lg shadow-[#E41220]/30 whitespace-nowrap text-base px-5 py-3">
        <span className="mr-1.5 font-black">N</span>100% 실제 네이버 리뷰
      </div>
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#E41220] rotate-45" aria-hidden="true" />
    </div>
  );
}

export default function CustomerReviews() {
  const { ref, inView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView(0.35);

  return (
    <section id="reviews" className="py-28 bg-[#fafafa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* 헤더 */}
        <div
          ref={ref}
          className={`text-center mb-14 anim-seq ${inView ? "is-in" : ""}`}
        >
          {/* N 100% 실제 네이버 리뷰 — 빨강 말풍선, 통통 튀는 애니메이션 */}
          <div className="flex justify-center mb-6">
            <NaverBubble />
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="text-[#E41220]">고객들의 진솔한 후기</span><br />
            <span className="text-[#111]">저희의 진심을 증명합니다</span>
          </h2>
        </div>
      </div>

      {/* ── 리뷰 캡처 — 무한 마퀴 ── */}
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
        <ReviewCarousel />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <p className="text-gray-300 text-sm text-center mt-8 mb-12">
          * 네이버 플레이스에 등록된 실제 고객 리뷰입니다
        </p>

        {/* SNS 바이럴 수치 — 스크롤 진입 시 카운트업 */}
        <div
          ref={statsRef}
          className="bg-[#E41220] rounded-3xl p-8 grid grid-cols-3 gap-4 text-center"
          style={{ opacity: statsInView ? 1 : 0, transform: statsInView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <StatItem target={11} decimals={0} suffix="만+" label="인스타 릴스 조회수" run={statsInView} />
          <StatItem target={16.8} decimals={1} suffix="만+" label="바이럴 릴스 조회수" run={statsInView} />
          <StatItem target={4.9} decimals={1} suffix="★" label="네이버 플레이스 평점" run={statsInView} />
        </div>

      </div>
    </section>
  );
}
