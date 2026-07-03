"use client";
import { useEffect, useRef, useState } from "react";

const comparisonRows = [
  { label: "평균 객단가", cafe: "5천원대", onspot: "1만 4천원대+" },
  { label: "수익 구조", cafe: "음료 요금만 발생", onspot: "음료 + 시간 이중 수익" },
  { label: "평균 수익률", cafe: "30% 전후", onspot: "40 ~ 65%" },
  { label: "고객 체류시간", cafe: "30분 ~ 1시간", onspot: "2시간 ~ 5시간+" },
  { label: "콘텐츠 다양성", cafe: "음료만 제공", onspot: "OTT + 게임 + F&B" },
  { label: "중수 관계", cafe: "1주이 유리", onspot: "관계 없음" },
];

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

export default function ComparisonSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* 헤더 */}
        <div
          ref={ref}
          className={`mb-16 anim-seq ${inView ? "is-in" : ""}`}
        >
          <p className="text-[#E41220] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            04 — 경쟁 우위
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
              일반 카페와<br />비교 불가
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              시간 요금 구조로 만들어지는<br />
              <strong className="text-[#111]">압도적 마진율의 차이</strong>
            </p>
          </div>
        </div>

        {/* VS 비교 */}
        <div
          className="relative"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
        >
          {/* VS 뱃지 */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex items-center pointer-events-none z-10">
            <div className="w-10 h-10 bg-[#111] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-black">VS</span>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-200 bg-white rounded-3xl overflow-hidden shadow-sm">
            {/* 타 카페 헤더 */}
            <div className="bg-gray-50 px-6 py-5 text-center">
              <p className="text-sm text-gray-400 mb-0.5">일반 커피 프렌차이즈</p>
              <p className="font-black text-gray-500 text-base">타 카페</p>
            </div>
            {/* 온스팟 헤더 */}
            <div className="bg-[#E41220] px-6 py-5 text-center">
              <p className="text-sm text-red-200 mb-0.5">오티티카페</p>
              <p className="font-black text-white text-base">ON:SPOT</p>
            </div>

            {/* 행 */}
            {comparisonRows.map((row, i) => (
              <>
                <div
                  key={`cafe-${i}`}
                  className={`px-6 py-4 text-center border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <div className="text-sm text-gray-400 mb-0.5">{row.label}</div>
                  <div className="text-sm text-gray-400">{row.cafe}</div>
                </div>
                <div
                  key={`onspot-${i}`}
                  className={`px-6 py-4 text-center border-t border-red-100 ${i % 2 === 0 ? "bg-red-50/30" : "bg-white"}`}
                >
                  <div className="text-sm text-[#E41220]/60 mb-0.5">{row.label}</div>
                  <div className="text-sm font-bold text-[#E41220]">{row.onspot}</div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* 하단 결론 — 큰 숫자 강조 */}
        <div className={`mt-12 grid grid-cols-2 gap-4 anim-seq ${inView ? "is-in" : ""}`}>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-gray-200 mb-0.5">30%</div>
            <div className="text-sm text-gray-400">타 커피 평균 수익률</div>
          </div>
          <div className="bg-[#E41220] rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-white mb-0.5">65%+</div>
            <div className="text-sm text-red-200">온스팟 평균 수익률</div>
          </div>
        </div>

      </div>
    </section>
  );
}
