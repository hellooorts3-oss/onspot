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

/* 리뷰 캡처 이미지 (public/review/1.png ~ 7.png, 811x1080 = 3:4) */
const reviewImages = Array.from({ length: 7 }, (_, i) => ({
  src: `/review/${i + 1}.png`,
  label: `네이버 플레이스 리뷰 ${i + 1}`,
}));

/* 평면(일자) 한 줄 캐러셀 — 카드를 나란히 줄 세우고, 가운데 카드만 크게 */
function ReviewCarousel() {
  const n = reviewImages.length;
  const [active, setActive] = useState(Math.floor(n / 2)); // 가운데 카드부터 시작
  const [w, setW] = useState(230); // 기본 카드 너비(px) — 모바일에서 축소
  const [inView, setInView] = useState(false); // 섹션 도착(화면에 보임) 여부
  const [paused, setPaused] = useState(false); // 마우스 호버 시 일시정지
  const dir = useRef(1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const upd = () => setW(window.innerWidth < 640 ? 175 : 230);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  // 캐러셀이 화면에 보일 때만 감지 — 스크롤로 도착하면 시작, 벗어나면 정지
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // 자동 슬라이드 — 섹션에 도착(보이는 중)하고 비호버일 때만, 양끝에서 방향 전환(핑퐁)
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setActive((a) => {
        let d = dir.current;
        if (a + d > n - 1) { dir.current = -1; d = -1; }
        else if (a + d < 0) { dir.current = 1; d = 1; }
        return a + d;
      });
    }, 3800);
    return () => clearInterval(id);
  }, [inView, paused, n]);

  const go = (d: number) => setActive((a) => Math.min(n - 1, Math.max(0, a + d)));

  const GAP = 38;
  const STEP = w + GAP;
  const trackX = -(active * STEP + w / 2); // 활성 카드 중앙을 컨테이너 중앙에 정렬

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[330px] sm:h-[410px]">
        <div
          className="absolute left-1/2 top-1/2 flex items-center"
          style={{
            gap: `${GAP}px`,
            transform: `translate(${trackX}px, -50%)`,
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {reviewImages.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${r.label} 보기`}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-black/5"
                style={{
                  width: `${w}px`,
                  aspectRatio: "3 / 4",
                  transform: on ? "scale(1.22)" : "scale(1)",
                  transformOrigin: "center",
                  zIndex: on ? 10 : 1,
                  boxShadow: on
                    ? "0 28px 55px -14px rgba(0,0,0,0.42)"
                    : "0 10px 24px -12px rgba(0,0,0,0.18)",
                  transition:
                    "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${r.src})` }}
                  role="img"
                  aria-label={r.label}
                />
                {!on && <div className="absolute inset-0 bg-white/25 transition-opacity duration-500" />}
                {on && <div className="absolute inset-0 rounded-2xl ring-2 ring-[#E41220]/55" />}
              </button>
            );
          })}
        </div>

        {/* 좌우 화살표 */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="이전 리뷰"
          className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-[#111] hover:bg-white hover:scale-105 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="다음 리뷰"
          className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-[#111] hover:bg-white hover:scale-105 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* 도트 인디케이터 */}
      <div className="flex justify-center gap-2 mt-7">
        {reviewImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${i + 1}번 리뷰`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-[#E41220]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const { ref, inView } = useInView();

  return (
    <section id="reviews" className="py-28 bg-[#fafafa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* 헤더 */}
        <div
          ref={ref}
          className={`text-center mb-14 anim-seq ${inView ? "is-in" : ""}`}
        >
          <span className="inline-block bg-[#E41220] text-white text-sm font-black rounded-full px-4 py-1.5 mb-5 tracking-wide">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="text-[#E41220]">고객들의 진솔한 후기</span><br />
            <span className="text-[#111]">저희의 진심을 증명합니다</span>
          </h2>
        </div>
      </div>

      {/* ── 리뷰 캡처 — 평면 한 줄, 가운데 확대 ── */}
      <div
        className="px-4"
        style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
      >
        <ReviewCarousel />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <p className="text-gray-300 text-sm text-center mt-8 mb-12">
          * 네이버 플레이스에 등록된 실제 고객 리뷰입니다
        </p>

        {/* SNS 바이럴 수치 */}
        <div
          className="bg-[#E41220] rounded-3xl p-8 grid grid-cols-3 gap-4 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.4s" }}
        >
          {[
            { num: "11만+", label: "인스타 릴스 조회수" },
            { num: "16.8만+", label: "바이럴 릴스 조회수" },
            { num: "4.9★", label: "네이버 플레이스 평점" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.num}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
