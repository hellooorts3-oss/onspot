"use client";
import { useEffect, useState } from "react";

/* 상단 헤더에서 '기본(라이트)' ↔ '블랙(다크)' 버전 전환.
   <html data-theme="dark"> 속성만 토글하고, 실제 색상은 globals.css 의
   [data-theme="dark"] 오버라이드 블록이 처리한다. (기존 라이트 버전은 그대로 유지) */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // 초기 진입 시 <html> 의 현재 테마(레이아웃 인라인 스크립트가 미리 설정)를 반영
  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const apply = (next: boolean) => {
    setDark(next);
    const root = document.documentElement;
    if (next) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("onspot-theme", next ? "dark" : "light");
    } catch {
      /* localStorage 미사용 환경 무시 */
    }
  };

  return (
    <div
      className="flex items-center rounded-full border border-[#E41220]/45 overflow-hidden text-[11px] font-bold select-none shrink-0"
      role="group"
      aria-label="배경 테마 전환"
    >
      <button
        type="button"
        onClick={() => apply(false)}
        aria-pressed={!dark}
        className={`px-3 py-1 transition-colors ${
          !dark ? "bg-[#E41220] text-white" : "text-[#E41220] hover:bg-[#E41220]/10"
        }`}
      >
        기본
      </button>
      <button
        type="button"
        onClick={() => apply(true)}
        aria-pressed={dark}
        className={`px-3 py-1 transition-colors ${
          dark ? "bg-[#111] text-white" : "text-[#E41220] hover:bg-[#E41220]/10"
        }`}
      >
        블랙
      </button>
    </div>
  );
}
