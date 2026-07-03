import type { Metadata } from "next";
import "./globals.css";
import { PreviewProvider } from "@/components/PreviewContext";

export const metadata: Metadata = {
  title: "오티티카페 온스팟 | 켜는 순간, 우리만의 놀이터",
  description: "OTT 콘텐츠, 콘솔 게임, F&B를 결합한 24시간 프라이빗 체류형 멀티 콘텐츠 공간. 업계 최저 창업비용, 가맹 창업 문의",
  keywords: "온스팟, 오티티카페, 프라이빗카페, 게임카페, OTT카페, 프랜차이즈, 창업, 가맹",
  openGraph: {
    title: "오티티카페 온스팟 | 켜는 순간, 우리만의 놀이터",
    description: "OTT 콘텐츠, 콘솔 게임, F&B를 결합한 24시간 프라이빗 체류형 멀티 콘텐츠 공간",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 저장된 '블랙' 버전 선택을 첫 페인트 전에 적용 (깜빡임 방지) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('onspot-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();",
          }}
        />
        {/* Pretendard — 가변 단일 파일을 'Pretendard' 로 등록 (globals.css @font-face) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: "Pretendard, sans-serif" }}>
        <PreviewProvider>{children}</PreviewProvider>
      </body>
    </html>
  );
}
