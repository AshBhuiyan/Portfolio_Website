import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "assets/source/logo.png";
const OUT = "public/logo";
mkdirSync(OUT, { recursive: true });

// Sample the corner background so canvases blend with the logo's navy backdrop.
const { data } = await sharp(SRC)
  .extract({ left: 4, top: 4, width: 2, height: 2 })
  .raw()
  .toBuffer({ resolveWithObject: true });
const bg = { r: data[0], g: data[1], b: data[2], alpha: 1 };
console.log("bg:", bg);

// Full official logo asset (kept intact): add transparent breathing room so no
// edges/glow can ever be clipped by UI shells.
const FULL = 1254;
const fullPad = Math.round(FULL * 0.12);
await sharp(SRC)
  .ensureAlpha()
  .extend({
    top: fullPad,
    bottom: fullPad,
    left: fullPad,
    right: fullPad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .resize(1024, 1024)
  .png({ quality: 92 })
  .toFile(`${OUT}/ash-bhuiyan-logo-padded.png`);

// Mark/icon crop (AB only) retained for tiny favicon/app-icon contexts.
const glyph = await sharp(SRC)
  .extract({ left: 265, top: 245, width: 735, height: 700 })
  .png()
  .toBuffer();
const TILE = 980;
const solidTile = await sharp({
  create: { width: TILE, height: TILE, channels: 4, background: bg },
})
  .composite([{ input: glyph, gravity: "center" }])
  .png()
  .toBuffer();
await sharp(solidTile)
  .resize(512, 512)
  .png({ quality: 90 })
  .toFile(`${OUT}/ash-bhuiyan-mark.png`);

// Full cinematic logo (with wordmark) — canonical file.
await sharp(SRC)
  .resize(640, 640)
  .png({ quality: 90 })
  .toFile(`${OUT}/ash-bhuiyan-logo.png`);

// Favicons / app icons.
await sharp(solidTile).resize(32, 32).png().toFile(`${OUT}/favicon-32.png`);
await sharp(solidTile)
  .resize(180, 180)
  .png()
  .toFile(`${OUT}/apple-touch-icon.png`);
await sharp(solidTile).resize(512, 512).png().toFile(`${OUT}/icon-512.png`);

// Open Graph image (1200x630) — full logo centered on matching navy.
const ogLogo = await sharp(SRC).resize(560, 560).png().toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: bg },
})
  .composite([{ input: ogLogo, gravity: "center" }])
  .png({ quality: 90 })
  .toFile(`${OUT}/og-image.png`);

console.log("Logo assets written to", OUT);
