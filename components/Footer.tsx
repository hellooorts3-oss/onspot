export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-10 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo & info */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-wordmark.png"
              alt="오티티카페 온스팟 ON:SPOT"
              className="h-9 w-auto mb-3"
            />
            <p className="text-white/30 text-sm mb-1">(주)더홀릭컴퍼니</p>
            <p className="text-white/30 text-sm">holicmst@the-holic.kr</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 text-right">
            <a
              href="https://www.instagram.com/official_onspot/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Instagram @official_onspot
            </a>
            <span className="text-white/20 text-sm">전화: 0000-0000 (모바일에서만 작동)</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-sm">
            Copyright © (주)더홀릭컴퍼니 All rights reserved.
          </p>
          <p className="text-white/10 text-sm">
            오티티카페 온스팟 브랜드 소개서
          </p>
        </div>
      </div>
    </footer>
  );
}
