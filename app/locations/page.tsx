import type { Metadata } from "next";
import Header from "@/components/Header";
import StoreLocator from "@/components/StoreLocator";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata: Metadata = {
  title: "지점 찾기 | 오티티카페 온스팟",
  description: "전국으로 확장 중인 온스팟 지점을 확인하세요.",
};

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main>
        {/* 상단 배너 — 고정 헤더가 어두운 배경 위에 놓이도록 */}
        <section className="pt-32 pb-12 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-[#E41220] font-bold text-sm tracking-[0.2em] uppercase mb-3">STORE</p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">지점 찾기</h1>
            <p className="text-white/50 mt-3">전국으로 확장 중인 온스팟, 가까운 지점을 확인하세요.</p>
          </div>
        </section>
        <StoreLocator />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
