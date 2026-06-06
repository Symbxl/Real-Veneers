const sharp = require("sharp");

(async () => {
  const W = 1200, H = 630;
  const cream = "#fbf8f2", gold = "#b89968", goldDeep = "#8b6f3f",
        ink = "#0f0f10", muted = "#5a574f", line = "#e8e2d4";

  const logoW = 600;
  const logo = await sharp("public/logo.webp").resize(logoW).png().toBuffer();

  const cx = W / 2;
  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${cream}"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="22"
        fill="none" stroke="${line}" stroke-width="2"/>
  <text x="${cx}" y="150" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="26"
        letter-spacing="7" fill="${goldDeep}" font-weight="600">
    COSMETIC DENTISTRY &#183; SUGAR LAND, TX
  </text>
  <rect x="${cx - 45}" y="372" width="90" height="4" rx="2" fill="${gold}"/>
  <text x="${cx}" y="452" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="62"
        fill="${ink}" font-weight="700">2-Day Smile Transformations</text>
  <text x="${cx}" y="508" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="29"
        fill="${muted}">AI-designed, hand-finished porcelain veneers by Dr. Ryan Trevino</text>
  <text x="${cx}" y="560" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="25"
        fill="${goldDeep}" letter-spacing="2">&#9733;&#9733;&#9733;&#9733;&#9733;&#160;&#160;5.0 &#183; 400+ Google reviews</text>
</svg>`;

  await sharp(Buffer.from(svg))
    // `multiply` makes the logo's near-white background blend into the cream
    // canvas (white*cream = cream) while keeping the dark wordmark crisp.
    .composite([{ input: logo, top: 188, left: Math.round(cx - logoW / 2), blend: "multiply" }])
    .jpeg({ quality: 88 })
    .toFile("public/og.jpg");

  const meta = await sharp("public/og.jpg").metadata();
  console.log("Wrote public/og.jpg", meta.width + "x" + meta.height);
})().catch((e) => { console.error("ERR", e.message); process.exit(1); });
