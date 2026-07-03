"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const upcomingLocations = [
  { name: "강남역점", status: "오픈 확정", date: "2026 예정" },
  { name: "평택역점", status: "오픈 확정", date: "2026 예정" },
  { name: "인천송도점", status: "오픈 확정", date: "2026 예정" },
  { name: "마주아딩점", status: "오픈 확정", date: "2026 예정" },
  { name: "부평역점", status: "오픈 확정", date: "2026 예정" },
];

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center popup-overlay bg-black/60">
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        style={{ animation: "fadeInUp 0.4s ease" }}
      >
        {/* Header */}
        <div className="bg-[#E41220] px-6 py-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-90 mb-1">ON:SPOT 오픈 예정</p>
              <h2 className="text-xl font-black">신규 지점 확장 중!</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors mt-1"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-500 mb-4">
            온스팟이 전국 각지로 확장되고 있습니다.
          </p>
          <div className="space-y-2">
            {upcomingLocations.map((loc, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E41220] inline-block" />
                  <span className="font-semibold text-[#111] text-sm">{loc.name}</span>
                </div>
                <span className="text-sm font-bold text-[#E41220] bg-red-50 px-2 py-1 rounded-full">
                  {loc.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 bg-[#E41220] text-white rounded-xl text-sm font-bold text-center hover:bg-[#b50e1a] transition-colors"
            >
              창업 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
