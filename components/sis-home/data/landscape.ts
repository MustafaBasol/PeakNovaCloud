/**
 * Geometry for the E. Sis home page. Extracted verbatim from the approved design canvas.
 * Do not edit by hand: these paths ARE the design.
 *
 * HERO_RIDGES: drawn back to front in a 1440x560 viewBox (aerial perspective, haze to brand blue).
 * LOGO_MOUNTAIN_PATH: the PeakNova logo mark, traced from public/brand/logo-full-transparent.png,
 *   in a 1000 x 371 coordinate space (main peak at 442,0; secondary peak at 693,107).
 */
export type Ridge = { id: string; fill: string; d: string };

export const HERO_VIEWBOX = "0 0 1440 560";

export const HERO_RIDGES: readonly Ridge[] = [
  { id: "far", fill: "#EEF2F7", d: "M0 560 L0 264.2 L12 266.7 L24 262.9 L36 255.6 L48 254.3 L60 250.6 L72 248.8 L84 246.5 L96 237.5 L108 233.5 L120 236.4 L132 229.6 L144 228.7 L156 218.9 L168 218.8 L180 217.3 L192 209.6 L204 211.6 L216 207.4 L228 196.6 L240 192.7 L252 192.9 L264 194.8 L276 194.3 L288 196.8 L300 202.3 L312 203.0 L324 208.3 L336 213.8 L348 218.0 L360 219.6 L372 223.2 L384 226.7 L396 232.2 L408 234.4 L420 235.8 L432 245.8 L444 246.9 L456 251.0 L468 250.7 L480 260.4 L492 261.8 L504 257.9 L516 261.4 L528 266.1 L540 267.5 L552 270.6 L564 267.7 L576 272.0 L588 271.6 L600 269.5 L612 272.4 L624 275.2 L636 275.2 L648 272.6 L660 273.2 L672 268.3 L684 268.6 L696 270.9 L708 265.6 L720 261.4 L732 262.2 L744 261.1 L756 258.6 L768 253.8 L780 252.0 L792 250.2 L804 249.9 L816 245.4 L828 241.9 L840 240.2 L852 234.0 L864 231.6 L876 234.4 L888 234.1 L900 228.4 L912 224.2 L924 219.8 L936 219.8 L948 221.0 L960 216.6 L972 212.1 L984 213.8 L996 211.4 L1008 215.7 L1020 220.5 L1032 218.5 L1044 218.4 L1056 217.6 L1068 220.3 L1080 224.1 L1092 216.8 L1104 223.3 L1116 223.7 L1128 224.4 L1140 223.2 L1152 223.7 L1164 221.2 L1176 221.4 L1188 220.0 L1200 216.7 L1212 222.8 L1224 219.9 L1236 216.4 L1248 218.3 L1260 217.5 L1272 215.7 L1284 214.8 L1296 215.5 L1308 219.3 L1320 224.2 L1332 227.9 L1344 229.3 L1356 235.7 L1368 240.0 L1380 247.9 L1392 254.7 L1404 258.6 L1416 262.9 L1428 267.3 L1440 266.9 L1440 560 Z" },
  { id: "mid", fill: "#DAE2EC", d: "M0 560 L0 329.0 L12 325.5 L24 311.3 L36 308.0 L48 313.4 L60 308.5 L72 304.0 L84 295.9 L96 295.7 L108 291.8 L120 287.6 L132 278.6 L144 280.5 L156 284.0 L168 291.9 L180 299.0 L192 302.3 L204 301.3 L216 303.8 L228 305.4 L240 306.2 L252 309.7 L264 318.5 L276 320.2 L288 324.4 L300 333.8 L312 332.7 L324 336.3 L336 335.6 L348 334.8 L360 338.8 L372 336.3 L384 340.2 L396 345.0 L408 339.8 L420 332.1 L432 338.4 L444 333.9 L456 328.8 L468 326.4 L480 320.1 L492 315.8 L504 305.8 L516 308.5 L528 303.3 L540 288.7 L552 290.7 L564 285.1 L576 276.8 L588 272.4 L600 266.5 L612 266.3 L624 255.8 L636 254.2 L648 242.9 L660 243.6 L672 238.1 L684 227.1 L696 222.6 L708 220.9 L720 212.7 L732 215.7 L744 218.4 L756 225.4 L768 235.7 L780 235.0 L792 249.5 L804 247.4 L816 260.7 L828 258.0 L840 269.2 L852 269.1 L864 269.4 L876 272.0 L888 275.8 L900 277.0 L912 275.5 L924 275.9 L936 281.0 L948 287.3 L960 284.6 L972 279.0 L984 288.6 L996 288.1 L1008 290.6 L1020 282.1 L1032 288.7 L1044 280.2 L1056 286.8 L1068 281.4 L1080 279.7 L1092 285.8 L1104 273.5 L1116 274.1 L1128 273.7 L1140 262.0 L1152 257.1 L1164 260.6 L1176 250.6 L1188 255.7 L1200 252.0 L1212 260.4 L1224 262.6 L1236 273.0 L1248 270.3 L1260 285.1 L1272 278.2 L1284 290.9 L1296 286.6 L1308 293.6 L1320 304.3 L1332 300.5 L1344 304.8 L1356 314.8 L1368 314.9 L1380 314.6 L1392 329.7 L1404 323.2 L1416 325.4 L1428 332.6 L1440 339.2 L1440 560 Z" },
  { id: "peak", fill: "#B3C3D8", d: "M0 560 L0 416.3 L12 420.6 L24 418.2 L36 421.5 L48 421.8 L60 413.9 L72 413.2 L84 424.7 L96 416.6 L108 416.3 L120 426.9 L132 419.6 L144 424.7 L156 419.7 L168 421.9 L180 410.9 L192 410.5 L204 405.5 L216 391.6 L228 385.1 L240 373.9 L252 354.8 L264 353.0 L276 336.8 L288 317.9 L300 298.7 L312 294.3 L324 272.3 L336 258.8 L348 243.7 L360 223.7 L372 208.5 L384 182.8 L396 169.7 L408 145.8 L420 133.4 L432 117.8 L444 115.9 L456 125.3 L468 134.9 L480 153.7 L492 154.2 L504 164.6 L516 167.5 L528 177.5 L540 182.6 L552 188.6 L564 202.1 L576 219.9 L588 241.9 L600 255.8 L612 275.9 L624 291.0 L636 308.5 L648 319.0 L660 326.2 L672 349.3 L684 362.6 L696 369.3 L708 369.7 L720 376.7 L732 372.4 L744 382.8 L756 380.3 L768 377.0 L780 374.3 L792 385.3 L804 386.8 L816 373.4 L828 382.2 L840 375.1 L852 369.3 L864 367.5 L876 368.9 L888 365.0 L900 348.0 L912 350.5 L924 336.9 L936 340.6 L948 329.4 L960 331.3 L972 326.8 L984 314.2 L996 315.0 L1008 299.2 L1020 289.8 L1032 290.9 L1044 276.6 L1056 278.9 L1068 288.2 L1080 297.3 L1092 297.1 L1104 301.6 L1116 319.2 L1128 317.5 L1140 332.4 L1152 337.4 L1164 335.9 L1176 342.7 L1188 349.1 L1200 356.4 L1212 361.1 L1224 366.0 L1236 372.0 L1248 381.6 L1260 380.6 L1272 384.4 L1284 393.2 L1296 391.0 L1308 396.3 L1320 410.1 L1332 407.7 L1344 411.9 L1356 407.9 L1368 416.6 L1380 421.1 L1392 413.3 L1404 421.6 L1416 421.9 L1428 413.8 L1440 421.8 L1440 560 Z" },
  { id: "snow", fill: "#EEF2F7", d: "M432 117.8 L444 115.9 L456 125.3 L468 134.9 L462 150 L450 140 L440 158 L428 142 L414 152 L420 133.4 Z" },
  { id: "near", fill: "#7391B6", d: "M0 560 L0 462.5 L12 458.1 L24 460.5 L36 454.2 L48 450.4 L60 453.3 L72 459.0 L84 454.5 L96 451.3 L108 439.9 L120 442.3 L132 435.3 L144 430.9 L156 427.0 L168 425.9 L180 434.4 L192 429.9 L204 426.5 L216 423.4 L228 410.7 L240 409.5 L252 412.5 L264 417.3 L276 422.3 L288 425.7 L300 416.0 L312 427.3 L324 431.2 L336 431.5 L348 429.1 L360 436.6 L372 433.3 L384 449.5 L396 451.1 L408 448.7 L420 447.4 L432 459.7 L444 456.8 L456 464.3 L468 464.8 L480 458.8 L492 456.2 L504 457.7 L516 453.2 L528 446.7 L540 446.6 L552 452.0 L564 436.7 L576 433.4 L588 438.9 L600 428.4 L612 427.2 L624 420.9 L636 413.4 L648 418.4 L660 400.0 L672 397.8 L684 388.6 L696 389.7 L708 378.1 L720 373.4 L732 373.6 L744 360.6 L756 358.2 L768 357.5 L780 338.4 L792 331.4 L804 327.6 L816 329.7 L828 320.8 L840 308.1 L852 303.0 L864 293.8 L876 291.6 L888 287.2 L900 304.4 L912 314.3 L924 321.8 L936 324.9 L948 335.0 L960 326.4 L972 337.1 L984 354.3 L996 357.6 L1008 357.9 L1020 372.6 L1032 373.6 L1044 382.8 L1056 380.3 L1068 384.6 L1080 394.4 L1092 395.0 L1104 402.5 L1116 414.6 L1128 406.9 L1140 403.8 L1152 406.1 L1164 409.6 L1176 420.6 L1188 414.8 L1200 414.3 L1212 411.7 L1224 426.0 L1236 416.9 L1248 413.1 L1260 410.0 L1272 408.8 L1284 409.1 L1296 415.0 L1308 402.2 L1320 395.4 L1332 397.6 L1344 388.6 L1356 400.6 L1368 391.7 L1380 403.3 L1392 412.2 L1404 411.3 L1416 425.4 L1428 422.0 L1440 423.0 L1440 560 Z" },
  { id: "base", fill: "#1558A5", d: "M0 560 L0 499.8 L12 498.6 L24 496.5 L36 495.5 L48 490.3 L60 489.7 L72 476.1 L84 478.4 L96 481.3 L108 474.8 L120 474.8 L132 468.3 L144 475.6 L156 475.8 L168 482.3 L180 485.5 L192 481.6 L204 486.8 L216 490.3 L228 500.7 L240 501.5 L252 496.8 L264 506.8 L276 500.0 L288 506.5 L300 501.0 L312 499.8 L324 510.3 L336 502.3 L348 502.0 L360 510.8 L372 508.9 L384 501.0 L396 508.1 L408 501.7 L420 501.6 L432 493.0 L444 498.9 L456 492.9 L468 493.2 L480 489.3 L492 479.0 L504 476.6 L516 471.1 L528 467.6 L540 463.3 L552 462.9 L564 463.1 L576 452.6 L588 457.3 L600 449.7 L612 445.9 L624 448.5 L636 441.0 L648 440.2 L660 445.7 L672 451.8 L684 447.5 L696 462.0 L708 453.9 L720 466.0 L732 470.5 L744 463.9 L756 476.4 L768 474.5 L780 480.3 L792 476.6 L804 480.1 L816 484.8 L828 497.1 L840 491.0 L852 500.6 L864 505.6 L876 508.5 L888 503.1 L900 503.7 L912 505.8 L924 508.5 L936 499.9 L948 506.8 L960 506.3 L972 505.7 L984 494.3 L996 503.4 L1008 490.9 L1020 491.2 L1032 490.5 L1044 490.1 L1056 479.0 L1068 481.8 L1080 473.0 L1092 465.8 L1104 461.5 L1116 455.3 L1128 449.6 L1140 445.9 L1152 447.7 L1164 446.7 L1176 432.0 L1188 425.8 L1200 432.3 L1212 422.0 L1224 415.5 L1236 408.5 L1248 414.5 L1260 422.2 L1272 422.6 L1284 427.1 L1296 427.5 L1308 442.6 L1320 436.7 L1332 446.9 L1344 455.7 L1356 451.8 L1368 463.5 L1380 470.6 L1392 471.1 L1404 477.3 L1416 473.4 L1428 481.5 L1440 482.2 L1440 560 Z" },
]; 

