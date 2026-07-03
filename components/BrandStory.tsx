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

/* AI 일러스트 — 없으면 옅은 박스로 표시 (generate-images.bat 재실행 시 채워짐) */
function Illust({ src, label, bg = "bg-gray-50", ratio = "1/1" }: { src: string; label: string; bg?: string; ratio?: string }) {
  return (
    <div
      className={`w-full ${bg} bg-center bg-no-repeat rounded-2xl`}
      style={{ backgroundImage: `url(${src})`, backgroundSize: "contain", aspectRatio: ratio }}
      role="img"
      aria-label={label}
    />
  );
}

/* PDF 기획안 2-2) 기존 업체들의 문제점 */
const problems = [
  {
    no: "첫째",
    title: "과도한 창업비용",
    desc: "인테리어 비용 외 부수적인 부분에서 최소 5,000만원 이상의 거품이 발생합니다. 본사가 인테리어 공사 비용 등을 직접 받으며 창업비용의 상승은 고스란히 가맹점주님들의 투자수익률 저하로 이어집니다.",
    img: "/images/problem-cost.png",
  },
  {
    no: "둘째",
    title: "과도한 로열티",
    desc: "매출의 5% 내지 6%의 로열티를 가져갑니다. 월 매출이 5천만원이면, 다달이 250만원~300만원을 본사에 순수 로열티로만 납부해야 합니다.",
    img: "/images/problem-royalty.png",
  },
  {
    no: "셋째",
    title: "잘못된 창업 권유",
    desc: "가맹점 신규 창업만으로 수익을 가져가는 구조로, 가맹점주의 인생이 걸린 사업을 진심으로 대하지 않습니다. 40평대 창업 권유 등 잘못된 권유로 인한 피해는 고스란히 가맹점주님들께 돌아갑니다.",
    img: "/images/problem-location.png",
  },
];

/* PDF 기획안 2-3) 온스팟의 약속 */
const promises = [
  {
    no: "첫째",
    title: "최저 창업비용을 보장해드립니다.",
    desc: "인테리어는 업체와 직접 계약하실 수 있고, 냉난방·가구 등 역시 직접 견적을 받으실 수 있습니다. 불필요한 마진을 남기지 않습니다.",
    img: "/images/promise-cost.png",
  },
  {
    no: "둘째",
    title: "로열티는 본사 운영에 필요한 최소한의 비용만 책정합니다.",
    desc: "본사는 최대한의 효율을 위해 비효율적인 조직 운영을 하지 않으며, 불필요한 고비용을 점주님들에게 전가하지 않습니다.",
    img: "/images/promise-royalty.png",
  },
  {
    no: "셋째",
    title: "진심을 담아 발로 뛰어\n상권을 개발합니다.",
    desc: "상권 분석과 상가 계약에 진심을 담아 대표가 직접 전국을 누빕니다\n성공의 노하우를 점주님들께 아낌없이 전해드립니다.",
    img: "/images/promise-location.png",
  },
];

