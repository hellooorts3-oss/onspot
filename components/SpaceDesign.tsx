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

/* 슬라이드 카드 — 이미지 + 하단 라벨 오버레이 (인테리어·스낵바 공통) */
function SlideCard({ img, label }: { img: string; label: string }) {
  return (
    <div
      className="w-64 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 transition-transform duration-300 hover:-translate-y-2"
      style={{ aspectRatio: "3 / 4" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
        role="img"
        aria-label={label}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      <p className="absolute left-0 right-0 bottom-0 p-4 text-white font-bold text-sm md:text-base leading-snug drop-shadow">
        {label}
      </p>
    </div>
  );
}

/* 차별화된 인테리어 — 실제 매장 사진 (노원점·수원역) */
const interiorSlides = [
  { label: "오티티카페 온스팟 외부 전경", img: "/images/space/space-1.jpg" },
  { label: "넷플릭스·OTT 대형 화면 룸", img: "/images/space/space-2.jpg" },
  { label: "프라이빗 룸", img: "/images/space/space-3.jpg" },
  { label: "닌텐도 게임 룸", img: "/images/space/space-4.jpg" },
  { label: "PS5 게임 룸", img: "/images/space/space-5.jpg" },
  { label: "만화책 공간", img: "/images/space/space-6.jpg" },
  { label: "보드게임 공간", img: "/images/space/space-7.jpg" },
  { label: "내부 복도", img: "/images/space/space-8.jpg" },
];

/* 24시 스낵바 — 실제 매장 사진 (노원점·부평) */
const snackBarSlides = [
  { label: "24시 스낵바 전경", img: "/images/space/snack-1.jpg" },
  { label: "음료 냉장고", img: "/images/space/snack-2.jpg" },
  { label: "즉석라면 조리대", img: "/images/space/snack-3.jpg" },
  { label: "셀프 키오스크", img: "/images/space/snack-4.jpg" },
  { label: "스낵 진열대", img: "/images/space/snack-5.jpg" },
];

export default function SpaceDesign() {
  const { ref, inView } = useInView();

  return (
    <section id="space" className="py-24 bg-white overflow-hidden">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-tight">
            편하게 앉고, 맛있게 즐기고<br />
            <span className="text-[#E41220]">공간의 만족도를 높이다</span>
          </h2>
        </div>
      </div>

      {/* 인테리어 슬라이드 — 풀폭, 라벨 오버레이 */}
      <div
        className="relative overflow-hidden marquee-mask mb-16 py-2"
        style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}
      >
        <div className="flex w-max gap-4 marquee-track">
          {[...interiorSlides, ...interiorSlides].map((s, i) => (
            <SlideCard key={i} img={s.img} label={s.label} />
          ))}
        </div>
      </div>

      {/* 스낵바 — 인테리어와 동일한 슬라이더 (반대 방향) */}
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
          온스팟 24시 스낵바
        </p>
      </div>
      <div
        className="relative overflow-hidden marquee-mask py-2"
        style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.4s" }}
      >
        <div className="flex w-max gap-4 marquee-track" style={{ animationDirection: "reverse" }}>
          {[...snackBarSlides, ...snackBarSlides, ...snackBarSlides, ...snackBarSlides].map((s, i) => (
            <SlideCard key={i} img={s.img} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
