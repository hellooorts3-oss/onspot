import Header from "@/components/Header";
import Sections from "@/components/Sections";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import StickyContactBar from "@/components/StickyContactBar";

export default function Home() {
  /* 섹션 순서는 Sections 컴포넌트가 헤더의 '순서' 토글(신규/기존)에 따라 렌더링.
     신규: 메인 → 강점 → 가능한것들 → 수익구조 → 브랜드스토리 → 로열티 → 인테리어 → 리뷰 → 가맹절차 → 지점 → 상담
     기존: 메인 → 브랜드스토리 → 로열티 → 수익구조 → 강점 → 가능한것들 → 인테리어 → 리뷰 → 가맹절차 → 지점 → 상담 */
  return (
    <>
      <Header />
      <main>
        <Sections />
      </main>
      <Footer />
      <FloatingButtons />
      <StickyContactBar />
    </>
  );
}