/** Where the Nova star pair sits in the hero (viewBox units). Upper-right of the main peak, like the logo. */
export const HERO_STARS_ORIGIN = { x: 520, y: 92 } as const;

export const LOGO_MOUNTAIN_PATH =
  "M0.0 348.0 L3.5 348.5 L81.3 300.9 L113.7 278.9 L144.4 252.5 L159.5 255.5 L216.6 284.0 L213.6 252.1 L213.6 215.7 L215.7 211.0 L379.2 54.5 L395.6 43.2 L404.2 40.2 L412.0 40.2 L421.1 45.8 L427.6 57.1 L431.0 74.4 L431.0 104.2 L381.3 150.5 L376.1 157.4 L380.9 157.8 L438.4 139.2 L442.7 140.1 L451.4 160.0 L461.3 195.8 L461.3 201.5 L458.7 206.7 L450.1 213.6 L410.7 227.4 L400.8 236.9 L390.8 256.8 L380.0 267.2 L336.8 291.4 L305.2 311.7 L304.8 313.9 L315.2 315.2 L318.6 319.5 L319.5 324.7 L315.6 339.4 L301.3 368.4 L301.8 370.9 L362.7 344.6 L367.1 338.5 L370.9 309.1 L374.8 301.8 L421.1 281.9 L448.3 252.5 L467.8 241.2 L484.2 236.9 L498.9 240.4 L514.1 252.9 L534.4 281.9 L538.7 281.0 L693.5 146.6 L697.4 147.9 L710.3 176.4 L735.0 221.4 L758.3 234.8 L770.4 245.1 L788.6 266.3 L801.6 287.5 L800.7 291.8 L770.9 318.6 L754.4 338.5 L740.6 362.7 L740.2 370.1 L759.6 361.4 L775.6 350.6 L805.0 319.9 L822.7 307.0 L837.4 301.3 L881.1 293.6 L887.6 294.4 L914.8 316.5 L951.1 337.2 L991.4 355.0 L999.6 355.8 L994.8 345.4 L984.4 331.2 L946.0 291.4 L879.8 239.5 L856.0 231.7 L842.2 223.1 L784.7 160.4 L754.9 133.2 L733.2 117.2 L711.6 108.1 L693.5 106.8 L684.4 108.9 L668.0 119.8 L632.9 154.8 L621.7 160.8 L612.6 160.4 L601.0 152.2 L584.1 135.8 L530.0 72.6 L487.7 28.1 L463.0 8.6 L442.7 0.0 L423.3 2.6 L400.8 12.5 L372.7 30.3 L343.7 51.9 L277.6 108.5 L197.6 186.3 L164.3 206.7 L128.0 234.3 L62.3 290.1 Z";

