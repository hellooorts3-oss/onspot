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
  { no: "01", title: "차별화된 F&B 시스템", hl: "F&B 시스템", desc: "보드게임카페에서 축적된 경험을 바탕으로 준비한 F&B 시스템은, 고객 체류시간을 늘리고 추가 매출을 확보합니다." },
  { no: "02", title: "업계 최저 창업비용", hl: "최저 창업비용", desc: "개인창업보다 저렴하다! 반드시 타 브랜드와 ‘총 창업비용’을 비교해 보세요. ‘가맹비 면제’와 같은 조삼모사에 흔들리지 마세요." },
  { no: "03", title: "트렌디한 인테리어", hl: "트렌디한", desc: "아늑하고 트렌디한 디자인과 섬세한 공간 구성으로, 이용 고객분들에게 감동을 선사합니다." },
  { no: "04", title: "다수 직영매장 운영", hl: "직영매장", desc: "전체 매장 중 다수가 본사 직영매장으로, 그 누구보다 본사가 브랜드의 성공을 위해 절박한 각오로 운영합니다." },
];

/* 온스팟 포인트 8종 — 큰 이미지 + 우측 탭(클릭/호버 시 이미지 전환)
   ※ feat-1~8.jpg = 실제 매장 사진 (노원점·부평·수원역, 4:3 크롭) */
const features = [
  { title: "아늑한 인테리어", desc: "휴식 공간(리클라이너 소파)으로\n친구·커플·가족 이용에 최적화된 프라이빗 룸", img: "/images/feat/feat-1.jpg" },
  { title: "초고화질 빔프로젝터", desc: "집에서는 느낄 수 없는\n몰입감 높은 초고화질 시청 환경", img: "/images/feat/feat-2.jpg" },
  { title: "다양한 멀티콘텐츠", desc: "OTT·만화책, 닌텐도 스위치2·PS5 등\n다양한 여가 활동을 한 곳에서", img: "/images/feat/feat-3.jpg" },
  { title: "F&B 결합형 매장", desc: "직원 조리 메뉴와 다양한 간식·음료를\n스마트 주문 시스템으로 제공", img: "/images/feat/feat-4.jpg" },
  { title: "매장 직원 서비스", desc: "고객 안내·기본 응대 중심의 직원 배치로\n운영 안정성과 서비스 품질 향상", img: "/images/feat/feat-5.jpg" },
  { title: "무인 셀프 시스템", desc: "셀프 주문·이용 프로세스로\n대기시간 최소화 및 고객 편의성 향상", img: "/images/feat/feat-6.jpg" },
  { title: "QR 주문, 조리 시스템", desc: "동종 업계에서 보기 어려운\nQR 주문과 즉시 조리 시스템", img: "/images/feat/feat-7.jpg" },
];

function WhyOnspotSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const cur = features[active];

  return (
    <section className="relative py-24 md:py-28 bg-black overflow-hidden">
      {/* 배경 이미지 — 활성 이미지, 흑백 + 블러 */}
      <div className="absolute inset-0 pointer-events-none">
        {features.map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${f.img})`,
              opacity: active === i ? 0.5 : 0,
              filter: "grayscale(1) blur(8px)",
              transform: "scale(1.1)",
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* 어두운 오버레이 — 배경 이미지 위에 덧입혀 무드 + 가독성 확보 */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* 제목 */}
        <div
          ref={ref}
          className="text-center mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            들어오면 압니다,<br />
            <span className="text-[#E41220]">왜 온스팟인지</span>
          </h2>
        </div>

        {/* 쇼케이스 — 좌: 큰 이미지 / 우: 풀폭 카드 */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 md:gap-8 items-stretch">
          {/* 좌: 큰 이미지 — 왼쪽에서 슬라이드 인 */}
          <div
            className="relative rounded-3xl overflow-hidden bg-black/25 min-h-[340px] md:min-h-0 shadow-2xl"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-60px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s" }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url(${f.img})`, opacity: active === i ? 1 : 0 }}
                role="img"
                aria-label={f.title}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8">
              <span className="inline-block bg-[#ffffff] text-[#E41220] text-sm font-black rounded-full px-3 py-1 mb-3 tabular-nums">
                POINT {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="text-white font-black text-2xl md:text-3xl mb-2 leading-snug">{cur.title}</h3>
              <p className="text-white/85 text-base md:text-lg leading-relaxed whitespace-pre-line">{cur.desc}</p>
            </div>
          </div>

          {/* 우: 카드 — 풀폭. 오른쪽에서 순차 슬라이드 인. 호버(활성) 시 왼쪽으로 슬라이드 + 솔리드 화이트로 */}
          <div className="flex flex-col gap-3">
            {features.map((f, i) => {
              const on = active === i;
              return (
                <div
                  key={i}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateX(60px)",
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.09}s`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={on}
                    className={`group relative w-full text-left rounded-2xl px-6 py-5 border transition-all duration-300 flex items-center gap-4 overflow-hidden ${
                      on
                        ? "bg-[#ffffff] border-[#ffffff] shadow-[0_20px_50px_-14px_rgba(0,0,0,0.55)] -translate-x-2 md:-translate-x-5"
                        : "bg-white/10 border-white/25 backdrop-blur-sm hover:bg-white/[0.18]"
                    }`}
                  >
                    <span className={`font-black text-base md:text-lg tabular-nums transition-colors ${on ? "text-[#E41220]" : "text-white/60"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-black text-lg md:text-xl transition-colors ${on ? "text-[#141414]" : "text-white"}`}>
                      {f.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 제목 안의 강조 키워드를 브랜드 레드로 렌더 */
function highlightTitle(title: string, key: string) {
  const idx = title.indexOf(key);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-[#E41220]">{key}</span>
      {title.slice(idx + key.length)}
    </>
  );
}

/* 온스팟 강점 4가지 — 가로 배너 카드.
   좌: 이미지(준비중) + 그라데이션 경계 / 우: 텍스트. 카드마다 좌우 교차.
   한 카드에 호버하면 나머지 카드는 어두워진다. */
function StrengthBanners() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div ref={ref} className="flex flex-col gap-5">
      {strengths.map((s, i) => {
        const reverse = i % 2 === 1; // 홀수 카드는 이미지 우측
        const dim = hovered !== null && hovered !== i;
        return (
          <div
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : `translateX(${reverse ? 60 : -60}px)`,
              transition: `all 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}
          >
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden rounded-3xl border border-white/10 transition-all duration-500"
              style={{
                opacity: dim ? 0.5 : 1,
                filter: dim ? "brightness(0.5) saturate(0.85)" : "none",
              }}
            >
            {/* 카드 배경 — 다크 레드브라운 그라데이션 */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2a1613 0%, #120b0a 100%)" }} />

            <div className="relative grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[210px] md:min-h-[250px]">
              {/* 이미지 side (준비중) */}
              <div className={`relative min-h-[170px] md:min-h-full overflow-hidden ${reverse ? "md:order-2" : "md:order-1"}`}>
                {/* 이미지 준비되면 이 박스 배경으로 교체 */}
                <div className="absolute inset-0 bg-[#1b110f] flex flex-col items-center justify-center gap-2">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" className="text-white/15" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2.5" />
                    <circle cx="8.5" cy="8.5" r="1.6" />
                    <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/25 text-sm font-bold tracking-widest uppercase">이미지 준비중</span>
                </div>
                {/* 그라데이션 경계 — 이미지가 카드 배경으로 스며듦 */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: reverse
                      ? "linear-gradient(to left, #120b0a 2%, rgba(18,11,10,0.25) 40%, transparent 78%)"
                      : "linear-gradient(to right, #120b0a 2%, rgba(18,11,10,0.25) 40%, transparent 78%)",
                  }}
                />
              </div>

              {/* 텍스트 side */}
              <div
                className={`relative flex flex-col justify-center px-7 md:px-10 py-8 md:py-9 ${
                  reverse ? "md:order-1 md:items-start md:text-left" : "md:order-2 md:items-end md:text-right"
                }`}
              >
                <span className="text-white/45 text-sm font-black tracking-widest mb-3">STRENGTH {s.no}</span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-snug mb-4 whitespace-pre-line">
                  {highlightTitle(s.title, s.hl)}
                </h3>
                <p className="text-white/55 text-base leading-relaxed max-w-md">{s.desc}</p>
              </div>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceFeatures() {
  const { ref, inView } = useInView();

  return (
    <>
      {/* ── 온스팟의 여러가지 강점 ── */}
      <section id="why" className="py-24 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div
            ref={ref}
            className="text-center mb-12"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-tight">
              Why<br />
              <span className="text-[#E41220]">ONSPOT?</span>
            </h2>
          </div>

          {/* 강점 4가지 — 가로 배너 카드 (좌우 교차 순차 등장, 호버 시 나머지 어두워짐) */}
          <StrengthBanners />
        </div>
      </section>

      {/* ── 들어오면 압니다, 왜 온스팟인지 — 레드 풀폭 섹션 ── */}
      <WhyOnspotSection />
    </>
  );
}
