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

export default function Footer() {
  const { ref, inView } = useInView(0.15);
  return (
    <footer className="bg-[#E41220] pt-16 pb-28">
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* 상단: 로고·소개 / 회사 정보 */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-8 pb-10 border-b border-white/20">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-wordmark.png"
              alt="오티티카페 온스팟 ON:SPOT"
              className="h-9 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-white/85 text-sm leading-relaxed max-w-sm">
              OTT · 콘솔 게임 · F&amp;B를 결합한<br className="hidden sm:block" />
              24시간 프라이빗 체류형 멀티 콘텐츠 공간
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2.5 text-sm">
            <p className="text-white"><span className="text-white/55 mr-2.5">상호</span><span className="font-semibold">(주)플레이스온</span></p>
            <p className="text-white"><span className="text-white/55 mr-2.5">이메일</span><a href="mailto:theholic1024@naver.com" className="font-semibold hover:underline underline-offset-2">theholic1024@naver.com</a></p>
            <p className="text-white"><span className="text-white/55 mr-2.5">전화</span><span className="font-semibold">0000-0000</span></p>
            <a
              href="https://www.instagram.com/official_onspot/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline underline-offset-2 mt-1"
            >
              <span className="text-white/55 mr-2.5 font-normal">SNS</span>Instagram @official_onspot
            </a>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="mt-7 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/70 text-xs tracking-wide">© 2026 (주)플레이스온. All rights reserved.</p>
          <p className="text-white/50 text-xs tracking-wide">오티티카페 온스팟 브랜드 소개서</p>
        </div>
      </div>
    </footer>
  );
}
