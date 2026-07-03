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

/* 숫자 카운트업 (스크롤 진입 시 0 → 목표값) */
function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

const fmt = (n: number) => n.toLocaleString("ko-KR");

/* PDF 기획안 4. 확실하게 입증된 압도적인 수익구조 (50평 기준 예시)
   매출 3,300만원 = 게임 1,800 + 음식료 1,500 / 비용 1,730만원 / 순이익 1,570만원 (47.6%) */
const TOTAL = 3300;
const segments = [
  { label: "순이익", short: "순이익", value: 1570, color: "#E41220" },
  { label: "인건비 (풀오토 정직원 2명 기준)", short: "인건비", value: 700, color: "#3f3f3f" },
  { label: "식자재비", short: "식자재비", value: 450, color: "#5c5c5c" },
  { label: "임대료", short: "임대료", value: 280, color: "#7a7a7a" },
  { label: "관리비 및 공과금", short: "관리비·공과금", value: 200, color: "#999999" },
  { label: "로열티", short: "로열티", value: 50, color: "#b8b8b8" },
  { label: "카드수수료 / 인터넷 / 기타지출", short: "기타지출", value: 50, color: "#d4d4d4" },
];

/* ── 도넛 차트 ── active(강조 항목) 상태는 부모가 관리 → 우측 비용 탭과 연동 */
function DonutChart({ active, setActive, animate }: { active: number | null; setActive: (n: number | null) => void; animate: boolean }) {
  const R = 80;
  const C = 2 * Math.PI * R;
  const fracs = segments.map((s) => s.value / TOTAL);
  const offsets = fracs.map((_, i) => fracs.slice(0, i).reduce((a, b) => a + b, 0));
  const pct = useCountUp(476, animate) / 10;
  const cur = active !== null ? segments[active] : null;

  return (
    <div className="relative">
      <svg viewBox="0 0 220 220" className="w-full max-w-[400px] mx-auto select-none">
        <g transform="rotate(-90 110 110)">
          {segments.map((s, i) => (
            <circle
              key={i}
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={active === i ? (i === 0 ? 52 : 44) : i === 0 ? 44 : 34}
              strokeDasharray={`${animate ? fracs[i] * C : 0} ${C}`}
              strokeDashoffset={-offsets[i] * C}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                cursor: "pointer",
                pointerEvents: "visibleStroke",
                opacity: active !== null && active !== i ? 0.3 : 1,
                transition: `stroke-dasharray 1.2s ease ${0.15 + i * 0.1}s, stroke-width 0.25s ease, opacity 0.25s ease`,
              }}
            />
          ))}
        </g>

        {cur ? (
          <>
            <text x="110" y="95" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: cur.color }}>{cur.short}</text>
            <text x="110" y="126" textAnchor="middle" className="fill-[#111]" style={{ fontSize: 28, fontWeight: 900 }}>{fmt(cur.value)}만원</text>
            <text x="110" y="148" textAnchor="middle" className="fill-gray-400" style={{ fontSize: 12 }}>매출 대비 {((cur.value / TOTAL) * 100).toFixed(1)}%</text>
          </>
        ) : (
          <>
            <text x="110" y="94" textAnchor="middle" className="fill-[#111]" style={{ fontSize: 14, fontWeight: 700 }}>순이익 마진율</text>
            <text x="110" y="128" textAnchor="middle" className="fill-[#E41220]" style={{ fontSize: 32, fontWeight: 900 }}>{pct.toFixed(1)}%</text>
            <text x="110" y="149" textAnchor="middle" className="fill-gray-400" style={{ fontSize: 11 }}>(50평 기준)</text>
          </>
        )}
      </svg>
    </div>
  );
}

const directSales = [
  { region: "경기 A지점", monthly: 77875600 },
  { region: "경상 B지점", monthly: 114944700, highlight: true },
  { region: "전라 C지점", monthly: 80850600 },
];
const maxSales = Math.max(...directSales.map((s) => s.monthly));

