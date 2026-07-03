"use client";
import { useOrder } from "./PreviewContext";

/* 섹션 순서 전환 — '신규'(협의된 새 순서, 기본) ↔ '기존'(원래 순서) */
export default function OrderToggle() {
  const { order, setOrder } = useOrder();
  const isNew = order !== "original";

  return (
    <div
      className="flex items-center rounded-full border border-[#E41220]/45 overflow-hidden text-[11px] font-bold select-none shrink-0"
      role="group"
      aria-label="섹션 순서 전환"
    >
      <button
        type="button"
        onClick={() => setOrder("new")}
        aria-pressed={isNew}
        className={`px-3 py-1 transition-colors ${
          isNew ? "bg-[#E41220] text-white" : "text-[#E41220] hover:bg-[#E41220]/10"
        }`}
      >
        신규
      </button>
      <button
        type="button"
        onClick={() => setOrder("original")}
        aria-pressed={!isNew}
        className={`px-3 py-1 transition-colors ${
          !isNew ? "bg-[#111] text-white" : "text-[#E41220] hover:bg-[#E41220]/10"
        }`}
      >
        기존
      </button>
    </div>
  );
}
