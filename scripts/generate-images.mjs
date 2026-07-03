/**
 * 온스팟 홈페이지 이미지 생성 스크립트
 * Nano Banana 2 (Gemini 3.1 Flash Image) 사용
 *
 * 실행: generate-images.bat 더블클릭  또는
 *      set GEMINI_API_KEY=발급키 && node scripts/generate-images.mjs
 *
 * - public/images/ 에 저장됩니다.
 * - 이미 생성된 파일은 건너뛰므로 중간에 끊겨도 다시 실행하면 이어서 생성됩니다.
 * - 특정 이미지만 다시 만들려면 public/images/에서 해당 파일을 지우고 재실행하세요.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_KEY = process.env.GEMINI_API_KEY || process.argv[2];
if (!API_KEY) {
  console.error("GEMINI_API_KEY가 없습니다. generate-images.bat을 사용하거나 환경변수를 설정하세요.");
  process.exit(1);
}

/* 모델 우선순위 — 계정에서 사용 가능한 첫 모델 사용 */
const MODEL_CANDIDATES = [
  "gemini-3.1-flash-image",
  "gemini-3.1-flash-image-preview",
  "gemini-3-pro-image-preview",
  "gemini-2.5-flash-image",
];

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

/* ── 공통 스타일 (실제 매장 사진 기반 분위기 통일) ── */
const BASE =
  "Photorealistic photograph taken inside a modern Korean private OTT & console-game cafe brand. " +
  "Consistent venue style: clean white walls and ceiling, light beige tones, warm recessed LED lighting, " +
  "light wood flooring, minimal Muji-like interior, brand accent color red (#E41220) used sparingly on signage. " +
  "Shot on a mirrorless camera, natural soft lighting, high resolution, no people unless specified, no watermark, no visible brand logos of Netflix/Nintendo/PlayStation.";

const FOOD_BASE =
  "Photorealistic Korean cafe food photograph, served in a brown kraft paper bowl on a light wooden table inside a bright cafe, " +
  "casual smartphone-style food photo but sharp and appetizing, soft natural light, no watermark, no text.";

/* 브랜드 스토리용 일러스트 스타일 (더홀릭 참고 이미지 느낌) */
const ILLUST_BASE =
  "Modern flat vector illustration with subtle isometric depth, on a clean pure white background. " +
  "Color palette strictly: brand red (#E41220), coral, charcoal gray, warm beige. " +
  "Soft rounded shapes, gentle drop shadows, premium franchise landing-page style, consistent series look. " +
  "Absolutely no text, no letters, no numbers, no watermark.";

