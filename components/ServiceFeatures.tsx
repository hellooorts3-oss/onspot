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

/* PDF 기획안 4. Why ONSPOT? — 온스팟 강점 */
const strengths = [
  { no: "01", title: "직영점 운영 검증", desc: "실제 본사 직영점으로 운영 시행 및\n지속적인 매출 모니터링 진행" },
  { no: "02", title: "검증된 F&B 시스템", desc: "직영점에서 먼저 운영한 뒤\n검증된 경험을 바탕으로 전용 F&B 시스템 도입\n(매출 증대)" },
  { no: "03", title: "최소 창업비용", desc: "최소 창업비용(투자비용)으로\n투자수익률 극대화" },
  { no: "04", title: "차별화된 인테리어", desc: "일반 매장과 차별화된\n프라이빗 룸 인테리어" },
];

/* 온스팟 포인트 8종 — 큰 이미지 + 우측 탭(클릭/호버 시 이미지 전환)
   ※ feat-1~8.jpg = 실제 매장 사진 (노원점·부평·수원역, 4:3 크롭) */
const features = [
  { title: "프라이빗 룸 구조", desc: "휴식 공간(리클라이너 소파)으로\n커플·가족 이용에 최적화된 프라이빗 룸", img: "/images/feat/feat-1.jpg" },
  { title: "초고화질 빔프로젝터", desc: "집에서는 느낄 수 없는\n몰입감 높은 초고화질 시청 환경", img: "/images/feat/feat-2.jpg" },
  { title: "다양한 멀티콘텐츠", desc: "OTT·만화책, 닌텐도 스위치2·PS5 등\n다양한 여가 활동을 한 곳에서", img: "/images/feat/feat-3.jpg" },
  { title: "F&B 결합형 매장", desc: "직원 조리 메뉴와 다양한 간식·음료를\n스마트 주문 시스템으로 제공", img: "/images/feat/feat-4.jpg" },
  { title: "매장 직원 서비스", desc: "고객 안내·기본 응대 중심의 직원 배치로\n운영 안정성과 서비스 품질 향상", img: "/images/feat/feat-5.jpg" },
  { title: "무인 셀프 시스템", desc: "셀프 주문·이용 프로세스로\n대기시간 최소화 및 고객 편의성 향상", img: "/images/feat/feat-6.jpg" },
  { title: "QR 주문, 조리 시스템", desc: "동종 업계에서 보기 어려운\nQR 주문과 즉시 조리 시스템", img: "/images/feat/feat-7.jpg" },
  { title: "원버튼 전환 시스템", desc: "각 룸마다 OTT와 콘솔 게임을\n버튼 하나로 간편하게 전환", img: "/images/feat/feat-8.jpg" },
];

function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const cur = features[active];

  return (
    <div className="grid md:grid-cols-[1.45fr_1fr] gap-4 md:gap-7 items-start">
      {/* 큰 이미지 (왼쪽) — 탭 전환 시 크로스페이드 */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-sm">
        {features.map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{ backgroundImage: `url(${f.img})`, opacity: active === i ? 1 : 0 }}
            role="img"
            aria-label={f.title}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8">
          <span className="inline-block bg-[#E41220] text-white text-[11px] font-black rounded-full px-3 py-1 mb-3 tabular-nums">
            POINT {String(active + 1).padStart(2, "0")}
          </span>
          <h3 className="text-white font-black text-2xl md:text-3xl mb-2 leading-snug">{cur.title}</h3>
          <p className="text-white/85 text-sm md:text-base leading-relaxed whitespace-pre-line">{cur.desc}</p>
        </div>
      </div>

      {/* 탭 리스트 (오른쪽) — 누르면 왼쪽 이미지 전환 */}
      <div className="flex flex-col gap-2">
        {features.map((f, i) => {
          const on = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className={`group text-left rounded-2xl px-5 py-3.5 border transition-all duration-200 flex items-center gap-3 ${
                on
                  ? "bg-[#E41220] border-[#E41220] shadow-md"
                  : "bg-white border-gray-100 hover:border-[#E41220]/40 hover:-translate-y-0.5"
              }`}
            >
              <span className={`font-black text-sm tabular-nums ${on ? "text-white/70" : "text-gray-300"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`font-black text-[15px] md:text-[17px] ${on ? "text-white" : "text-[#111]"}`}>
                {f.title}
              </span>
              <svg
                className={`ml-auto transition-all ${on ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-1 text-[#E41220]"}`}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ServiceFeatures() {
  const { ref, inView } = useInView();

  return (
    <section id="why" className="py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-tight">
            온스팟의<br />
            <span className="text-[#E41220]">여러가지 강점</span>
          </h2>
        </div>

        {/* 온스팟 강점 4가지 */}
        <div
          className="grid md:grid-cols-4 gap-4 mb-16"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.15s" }}
        >
          {strengths.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="text-gray-200 font-black text-2xl mb-2">{s.no}</div>
              <h3 className="font-black text-[#111] text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center mb-8">
          온스팟 포인트 및 서비스
        </p>

        {/* 온스팟 포인트 8종 — 큰 이미지 + 우측 탭 (PDF 기획안 / 통화 협의 반영) */}
        <div style={{ opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.3s" }}>
          <FeatureShowcase />
        </div>

      </div>
    </section>
  );
}
