"use client";
import HeroSection from "./HeroSection";
import BrandStory from "./BrandStory";
import FranchiseCost from "./FranchiseCost";
import RevenueSection from "./RevenueSection";
import ServiceFeatures from "./ServiceFeatures";
import WhyDetail from "./WhyDetail";
import SpaceDesign from "./SpaceDesign";
import CustomerReviews from "./CustomerReviews";
import FranchiseProcess from "./FranchiseProcess";
import ContactSection from "./ContactSection";

const REGISTRY: Record<string, React.ComponentType> = {
  hero: HeroSection,
  story: BrandStory,
  cost: FranchiseCost,
  revenue: RevenueSection,
  strengths: ServiceFeatures,
  detail: WhyDetail,
  space: SpaceDesign,
  reviews: CustomerReviews,
  process: FranchiseProcess,
  contact: ContactSection,
};

/* 신규 순서 — 카톡 협의: 이미지(강점·가능한것들) → 수익구조 → 브랜드스토리 → 로열티,
   인테리어는 앞이 아닌 간단 소개로 뒤에. (수익구조와 로열티는 붙이지 않음) */
const NEW_ORDER = [
  "hero",
  "strengths", // 온스팟 강점
  "story", // 브랜드스토리 (인테리어 위로)
  "space", // 인테리어
  "revenue", // 수익구조
  "cost", // 창업비용·로열티
  "detail", // 온스팟이기에 가능한 것들
  "reviews",
  "process",
  "contact",
];

export default function Sections() {
  const keys = NEW_ORDER;
  return (
    <>
      {keys.map((k) => {
        const C = REGISTRY[k];
        return <C key={k} />;
      })}
    </>
  );
}