/** Services band ("climb") geometry, viewBox "0 -70 1200 312". */
export const CLIMB_VIEWBOX = "0 -70 1200 312";
/** The logo mountain is placed with translate(330 15) scale(0.6). */
export const CLIMB_MOUNTAIN_TRANSFORM = "translate(330 15) scale(0.6)";
/** Nova stars in the band, revealed when the stone reaches the summit. */
export const CLIMB_STARS_ORIGIN = { x: 663, y: 6 } as const;
export const CLIMB_BASELINE_Y = 238;

/**
 * APPROVED preset: four stops on the left ridge of the logo mountain (hand-placed on the canvas). (x, y) is the marker on the ridge,
 * (sx, sy) is where the stone's centre rests (slightly above the ridge). Index = service index.
 */
export const CLIMB_STOPS = [
  { x: 384, y: 175, sx: 389, sy: 160 },
  { x: 453, y: 122, sx: 459, sy: 108 },
  { x: 528, y: 53, sx: 535, sy: 39 },
  { x: 594, y: 15, sx: 595, sy: 0 },
] as const;

/**
 * Left ridge of the logo mountain in climb coordinates (logo path point * 0.6 + (330, 15)),
 * from the foot of the ridge to the main summit. Used to place stops for any item count.
 */
const LEFT_RIDGE: readonly (readonly [number, number])[] = [
  [62.3, 290.1], [128.0, 234.3], [164.3, 206.7], [197.6, 186.3], [277.6, 108.5],
  [343.7, 51.9], [372.7, 30.3], [400.8, 12.5], [423.3, 2.6], [442.7, 0.0],
].map(([x, y]) => [330 + x * 0.6, 15 + y * 0.6] as const);

