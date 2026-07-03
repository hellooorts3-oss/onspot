"use client";
import { createContext, useContext, useEffect, useState } from "react";

/* 섹션 순서 미리보기 상태. '신규'(기본) ↔ '기존'(원래 순서) 전환을 헤더 토글과
   섹션 렌더러가 공유한다. (배경은 블랙 버전 단일 고정) */
export type SectionOrder = "new" | "original";

const OrderContext = createContext<{
  order: SectionOrder;
  setOrder: (o: SectionOrder) => void;
}>({ order: "new", setOrder: () => {} });

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrderState] = useState<SectionOrder>("new");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("onspot-order");
      if (saved === "original" || saved === "new") setOrderState(saved);
    } catch {
      /* 무시 */
    }
  }, []);

  const setOrder = (o: SectionOrder) => {
    setOrderState(o);
    try {
      localStorage.setItem("onspot-order", o);
    } catch {
      /* 무시 */
    }
  };

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
