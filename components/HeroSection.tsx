"use client";
import { useEffect, useState } from "react";

/* 글자를 하나씩 순차 등장시킨다 (base 초부터 char당 step 초 간격) */
function CharReveal({ text, base, step = 0.07 }: { text: string; base: number; step?: number }) {
  return (
    <>
      {Array.from(text.replace(/ /g, " ")).map((ch, i) => (
        <span key={i} className="char-in" style={{ animationDelay: `${(base + i * step).toFixed(2)}s`, whiteSpace: "pre" }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ── 풀스크린 배경 (영상 준비 시 영상으로 교체) ── */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="w-full h-full relative">
          {/* 배경 이미지 */}
          <div
            className="absolute inset-0 bg-[#0d0d0d] bg-cover bg-center"
            style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
          />
          {/* 분위기용 그라디언트 오버레이 */}
          <div className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(228,18,32,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,100,0,0.08) 0%, transparent 50%)"
            }}
          />
          {/* 노이즈 텍스처 느낌 */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px",
            }}
          />
        </div>

        {/* 다크 오버레이 — 상하 + 좌측(헤드라인 영역) 강화로 네온/카피 가독성 확보 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/85" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 66%)" }}
        />
      </div>

      {/* ── 콘텐츠 ── */}
      <div className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex flex-col justify-center max-w-7xl mx-auto">

        {/* ── 메인 카피 — 글자 하나씩 등장 후, 마지막에 형광펜 하이라이트 ── */}
        <div className="w-full">
          <div>
            <h1
              className="font-black text-white leading-[1.22] mb-0"
              style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
            >
              <CharReveal text="켜는 순간," base={0.4} /><br />
              {/* 포인트 — 글자 등장 완료 후 뒤에서 좌→우로 그어지는 하이라이트 스윕 */}
              <span className="hl-sweep relative inline-block whitespace-nowrap">
                <span className="relative z-10">
                  <CharReveal text="우리만의 놀이터" base={0.82} />
                </span>
              </span>
            </h1>
          </div>
        </div>

      </div>

      {/* ── 사선 구분선 ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 60%, 0 100%)" }}
      />
    </section>
  );
}
