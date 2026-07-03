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

/* 상세 조리메뉴 사진 — 실제 메뉴 촬영본 */
const cookedMenuPhotos = [
  { label: "떡볶이", cat: "분식", img: "/images/menu/tteokbokki.jpg", tag: "BEST" },
  { label: "케이준감자튀김", cat: "사이드", img: "/images/menu/cajun-fries.jpg" },
  { label: "허니버터감자튀김", cat: "사이드", img: "/images/menu/honey-fries.jpg" },
  { label: "까르보불닭", cat: "분식", img: "/images/menu/carbo-buldak.jpg", tag: "NEW" },
  { label: "치킨마요덮밥", cat: "덮밥", img: "/images/menu/chicken-mayo.jpg" },
  { label: "계란후라이김치볶음밥", cat: "볶음밥", img: "/images/menu/kimchi-rice.jpg" },
  { label: "아메리카노", cat: "카페", img: "/images/menu/americano.jpg" },
  { label: "카페라떼", cat: "카페", img: "/images/menu/latte.jpg", tag: "BEST" },
];

/* 이미지가 아직 없으면 회색 박스로 표시 (generate-images.bat 실행 시 자동 채워짐) */
function Photo({ src, label, ratio = "1/1", rounded = "rounded-2xl" }: { src: string; label: string; ratio?: string; rounded?: string }) {
  return (
    <div
      className={`w-full bg-gray-100 bg-cover bg-center overflow-hidden ${rounded}`}
      style={{ aspectRatio: ratio, backgroundImage: `url(${src})` }}
      role="img"
      aria-label={label}
    />
  );
}

export default function WhyDetail() {
  const { ref, inView } = useInView();

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── 헤더 ── */}
        <div
          ref={ref}
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
            온스팟이기에<br />가능한 것들
          </h2>
        </div>

        {/* ── 1) 매장 직원 서비스 ── */}
        <div
          className="grid md:grid-cols-2 gap-10 items-center mb-24"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s" }}
        >
          <div>
            <p className="text-[#E41220] text-sm font-bold mb-3">DETAIL 01</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#111] mb-5 leading-snug">
              매장 직원 서비스
            </h3>
            <p className="text-gray-500 leading-[1.9] text-lg mb-4">
              24시 무인 매장은 청결·응대·보안 등 <strong className="text-[#111]">관리가 어렵습니다.</strong>
            </p>
            <p className="text-gray-500 leading-[1.9] text-lg">
              온스팟은 고객 안내와 기본 응대 중심의 <strong className="text-[#111]">직원을 배치</strong>하여
              운영 안정성과 서비스 품질을 모두 높였습니다.
              처음 방문한 고객도 어렵지 않게 즐길 수 있는 이유입니다.
            </p>
          </div>
          <Photo src="/images/feat/feat-5.jpg" label="직원 고객 응대" ratio="4/3" rounded="rounded-3xl" />
        </div>

        {/* ── 2) QR 주문 및 조리 시스템 — 핸드폰 프레임 스크롤링 ── */}
        <div
          className="grid md:grid-cols-2 gap-10 items-center mb-16"
          style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.3s" }}
        >
          {/* 핸드폰 프레임 */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-[230px] rounded-[36px] border-[10px] border-[#111] bg-black shadow-2xl overflow-hidden">
              {/* 노치 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111] rounded-b-2xl z-20" />
              {/* 화면 — QR 주문 시연 영상 (확대 크롭으로 폰 화면 꽉 채움 + 유튜브 UI 가림) */}
              <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: "9 / 16" }}>
                <iframe
                  className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                  src="https://www.youtube.com/embed/ga1nqHzgDqA?autoplay=1&mute=1&loop=1&playlist=ga1nqHzgDqA&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1"
                  title="온스팟 QR 주문 시연"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0, transform: "translate(-50%, -50%) scale(1.38)", transformOrigin: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-[#E41220] text-sm font-bold mb-3">DETAIL 02</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#111] mb-5 leading-snug">
              QR 주문 및 조리 시스템
            </h3>
            <p className="text-gray-500 leading-[1.9] text-lg mb-4">
              동종 업계에서 보기 어려운 <strong className="text-[#111]">QR 주문과 즉시 조리 시스템</strong>을 운영합니다.
            </p>
            <p className="text-gray-500 leading-[1.9] text-lg">
              룸에서 나가지 않고 QR로 주문하면 즉시 조리가 시작됩니다.
              주문 편의성과 F&B 만족도를 모두 확보한 온스팟만의 차별점입니다.
            </p>
          </div>
        </div>

        {/* ── 조리메뉴 갤러리 ── */}
        <div style={{ opacity: inView ? 1 : 0, transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
          <div className="text-center mb-8">
            <p className="text-[#E41220] text-sm font-bold uppercase tracking-widest mb-2">ONSPOT MENU</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#111]">직원이 직접 조리하는 메뉴</h3>
            <p className="text-gray-400 text-base mt-2">갓 조리한 분식부터 든든한 덮밥, 카페 음료까지</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {cookedMenuPhotos.map((m, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm bg-gray-100">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
                  style={{ backgroundImage: `url(${m.img})` }}
                  role="img"
                  aria-label={m.label}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                {m.tag && (
                  <span className="absolute top-3 left-3 bg-[#E41220] text-white text-sm font-black rounded-full px-2.5 py-1 shadow">
                    {m.tag}
                  </span>
                )}
                <div className="absolute left-0 right-0 bottom-0 p-3.5 md:p-4">
                  <p className="text-white/60 text-sm font-bold mb-0.5">{m.cat}</p>
                  <p className="text-white font-black text-base md:text-lg leading-tight drop-shadow">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm text-center mt-6">* 스낵바 외 다양한 직원 조리 메뉴를 제공합니다</p>
        </div>

      </div>
    </section>
  );
}
