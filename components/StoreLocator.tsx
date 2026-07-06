"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";

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

/* 지점 데이터 — 주소 확정 시 mapQuery를 실제 주소로 교체 */
const stores = [
  { name: "수원역점", region: "경기 수원시", status: "영업중", mapQuery: "수원역" },
  { name: "부평점", region: "인천 부평구", status: "영업중", mapQuery: "부평역" },
  { name: "노원점", region: "서울 노원구", status: "영업중", mapQuery: "노원역" },
  { name: "강남역점", region: "서울 강남구", status: "오픈예정", mapQuery: "강남역" },
  { name: "평택역점", region: "경기 평택시", status: "오픈예정", mapQuery: "평택역" },
  { name: "인천송도점", region: "인천 연수구", status: "오픈예정", mapQuery: "인천 송도" },
  { name: "부평역점", region: "인천 부평구", status: "오픈예정", mapQuery: "부평역" },
];

export default function StoreLocator() {
  const { ref, inView } = useInView();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState(stores[0]);

  const filtered = useMemo(
    () =>
      stores.filter(
        (s) => s.name.includes(keyword.trim()) || s.region.includes(keyword.trim())
      ),
    [keyword]
  );

  return (
    <section id="locations" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div
          ref={ref}
          className="mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(46px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-[1.05]">
              가까운 온스팟<br />찾아보기
            </h2>
            <p className="text-gray-400 text-lg max-w-xs">
              전국으로 확장 중인 온스팟,<br />우리 동네 지점을 확인하세요
            </p>
          </div>
        </div>

        <div
          className="grid md:grid-cols-[320px_1fr] gap-0 rounded-3xl overflow-hidden shadow-sm bg-white"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
        >
          {/* ── 좌측: 검색 + 지점 리스트 ── */}
          <div className="border-r border-gray-100 flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <p className="font-black text-[#111] mb-3">매장찾기</p>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="지점명 또는 지역을 입력하세요"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#E41220] transition-colors"
                />
                <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[420px] scrollbar-hide">
              {filtered.length === 0 ? (
                <p className="text-gray-300 text-sm text-center py-10">검색 결과가 없습니다.</p>
              ) : (
                filtered.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(s)}
                    className={`w-full text-left px-5 py-4 border-b border-gray-50 transition-colors hover:bg-red-50/40 ${
                      selected.name === s.name && selected.status === s.status ? "bg-red-50/60" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className={s.status === "영업중" ? "text-[#E41220]" : "text-gray-300"} />
                        <span className="font-bold text-[#111] text-sm">온스팟 {s.name}</span>
                      </div>
                      <span
                        className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                          s.status === "영업중"
                            ? "bg-[#E41220] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 ml-6">{s.region}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ── 우측: 구글 맵 ── */}
          <div className="relative min-h-[420px]">
            <iframe
              key={selected.name + selected.status}
              title={`온스팟 ${selected.name} 지도`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(selected.mapQuery)}&hl=ko&z=15&output=embed`}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-md px-4 py-3">
              <p className="font-black text-[#111] text-sm">온스팟 {selected.name}</p>
              <p className="text-gray-400 text-sm">{selected.region} · {selected.status}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-4">
          * 지점 위치는 인근 지역 기준 표시이며, 정확한 주소는 확정 후 업데이트됩니다.
        </p>

      </div>
    </section>
  );
}