export type ClimbStop = { x: number; y: number; sx: number; sy: number };

/**
 * Stops for the services climb. 4 items use the approved preset exactly.
 * Any other count (3 to 6) is spread evenly by arc length from the ridge foot (x = 384) to the summit,
 * so the last item always lands on the summit.
 */
export function climbStops(count: number): readonly ClimbStop[] {
  if (count === 4) return CLIMB_STOPS;
  if (count < 3 || count > 6) throw new Error(`climbStops: ${count} items is outside the supported 3 to 6`);
  const start = 384;
  const pts: [number, number][] = [];
  for (let i = 0; i < LEFT_RIDGE.length - 1; i++) {
    const [x1, y1] = LEFT_RIDGE[i];
    const [x2, y2] = LEFT_RIDGE[i + 1];
    if (x2 < start) continue;
    pts.push(x1 < start ? [start, y1 + ((start - x1) / (x2 - x1)) * (y2 - y1)] : [x1, y1]);
  }
  pts.push([...LEFT_RIDGE[LEFT_RIDGE.length - 1]] as [number, number]);
  const seg = pts.slice(1).map(([x, y], i) => Math.hypot(x - pts[i][0], y - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  return Array.from({ length: count }, (_, k) => {
    let d = (total * k) / (count - 1);
    let i = 0;
    while (i < seg.length - 1 && d > seg[i]) { d -= seg[i]; i++; }
    const t = seg[i] === 0 ? 0 : Math.min(1, d / seg[i]);
    const x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t;
    const y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t;
    const last = k === count - 1;
    return { x: Math.round(x), y: Math.round(y), sx: Math.round(x + (last ? 1 : 5)), sy: Math.round(y - 15) };
  });
}

/**
 * "Nasıl çalışıyoruz" blueprint: construction geometry drawn before the logo mountain outline.
 * Same 1000 x 371 space as LOGO_MOUNTAIN_PATH. Order = draw order.
 */
export const BLUEPRINT_VIEWBOX = "-60 -110 1120 520";
export const BLUEPRINT_CIRCLES: readonly { cx: number; cy: number; r: number }[] = [
  { cx: 442, cy: 186, r: 186 },
  { cx: 693, cy: 240, r: 132 },
  { cx: 232, cy: 275, r: 96 },
  { cx: 880, cy: 300, r: 70 },
];
export const BLUEPRINT_LINES: readonly string[] = [
  "M-40 371 L1040 371",
  "M-40 0 L1040 0",
  "M442 -80 L442 400",
  "M693 -80 L693 400",
  "M0 348 L442 0",
  "M442 0 L1000 356",
  "M538 281 L693 107 L880 294",
];
/** Logo star positions in the same space: large star, small star. */
export const BLUEPRINT_STARS = [
  { cx: 555, cy: -3, core: 13, size: 27, halo: 90 },
  { cx: 624, cy: 45, core: 9, size: 20, halo: 64 },
] as const;

/** Left ridge of the logo, foot to main summit. The process stone climbs this line. */
const ASCENT_RIDGE: readonly (readonly [number, number])[] = [
  [62.3, 290.1], [128.0, 234.3], [164.3, 206.7], [197.6, 186.3], [277.6, 108.5],
  [343.7, 51.9], [372.7, 30.3], [400.8, 12.5], [423.3, 2.6], [442.7, 0.0],
];

export const ASCENT_RIDGE_PATH = `M${ASCENT_RIDGE.map(([x, y]) => `${x} ${y}`).join(" L")}`;

function pointOnRidge(t: number): [number, number] {
  const pts = ASCENT_RIDGE;
  const seg = pts.slice(1).map(([x, y], i) => Math.hypot(x - pts[i][0], y - pts[i][1]));
  const total = seg.reduce((sum, length) => sum + length, 0);
  let distance = Math.min(1, Math.max(0, t)) * total;
  let i = 0;
  while (i < seg.length - 1 && distance > seg[i]) {
    distance -= seg[i];
    i += 1;
  }
  const [x1, y1] = pts[i];
  const [x2, y2] = pts[i + 1];
  const u = seg[i] === 0 ? 0 : distance / seg[i];
  return [x1 + (x2 - x1) * u, y1 + (y2 - y1) * u];
}

/** Six stops, evenly spaced by ridge length. Index matches the process step. */
export const ASCENT_STOPS: readonly (readonly [number, number])[] = Array.from(
  { length: 6 },
  (_, k) => pointOnRidge(k / 5),
);

/** Stone centre for progress 0..1. Sits just above the ridge. */
export function ascentPoint(t: number): [number, number] {
  const [x, y] = pointOnRidge(t);
  return [x, y - 16];
}