const specs = [
  /* ── 히어로 배경 (16:9) ── */
  {
    file: "hero-bg.png", aspect: "16:9",
    prompt: BASE + " A dark, moody private cinema room at night: a large bright projection screen on the wall glowing with colorful abstract movie-selection thumbnails, a beige leather recliner sofa facing it, ceiling-mounted mini projector beam visible in the dim air, subtle warm red ambient accent light in the corner. Cinematic wide shot, cozy and immersive atmosphere.",
  },

  /* ── 인테리어 슬라이드 (3:4 세로) ── */
  {
    file: "exterior.png", aspect: "3:4",
    prompt: "Photorealistic photo of a modern Korean city commercial building exterior in daylight. On the 5th floor there is a long bright red storefront banner sign with white Korean text '오티티카페 온:스팟 24' and small white icons. Glass curtain wall building, typical Korean shopping street below, clear blue sky. No other readable brand names.",
  },
  {
    file: "corridor.png", aspect: "3:4",
    prompt: BASE + " A long warm wood-paneled corridor inside the cafe with numbered private room doors on both sides, frosted glass door at the end, gray tile floor, warm strip lighting along the ceiling, small poster frames on the walls. Symmetrical one-point perspective.",
  },
  {
    file: "room-screen.png", aspect: "3:4",
    prompt: BASE + " Inside a private room: a large bright wall projection showing a colorful generic video-game selection screen with cartoonish racing game artwork, white walls, light wood floor, a small white media console below the screen, a wooden side table and a white clothes rack in the corner.",
  },
  {
    file: "room-recliner.png", aspect: "3:4",
    prompt: BASE + " Inside a private room: a comfortable two-seat beige leather electric recliner sofa with cup holders, ceiling-mounted white mini projector and small soundbar on a shelf above, dim cozy lighting, gray tile floor. Nobody in the room.",
  },
  {
    file: "room-lowsofa.png", aspect: "3:4",
    prompt: BASE + " Inside a private room with a low Japanese-style floor sofa: a wide cream-colored low floor couch with cushions on a wooden platform, low wooden table, large projection screen glowing on the wall, warm dim lighting, cozy atmosphere.",
  },
  {
    file: "room-ondol.png", aspect: "3:4",
    prompt: BASE + " Inside a private room combining Korean heated floor seating and a sofa: warm wooden ondol-style floor with floor cushions and a soft blanket, plus a small beige sofa against the wall, wall projection glowing softly, warm dim lighting.",
  },
  {
    file: "room-mat.png", aspect: "3:4",
    prompt: BASE + " Inside a private room with a large soft cushioned floor mattress and big pillows covering most of the floor like a cozy den, soft beige tones, big bright wall projection screen, warm fairy-light style dim lighting, very cozy.",
  },

  /* ── 스낵바 (4:3) ── */
  {
    file: "snackbar-full.png", aspect: "4:3",
    prompt: BASE + " A bright self-service snack bar room: white shelving filled with colorful Korean snack bags on the left, two glass-door drink refrigerators on the right, white cabinets with instant ramen cookers at the back, gray tile floor, very clean convenience-store-like space.",
  },
  {
    file: "snackbar-ramen.png", aspect: "4:3",
    prompt: BASE + " Close view of a self-service instant ramen station: three white tabletop automatic ramen cookers on a white counter, wall dispensers above filled with colorful Korean instant ramen packets, small price labels, paper cups stacked, clean white interior.",
  },
  {
    file: "snackbar-drinks.png", aspect: "4:3",
    prompt: BASE + " A glass-door drink refrigerator fully stocked with colorful Korean bottled teas, juices, soda cans and bottled water, neat rows with small white price tags, bright white interior lighting.",
  },
  {
    file: "snackbar-snacks.png", aspect: "4:3",
    prompt: BASE + " White wire shelving unit fully stocked with assorted colorful Korean snack bags and chips, neatly organized rows with small price labels, bright clean lighting, convenience-store style.",
  },

  /* ── 서비스 포인트 원형 (1:1) ── */
  {
    file: "svc-projector.png", aspect: "1:1",
    prompt: BASE + " A dark cozy private room where a large bright wall projection shows a generic streaming-service style grid of colorful movie thumbnails (no real logos), ceiling projector beam visible, edge of a beige sofa in the foreground, immersive home-cinema feeling.",
  },
  {
    file: "svc-game.png", aspect: "1:1",
    prompt: BASE + " A young Korean woman seen from behind holding a white game controller, playing a colorful generic kart-racing video game on a huge bright projected screen in a private room, dynamic and fun atmosphere, white walls.",
  },
  {
    file: "staff.png", aspect: "4:3",
    prompt: BASE + " A friendly Korean staff member in a red brand t-shirt standing behind a warm wooden reception counter, kindly guiding two young customers, warm wood-paneled wall with soft strip lighting behind, welcoming atmosphere, faces slightly turned away.",
  },
  {
    file: "svc-kiosk.png", aspect: "1:1",
    prompt: BASE + " A modern self-order kiosk machine with a bright yellow and black touchscreen interface showing simple Korean menu buttons and prices, a customer's finger tapping the screen, warm wood wall background, shallow depth of field.",
  },
  {
    file: "svc-qr.png", aspect: "1:1",
    prompt: BASE + " Close-up of hands holding a smartphone scanning a small black QR-code table card that says '주문은 여기' in white Korean text, on a red table surface, phone screen showing a simple mobile food-ordering page, shallow depth of field.",
  },
  {
    file: "svc-onebutton.png", aspect: "1:1",
    prompt: BASE + " Close-up of a small white wall panel inside a private room: a sign with red Korean text 'OTT / 닌텐도' and smaller gray Korean text '버튼 눌러서 전환', below it a small black HDMI switch box with one button mounted on the white wall, clean minimal look.",
  },

  /* ── 조리 메뉴 (1:1) ── */
  {
    file: "food-tteokbokki.png", aspect: "1:1",
    prompt: FOOD_BASE + " Korean tteokbokki: glossy red spicy rice cakes in rich gochujang sauce with fish cake slices, garnished with parsley flakes, steam rising.",
  },
  {
    file: "food-chicken.png", aspect: "1:1",
    prompt: FOOD_BASE + " Korean boneless fried chicken bites drizzled with white mayo sauce and sweet red sauce, sprinkled with parsley flakes, crispy golden texture.",
  },
  {
    file: "food-fries.png", aspect: "1:1",
    prompt: FOOD_BASE + " Cajun seasoned potato fries topped with zigzag of creamy yellow cheese-mayo sauce and parsley flakes, golden crispy wedges.",
  },
  {
    file: "food-ramen.png", aspect: "1:1",
    prompt: FOOD_BASE + " Korean instant ramen 'Hangang ramyeon' in a paper bowl: steaming spicy noodle soup with an egg, green onions, served at a self-cooking ramen machine counter.",
  },
  {
    file: "food-jjapaghetti.png", aspect: "1:1",
    prompt: FOOD_BASE + " Korean black bean instant noodles (jjajang ramyeon) topped with a square slice of melting yellow cheese and parsley flakes, chopsticks lifting a few noodles.",
  },
  {
    file: "food-drinks.png", aspect: "1:1",
    prompt: FOOD_BASE + " Two tall clear plastic cups of iced americano coffee with black straws and lots of ice, side by side on a light wooden cafe table, condensation on cups.",
  },

  /* ── 브랜드 스토리 일러스트 (4:3 / 1:1) ── */
  {
    file: "story-flag.png", aspect: "4:3",
    prompt: ILLUST_BASE + " A confident small character planting a tall red flag on top of a mountain made of rising bar-chart blocks, with a game controller, popcorn bucket and play-button icons floating around, symbolizing a bold challenge into a new entertainment market.",
  },
  {
    file: "problem-cost.png", aspect: "1:1",
    prompt: ILLUST_BASE + " A worried small character looking at a laptop showing a long expensive invoice, with oversized stacks of gold coins and a steep red arrow rising behind, symbolizing inflated startup costs.",
  },
  {
    file: "problem-royalty.png", aspect: "1:1",
    prompt: ILLUST_BASE + " A small character examining a giant paper receipt with a huge red percent symbol on it, gold coins leaking away from a jar into a hole, symbolizing excessive monthly royalty fees.",
  },
  {
    file: "problem-location.png", aspect: "1:1",
    prompt: ILLUST_BASE + " An isometric office building with a red emergency alarm bursting on its roof and cracks on the wall, exclamation-mark bubbles around, symbolizing a wrong store-location recommendation.",
  },
  {
    file: "promise-cost.png", aspect: "1:1",
    prompt: ILLUST_BASE + " Open hands gently giving back gold coins with a friendly downward arrow and a small shield check icon above, symbolizing guaranteed lowest startup cost and transparent pricing.",
  },
  {
    file: "promise-royalty.png", aspect: "1:1",
    prompt: ILLUST_BASE + " A minimal clean desktop monitor showing a simple efficient dashboard, beside it one single small gold coin and a check mark, symbolizing a minimal fixed royalty and lean headquarters operation.",
  },
  {
    file: "promise-location.png", aspect: "1:1",
    prompt: ILLUST_BASE + " An energetic business character with a briefcase striding through an isometric city street, holding a giant red map pin, buildings and roads around, symbolizing the CEO personally scouting store locations nationwide.",
  },

  /* ── 가맹절차 섹션 배경 일러스트 ── */
  {
    file: "process-bg.png", aspect: "16:9",
    prompt: ILLUST_BASE + " A wide horizontal scene with lots of empty white space: a cheerful headquarters mascot character in a red t-shirt warmly leading a happy new franchise owner forward along a gently curving dotted path, small milestone flags along the way, and at the end of the path a small cozy store building with a red storefront sign, a few subtle confetti dots. Very soft light colors, airy, designed to sit behind website content as a subtle background.",
  },
];