export default function BrandStory() {
  const { ref, inView } = useInView();

  return (
    <section id="story" className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── 헤더: 새로운 놀이문화에 출사표를 던지다 ── */}
        <div
          ref={ref}
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl font-black text-[#111] leading-[1.05]">
              새로운 놀이문화에<br />
              <span className="text-[#E41220]">출사표를 던지다</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm md:text-right">
              가장 빨리 성장하고 있는{" "}
              <span
                className="font-bold text-[#111]"
                style={{ background: "linear-gradient(180deg, transparent 58%, rgba(228,18,32,0.22) 58%)", padding: "0 2px" }}
              >
                보드게임카페 브랜드 더홀릭
              </span>
              에서,<br />
              새로운 놀이문화 시장에 진출합니다.
            </p>
          </div>
        </div>

        {/* ── 출사표 본문 + 메인 일러스트 ── */}
        <div
          className="mb-24 grid md:grid-cols-2 gap-12 items-center"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.15s" }}
        >
          <div>
            <p className="text-gray-600 leading-[1.9] text-lg mb-8">
              <strong className="text-[#111]">3개의 직영 테스트 매장</strong>에서 사업성 검증은 이미 완료되었습니다.
              직영점에서 먼저 운영하고, 지속적인 매출 모니터링으로 다듬어진
              <strong className="text-[#111]"> 완성된 형태의 온스팟</strong>으로 업계 1위에 도전합니다.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "3개", label: "직영 테스트 매장" },
                { value: "검증 완료", label: "사업성 검증" },
                { value: "업계 1위", label: "온스팟의 목표" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center bg-gray-50 rounded-2xl px-3 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-lg font-black text-[#E41220]">{s.value}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* 메인 일러스트 — 깃발을 꽂는 도전 */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px) scale(0.97)",
              transition: "all 0.9s ease 0.3s",
            }}
          >
            <Illust src="/images/story-flag.png" label="새로운 시장에 출사표" ratio="4/3" bg="bg-transparent" />
          </div>
        </div>

        {/* ── 프랜차이즈 업계의 불합리함 (어두운 부정 톤) ── */}
        <div className="mb-16 rounded-[2rem] bg-[#0f0f0f] px-6 md:px-12 py-14 md:py-16">
          <div
            className="text-center mb-10"
            style={{ opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.25s" }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-white">
              프랜차이즈 업계의 <span className="text-[#ff4655]">불합리함을 느끼다</span>
            </h3>
            <p className="text-white/40 text-base mt-3">기존 업체들의 문제점</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 group transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.3 + i * 0.12}s`,
                }}
              >
                {/* 일러스트 */}
                <div className="mb-5 overflow-hidden rounded-2xl">
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <Illust src={p.img} label={p.title} bg="bg-white" ratio="4/3" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#E41220] text-white text-[10px] font-black flex items-center justify-center">!</span>
                  <span className="text-[#E41220] text-xs font-bold">{p.no}</span>
                </div>
                <h4 className="font-black text-white text-xl mb-3">{p.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 온스팟의 약속 (레드 포인트) ── */}
        <div>
          <div
            className="text-center mb-16"
            style={{ opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.4s" }}
          >
            <span className="inline-block bg-[#E41220] text-white text-xs font-black rounded-full px-4 py-1.5 mb-4 tracking-wide">
              ONSPOT PROMISE
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-[#111]">
              <span className="text-[#E41220]">온스팟의 약속</span>
            </h3>
            <p className="text-gray-500 text-base mt-3">가맹점주님과 진심으로 함께 성장합니다</p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {promises.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <div key={i} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* 비주얼 패널 — 따뜻한 베이지 배경 + 워터마크 + 기울어진 일러스트 */}
                  <div
                    className={`relative px-4 pt-2 pb-12 md:pb-16 ${reverse ? "md:order-2" : ""}`}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : `translateX(${reverse ? 40 : -40}px)`,
                      transition: `all 0.8s ease ${0.5 + i * 0.15}s`,
                    }}
                  >
                    {/* 대형 워터마크 텍스트 */}
                    <span
                      className="absolute bottom-3 left-0 right-0 z-20 text-center font-black tracking-tighter select-none pointer-events-none text-[#111] whitespace-nowrap"
                      style={{ fontSize: "clamp(3rem, 6.5vw, 5rem)", opacity: 0.05, lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      PROMISE 0{i + 1}
                    </span>
                    <div
                      className={`relative z-0 transition-transform duration-500 hover:rotate-0 ${
                        reverse ? "rotate-2" : "-rotate-2"
                      }`}
                    >
                      <Illust src={p.img} label={p.title} bg="bg-transparent" ratio="4/3" />
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div
                    className={reverse ? "md:order-1" : ""}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : `translateX(${reverse ? -30 : 30}px)`,
                      transition: `all 0.8s ease ${0.6 + i * 0.15}s`,
                    }}
                  >
                    <span className="inline-block bg-[#E41220] text-white text-xs font-black rounded-full px-4 py-1.5 mb-6 tracking-wide">
                      약속 {i + 1}
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black text-[#111] leading-snug mb-5 whitespace-pre-line">
                      {p.title}
                    </h4>
                    <p className="text-gray-500 text-base md:text-lg leading-[1.9] whitespace-pre-line">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
