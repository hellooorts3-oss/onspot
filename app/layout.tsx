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
  // 블랙(다크) 버전으로 최종 확정 — 단일 테마 고정 (data-theme="dark")
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Pretendard — 가변 단일 파일을 'Pretendard' 로 등록 (globals.css @font-face) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2"
          crossOrigin="anonymous"
        />
        {/* G마켓 산스 — 제목 전용. Turbopack CSS 최적화를 피해 헤드 인라인 스타일로 정의 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
@font-face{font-family:'GmarketSans';font-weight:300;font-style:normal;font-display:swap;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');}
@font-face{font-family:'GmarketSans';font-weight:500;font-style:normal;font-display:swap;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');}
@font-face{font-family:'GmarketSans';font-weight:700;font-style:normal;font-display:swap;src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');}
h1,h2,h3,h4{font-family:'GmarketSans','Pretendard',sans-serif;}
`,
          }}
        />
      </head>
      <body style={{ fontFamily: "Pretendard, sans-serif" }}>
        <PreviewProvider>{children}</PreviewProvider>
      </body>
    </html>
  );
}