/* ── API 호출 ── */
async function pickModel() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000&key=${API_KEY}`);
  if (!res.ok) throw new Error(`모델 목록 조회 실패: HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  const names = (data.models || []).map((m) => m.name.replace("models/", ""));
  for (const c of MODEL_CANDIDATES) if (names.includes(c)) return c;
  const anyImage = names.find((n) => n.includes("image"));
  if (anyImage) return anyImage;
  throw new Error("이미지 생성 모델을 찾을 수 없습니다. 사용 가능 모델: " + names.join(", "));
}

async function generate(model, spec, useAspect = true) {
  const body = {
    contents: [{ parts: [{ text: spec.prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      ...(useAspect ? { imageConfig: { aspectRatio: spec.aspect } } : {}),
    },
  };
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (res.status === 400 && useAspect) return generate(model, spec, false); // 구형 API 호환
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error("응답에 이미지가 없습니다: " + JSON.stringify(data).slice(0, 300));
  return Buffer.from(img.inlineData.data, "base64");
}

const exists = (p) => access(p).then(() => true, () => false);

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const model = await pickModel();
  console.log(`사용 모델: ${model}`);
  let ok = 0, skip = 0, fail = 0;
  for (const [i, spec] of specs.entries()) {
    const out = path.join(OUT_DIR, spec.file);
    if (await exists(out)) { console.log(`[${i + 1}/${specs.length}] 건너뜀 (이미 있음): ${spec.file}`); skip++; continue; }
    process.stdout.write(`[${i + 1}/${specs.length}] 생성 중: ${spec.file} (${spec.aspect}) ... `);
    try {
      const buf = await generate(model, spec);
      await writeFile(out, buf);
      console.log(`완료 (${Math.round(buf.length / 1024)}KB)`);
      ok++;
    } catch (e) {
      console.log(`실패: ${e.message}`);
      fail++;
    }
  }
  console.log(`\n완료: ${ok}개 생성, ${skip}개 건너뜀, ${fail}개 실패`);
  if (fail > 0) console.log("실패한 항목은 스크립트를 다시 실행하면 재시도합니다.");
}

main().catch((e) => { console.error(e); process.exit(1); });