function SalesCard({ s, animate }: { s: (typeof directSales)[number]; animate: boolean }) {
  const v = useCountUp(s.monthly, animate, 1700);
  const pct = Math.max(10, Math.round((s.monthly / maxSales) * 100));
  const hl = s.highlight;
  return (
    <div
      className={`relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
        hl
          ? "bg-white shadow-2xl shadow-black/25 md:-translate-y-2"
          : "bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/[0.16]"
      }`}
    >
      {hl && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 bg-[#111] text-white text-sm font-black rounded-full pl-2.5 pr-3 py-1.5 shadow-lg">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
          </svg>
          최고 매출 지점
        </span>
      )}

      {/* 지점명 */}
      <p className={`font-black text-xl md:text-2xl leading-tight ${hl ? "text-[#111]" : "text-white"}`}>{s.region}</p>
      <p className={`text-sm mt-1 mb-6 ${hl ? "text-gray-400" : "text-white/50"}`}>실제 월 매출 데이터</p>

      {/* 금액 */}
      <p className={`text-sm font-bold mb-1.5 ${hl ? "text-[#E41220]" : "text-white/60"}`}>월 매출</p>
      <p className={`font-black tabular-nums leading-none ${hl ? "text-[#E41220]" : "text-white"} text-3xl md:text-[2.1rem]`}>
        {fmt(v)}
        <span className="text-base font-bold ml-0.5">원</span>
      </p>

      {/* 상대 비교 막대 */}
      <div className={`mt-6 h-2 rounded-full overflow-hidden ${hl ? "bg-[#E41220]/12" : "bg-white/15"}`}>
        <div
          className={`h-full rounded-full ${hl ? "bg-[#E41220]" : "bg-white/75"}`}
          style={{ width: animate ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.35s" }}
        />
      </div>
    </div>
  );
}

export default function RevenueSection() {
  const { ref, inView } = useInView();
  const { ref: salesRef, inView: salesInView } = useInView(0.3);
  const game = useCountUp(1800, inView);
  const food = useCountUp(1500, inView);
  const total = useCountUp(3300, inView);
  const profit = useCountUp(1570, inView, 1800);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* ── 수익구조 섹션 ── */}
      <section id="revenue" className="py-28 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          <div
            ref={ref}
            className="mb-16"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
                확실하게 입증된<br />
                <span className="text-[#E41220]">압도적인 수익구조</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xs">
                직영점 운영 데이터 기반<br />
                <strong className="text-[#111]">50평 기준 월 수익 예시</strong>
              </p>
            </div>
          </div>

          {/* 핵심 포인트 2가지 */}
          <div
            className="grid md:grid-cols-2 gap-4 mb-16"
            style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s" }}
          >
            <div className="bg-[#f7f7f7] rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="text-[#E41220] text-sm font-bold mb-2">POINT 01</p>
              <h3 className="font-black text-[#111] text-lg md:text-xl mb-2">식자재비가 들지 않는 룸 이용료</h3>
              <p className="text-gray-500 text-lg leading-relaxed">원가 부담 없는 룸 이용료 매출 중심 구조로 압도적인 영업이익률을 실현합니다.</p>
            </div>
            <div className="bg-[#f7f7f7] rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="text-[#E41220] text-sm font-bold mb-2">POINT 02</p>
              <h3 className="font-black text-[#111] text-lg md:text-xl mb-2">차별화된 F&B 시스템</h3>
              <p className="text-gray-500 text-lg leading-relaxed">F&B 추가 매출 증대와 고객 체류시간 증가를 동시에 만들어냅니다.</p>
            </div>
          </div>

          {/* 왼쪽: 도넛 + 매출 3종(한 줄) / 오른쪽: 비용 탭 + 예상 수익 */}
          <div
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
            style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s" }}
          >
            {/* ── 왼쪽 ── */}
            <div>
              <DonutChart active={active} setActive={setActive} animate={inView} />

              {/* 매출 3종 — 원형 밑, 한 줄 */}
              <div className="grid grid-cols-3 gap-3 mt-12 pt-8 border-t border-gray-100">
                {[
                  { v: game, label: "게임 이용 매출", hot: false },
                  { v: food, label: "음식료 매출", hot: false },
                  { v: total, label: "총 매출", hot: true },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`font-black tabular-nums leading-none ${item.hot ? "text-[#E41220]" : "text-[#111]"} text-2xl md:text-[2rem]`}
                    >
                      {fmt(item.v)}
                      <span className="text-sm font-bold ml-0.5">만원</span>
                    </div>
                    <div className="text-gray-400 text-sm md:text-sm mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 오른쪽: 비용 구조 탭 ── */}
            <div>
              <p className="text-[#E41220] text-sm font-bold tracking-[0.2em] uppercase mb-4">
                월 비용 구조 (매출 대비)
              </p>

              <div className="space-y-2">
                {segments.slice(1).map((s, i) => {
                  const idx = i + 1;
                  const on = active === idx;
                  return (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(idx)}
                      aria-pressed={on}
                      className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 border text-left transition-all duration-200 ${
                        on
                          ? "border-[#E41220] bg-[#E41220]/5 -translate-y-0.5 shadow-sm"
                          : "border-gray-100 hover:border-[#E41220]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-3 h-3 rounded-sm inline-block flex-shrink-0 transition-transform"
                          style={{ background: s.color, transform: on ? "scale(1.35)" : "none" }}
                        />
                        <span className={`font-bold text-base truncate ${on ? "text-[#111]" : "text-gray-600"}`}>
                          {s.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm text-gray-400 tabular-nums">
                          {((s.value / TOTAL) * 100).toFixed(1)}%
                        </span>
                        <span className="font-black text-lg text-[#111] tabular-nums">
                          {s.value}
                          <span className="text-sm font-bold ml-0.5">만원</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 총 비용 */}
              <div className="flex items-center justify-between px-5 mt-4 pt-4 border-t-2 border-gray-200">
                <span className="text-[#111] font-black text-base">총 비용</span>
                <span className="text-[#111] font-black text-xl tabular-nums">
                  1,730<span className="text-sm font-bold ml-0.5">만원</span>
                </span>
              </div>

              {/* 예상 월 평균 수익 — 붓 밑줄 강조 (오른쪽 끝 정렬) */}
              <div className="mt-12 text-right">
                <div className="flex flex-col md:flex-row items-end justify-end gap-1 md:gap-4">
                  <span className="text-gray-500 text-lg md:text-xl font-bold whitespace-nowrap md:pb-3">
                    예상 월 평균 수익
                  </span>
                  <p className="font-black text-[#E41220] leading-none relative inline-block" style={{ textShadow: "0 6px 18px rgba(228,18,32,0.22)" }}>
                    <span className="relative z-10 tabular-nums" style={{ fontSize: "clamp(3.4rem, 7vw, 5.5rem)" }}>
                      {fmt(profit)}
                      <span className="text-2xl md:text-4xl ml-1.5">만원</span>
                    </span>
                    {/* 클린 언더라인 바 — 형광펜 대신 또렷한 포인트 */}
                    <span
                      className="absolute left-0 -bottom-2 h-[7px] rounded-full bg-[#E41220] z-0"
                      style={{ width: inView ? "100%" : "0%", transition: "width 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.5s" }}
                      aria-hidden="true"
                    />
                  </p>
                </div>
                <p className="text-gray-400 text-sm mt-6">
                  * 50평 기준 예시이며, 지점별 상황에 따라 상이할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 직영점 실매출 — 풀 블리드 레드 (디자인 리뉴얼) ── */}
      <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
        {/* 배경 성장차트 이미지 — 불투명도 70%, 고정(fixed) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url(/images/plus.jpg)", opacity: 0.7, backgroundAttachment: "fixed" }}
        />
        {/* 깊이감용 라이트/다크 라디얼 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(ellipse 90% 70% at 50% 120%, rgba(0,0,0,0.25), transparent 55%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6" ref={salesRef}>

          {/* 헤더 + 평균 요약 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7 mb-14">
            <div>
              <p className="inline-flex items-center gap-2 text-white/70 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                <span className="w-6 h-px bg-white/40" />
                실매출이 증명한
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1]">
                눈에 보이는 성과
              </h2>
              <p className="text-white/65 text-base mt-4 max-w-md leading-relaxed">
                본사 직영점에서 실제로 발생한 월 매출 데이터입니다.
                검증된 모델로 가맹점의 성공 가능성을 높입니다.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 self-start">
              <p className="text-white/60 text-sm mb-1.5">3개 직영점 평균 월매출</p>
              <p className="text-white font-black text-3xl tabular-nums leading-none">
                약 9,100<span className="text-base font-bold ml-1">만원</span>
              </p>
            </div>
          </div>

          {/* 지점 카드 */}
          <div className="grid md:grid-cols-3 gap-5 items-stretch pt-2">
            {directSales.map((s, i) => (
              <SalesCard key={i} s={s} animate={salesInView} />
            ))}
          </div>

          <p className="text-white/35 text-sm mt-8">
            * 실제 직영점 매출 데이터 기준 / 지점별 상황에 따라 상이할 수 있습니다
          </p>
        </div>
      </section>
    </>
  );
}
