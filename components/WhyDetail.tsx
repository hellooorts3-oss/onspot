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

/* 조리메뉴 — 배경 없는(투명) PNG. 카테고리: 분식 / 사이드 / 카페 */
const menuCategories = ["식사", "사이드", "음료"];
const menuItems = [
  { name: "떡볶이", cat: "식사", img: "/images/menu/tteokbokki.png" },
  { name: "까르보불닭", cat: "식사", img: "/images/menu/carbo-buldak.png" },
  { name: "치킨마요덮밥", cat: "식사", img: "/images/menu/chicken-mayo-rice.png" },
  { name: "계란후라이김치볶음밥", cat: "식사", img: "/images/menu/kimchi-fried-rice.png" },
  { name: "순살치킨", cat: "사이드", img: "/images/menu/boneless-chicken.png" },
  { name: "뿌링순살치킨", cat: "사이드", img: "/images/menu/bburing-chicken.png" },
  { name: "케이준감자튀김", cat: "사이드", img: "/images/menu/cajun-fries.png" },
  { name: "허니버터감자튀김", cat: "사이드", img: "/images/menu/honey-butter-fries.png" },
  { name: "아메리카노", cat: "음료", img: "/images/menu/americano.png" },
  { name: "카페라떼", cat: "음료", img: "/images/menu/cafe-latte.png" },
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
  const [menuCat, setMenuCat] = useState(menuCategories[0]);
  const filteredMenu = menuItems.filter((m) => m.cat === menuCat);

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
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s" }}
        >
          <div>
            <p className="text-[#E41220] text-sm font-bold mb-3">DETAIL 01</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#111] mb-5 leading-snug">
              매장 직원 서비스
            </h3>
            <p className="text-gray-500 leading-[1.9] text-lg mb-4">
              청결, 응대, 보안 면에서 24시간 무인 운영은 불가능에 가깝습니다.
            </p>
            <p className="text-gray-500 leading-[1.9] text-lg">
              온스팟은 기본 응대 중심으로 직원 배치 및 교육 시스템을 구축하여
              운영 안정성과 서비스 품질을 모두 높였습니다.
              처음 방문한 고객도 어렵지 않게 즐길 수 있는 이유입니다.
            </p>
          </div>
          <div className="relative">
            <Photo src="/images/feat/feat-5.jpg" label="직원 고객 응대" ratio="4/3" rounded="rounded-3xl" />
            {/* 임시 이미지 안내 배지 */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#E41220] text-white text-xs font-black rounded-full px-3 py-1.5 shadow-lg">
              임시 이미지
            </span>
            {/* 하단 안내 문구 */}
            <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/70 backdrop-blur-sm px-4 py-2.5">
              <p className="text-white/90 text-sm font-medium leading-snug text-center">
                직원 모자 착용 사진 전달 주시면 정식 등록 예정입니다
              </p>
            </div>
          </div>
        </div>

        {/* ── 2) QR 주문 및 조리 시스템 — 핸드폰 프레임 스크롤링 ── */}
        <div
          className="grid md:grid-cols-2 gap-10 items-center mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.3s" }}
        >
          {/* 핸드폰 프레임 */}
          <div className="flex justify-center order-2 md:order-1">
            {/* 갤럭시 목업 — 영상이 갤럭시 화면 녹화 원본(9:19.5)이라 화면비가 그대로 맞는다.
                영상에 이미 실제 상태바가 들어있어 펀치홀 오버레이는 넣지 않는다(내용을 가리므로).
                확대(scale) 없이 1:1로 넣어 잘리는 부분이 없게 함. */}
            <div className="relative w-[210px] md:w-[240px] rounded-[30px] md:rounded-[34px] border-[7px] md:border-[8px] border-[#111] bg-black shadow-2xl overflow-hidden">
              {/* 화면(창) — 영상 원본비(9:19.5)보다 짧은 9:17로 만들어 위아래를 잘라낸다.
                  iframe은 확대 없이 원본 비율 그대로 두고(h-full 금지 → 찌그러짐 방지),
                  가운데 정렬 + overflow-hidden 으로 상·하단만 균등하게 크롭. */}
              <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: "9 / 15" }}>
                <iframe
                  className="absolute top-1/2 left-1/2 w-full pointer-events-none"
                  src="https://www.youtube.com/embed/dxUlJ0cDKMk?autoplay=1&mute=1&loop=1&playlist=dxUlJ0cDKMk&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1"
                  title="온스팟 QR 주문 시연"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0, aspectRatio: "9 / 19.5", transform: "translate(-50%, -50%)", transformOrigin: "center" }}
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
              온스팟은 좌석에 앉아 QR 주문으로 음식을 주문하는 시스템을 운영합니다.
            </p>
            <p className="text-gray-500 leading-[1.9] text-lg">
              무인편의점 방식 대비 주문 편의성, 메뉴의 다양성 모두 월등하여
              F&B 매출 증대 및 고객 체류 시간 증가라는 두 마리 토끼를 잡을 수 있었습니다.
            </p>
          </div>
        </div>

        {/* ── 조리메뉴 갤러리 ── */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
          <div className="text-center mb-8">
            <p className="text-[#E41220] text-sm font-bold uppercase tracking-widest mb-2">ONSPOT MENU</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#111]">직원이 직접 조리하는 메뉴</h3>
            <p className="text-gray-400 text-base mt-2">갓 조리한 분식부터 든든한 덮밥, 카페 음료까지</p>
          </div>
          {/* 카테고리 필터 탭 */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {menuCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setMenuCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E41220]/60 ${
                  menuCat === c
                    ? "bg-[#E41220] text-white shadow-md shadow-[#E41220]/30"
                    : "bg-white/5 text-white/55 border border-white/15 hover:border-[#E41220]/50 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 메뉴 그리드 — 투명 PNG, 이름은 카드 밖. 카테고리 전환 시 순차 등장 */}
          <div key={menuCat} className={`grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-y-10 anim-seq ${inView ? "is-in" : ""}`}>
            {filteredMenu.map((m) => (
              <div key={m.name} className="group flex flex-col items-center">
                {/* 이미지 — 배경 없이 부유 (드롭섀도우만) */}
                <div className="w-full aspect-square flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-[85%] h-[85%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5"
                  />
                </div>
                {/* 이름 (카드 밖) — 카테고리는 상단 필터 탭으로만 표시 */}
                <p className="text-white font-bold text-base md:text-lg mt-4 text-center leading-snug">{m.name}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm text-center mt-12">* 스낵바 외 다양한 직원 조리 메뉴를 제공합니다</p>
        </div>

      </div>
    </section>
  );
}
