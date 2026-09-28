/* Vasquez Tacos — merch page. Products live in config.js (merch, crew).
   Mockups are drawn as layered SVG: garment color, print, lighting,
   fabric grain, then seams and stitching on top. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 });
  const biz = SITE.business;
  const phone = biz.phone.replace(/[^\d+]/g, "");

  /* ---------- color helpers ---------- */
  const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const luma = (hex) => { const [r, g, b] = rgb(hex); return (r * 299 + g * 587 + b * 114) / 1000; };
  const mix = (hex, to, t) => { const a = rgb(hex), b = rgb(to); return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const light = (hex) => luma(hex) > 150;
  // Fontana blue palette: Dodger-style blue, white and red numbers
  const BLUE = "#005a9c", NAVY = "#003b6f", RED = "#d8342a";
  const isBlue = (hex) => { const [r, g, b] = rgb(hex); return b > r + 50 && b > g + 10; };
  const inks = (hex) => light(hex) ? { ink: BLUE, accent: RED, outline: "#ffffff" }
    : isBlue(hex) ? { ink: "#ffffff", accent: RED, outline: NAVY }
    : { ink: "#ffffff", accent: "#4f9be0", outline: "#111111" };

  let uid = 0;

  /* ---------- shared SVG defs ---------- */
  const defs = (id, color) => `
    <linearGradient id="${id}-shade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="${light(color) ? .35 : .16}"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="${light(color) ? .22 : .38}"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx=".42" cy=".35" r=".6">
      <stop offset="0" stop-color="#fff" stop-opacity="${light(color) ? .18 : .1}"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}-drop" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#000" stop-opacity=".32"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="7"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .2 0 0 0 -.05"/>
    </filter>
    <filter id="${id}-soft"><feGaussianBlur stdDeviation="3.5"/></filter>
    <filter id="${id}-warp" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="2" seed="4" result="w"/>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="${id}-ink" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="9" result="n"/>
      <feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35" result="holes"/>
      <feComposite in="SourceGraphic" in2="holes" operator="in"/>
    </filter>
    <radialGradient id="${id}-ao" cx=".5" cy=".5" r=".5">
      <stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </radialGradient>`;

  const shadow = (id, cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}-drop)"/>`;
  const stitch = (d, color, w = 1.6) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-dasharray="5 4" stroke-linecap="round"/>`;
  const fold = (id, d, o = .1) => `<path d="${d}" fill="none" stroke="#000" stroke-opacity="${o}" stroke-width="7" stroke-linecap="round" filter="url(#${id}-soft)"/>`;
  const highlightFold = (id, d, o = .12) => `<path d="${d}" fill="none" stroke="#fff" stroke-opacity="${o}" stroke-width="6" stroke-linecap="round" filter="url(#${id}-soft)"/>`;

  /* ---------- brand marks (vector, screen-print style) ---------- */
  const F = {
    script: "Yellowtail, 'Brush Script MT', cursive",
    block: "Graduate, 'Rockwell', serif",
    cond: "Oswald, 'Arial Narrow', sans-serif",
    serif: "Fraunces, Georgia, serif",
  };
  function logoCircle(id, cx, cy, r, ring = true) {
    return `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
      <image href="logo.jpg" x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice"/>
      ${ring ? `<circle cx="${cx}" cy="${cy}" r="${r - .5}" fill="none" stroke="#000" stroke-opacity=".18"/>` : ""}`;
  }
  function arcText(id, text, cx, cy, r, size, fill, bottom = false, spacing = .18, stroke = "", font = F.cond) {
    const d = bottom
      ? `M${cx - r},${cy} A${r},${r} 0 0 0 ${cx + r},${cy}`
      : `M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`;
    return `<path id="${id}" d="${d}" fill="none"/>
      <text font-family="${font}" font-weight="600" font-size="${size}" letter-spacing="${size * spacing}" fill="${fill}"
        ${stroke ? `stroke="${stroke}" stroke-width="${size * .16}" paint-order="stroke" stroke-linejoin="round"` : ""}
        ${bottom ? `dominant-baseline="hanging"` : ""}><textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(text)}</textPath></text>`;
  }
  // Two-color taco silhouette: tilted shell, frilly lettuce, tomato bits
  function tacoIcon(cx, cy, s, ink, accent) {
    const frill = [...Array(9)].map((_, i) => `q${s * .055},${-s * (i % 2 ? .13 : .2)} ${s * .11},${-s * .01}`).join(" ");
    return `<g transform="translate(${cx} ${cy + s * .04}) rotate(-14)" stroke-linejoin="round">
      <path d="M${-s * .5},${-s * .03} ${frill} L${s * .5},${s * .05} Z" fill="${accent}"/>
      <rect x="${-s * .34}" y="${-s * .2}" width="${s * .1}" height="${s * .1}" rx="${s * .02}" fill="${ink}" transform="rotate(12 ${-s * .29} ${-s * .15})"/>
      <rect x="${-s * .02}" y="${-s * .24}" width="${s * .1}" height="${s * .1}" rx="${s * .02}" fill="${ink}" transform="rotate(-10 ${s * .03} ${-s * .19})"/>
      <rect x="${s * .24}" y="${-s * .19}" width="${s * .09}" height="${s * .09}" rx="${s * .02}" fill="${ink}"/>
      <path d="M${-s * .5},${-s * .04} C${-s * .52},${s * .7} ${s * .52},${s * .7} ${s * .5},${-s * .04} C${s * .3},${s * .08} ${-s * .3},${s * .08} ${-s * .5},${-s * .04} Z" fill="${ink}"/>
      ${[[-.3, .16], [-.1, .26], [.12, .24], [.32, .14], [-.18, .4], [.04, .44], [.22, .36]].map(([x, y]) => `<circle cx="${s * x}" cy="${s * y}" r="${s * .022}" fill="${accent}" fill-opacity=".5"/>`).join("")}
    </g>`;
  }  function badge(id, cx, cy, w, ink, accent) {
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="${w * .5}" fill="none" stroke="${ink}" stroke-width="${w * .03}"/>
      <circle cx="${cx}" cy="${cy}" r="${w * .34}" fill="none" stroke="${ink}" stroke-width="${w * .014}"/>
      ${arcText(id + "t", "VASQUEZ TACOS", cx, cy, w * .405, w * .105, ink, false, .14)}
      ${arcText(id + "b", "FONTANA · CALIFORNIA", cx, cy, w * .405, w * .07, ink, true, .16)}
      <text x="${cx - w * .42}" y="${cy + w * .025}" text-anchor="middle" font-size="${w * .07}" fill="${accent}">★</text>
      <text x="${cx + w * .42}" y="${cy + w * .025}" text-anchor="middle" font-size="${w * .07}" fill="${accent}">★</text>
      ${tacoIcon(cx, cy - w * .02, w * .4, ink, accent)}
      <text x="${cx}" y="${cy + w * .25}" text-anchor="middle" font-family="${F.block}" font-size="${w * .085}" fill="${accent}">909</text>
    </g>`;
  }
  function script(cx, cy, w, word, ink, accent, outline) {
    const tail = `M${cx + w * .36},${cy + w * .06} C${cx + w * .2},${cy + w * .2} ${cx - w * .2},${cy + w * .24} ${cx - w * .46},${cy + w * .16}`;
    return `<g>
      <path d="${tail}" fill="none" stroke="${outline}" stroke-width="${w * .075}" stroke-linecap="round"/>
      <path d="${tail}" fill="none" stroke="${accent}" stroke-width="${w * .04}" stroke-linecap="round"/>
      <text x="${cx}" y="${cy + w * .06}" text-anchor="middle" font-family="${F.script}" font-size="${w * .46}" fill="${ink}"
        stroke="${outline}" stroke-width="${w * .03}" paint-order="stroke" stroke-linejoin="round" transform="rotate(-8 ${cx} ${cy})">${esc(word)}</text>
    </g>`;
  }
  function monogramFlat(cx, cy, s, ink, accent) {
    const letters = (fill, extra = "") => `
      <text x="${cx - s * .15}" y="${cy + s * .3}" text-anchor="middle" font-family="${F.serif}" font-weight="800" font-size="${s * .95}" fill="${fill}" ${extra}>V</text>
      <text x="${cx + s * .17}" y="${cy + s * .34}" text-anchor="middle" font-family="${F.serif}" font-weight="800" font-size="${s * .86}" fill="${fill}" ${extra}>T</text>`;
    return letters(accent, `stroke="${accent}" stroke-width="${s * .08}" stroke-linejoin="round"`) + letters(ink);
  }

  function print(design, cx, cy, w, color) {
    const { ink, accent, outline } = inks(color);
    const id = "p" + ++uid;
    switch (design) {
      case "logo":
      case "chest":
        return logoCircle(id, cx, cy, w / 2);
      case "chest-vt":
        return monogramFlat(cx, cy, w, ink, accent);
      case "badge":
        return badge(id, cx, cy, w, ink, accent);
      case "script-vasquez":
        return script(cx, cy, w, "Vasquez", ink, accent, outline);
      case "script-tacos":
        return script(cx, cy, w, "Tacos", ink, accent, outline);
      case "jersey-front":
        return `${script(cx, cy - w * .08, w, "Vasquez", ink, accent, outline)}
          <text x="${cx - w * .32}" y="${cy + w * .5}" text-anchor="middle" font-family="${F.block}" font-size="${w * .24}" fill="${accent}"
            stroke="${outline}" stroke-width="${w * .02}" paint-order="stroke">909</text>`;
      case "taco-thursday":
        return `<g text-anchor="middle">
          <text x="${cx}" y="${cy - w * .04}" font-family="${F.cond}" font-weight="700" font-size="${w * .32}" letter-spacing="${w * .02}" fill="${ink}">TACO</text>
          <text x="${cx}" y="${cy + w * .26}" font-family="${F.script}" font-size="${w * .3}" fill="${accent}" transform="rotate(-6 ${cx} ${cy + w * .2})">Thursday</text>
          <path d="M${cx - w * .4},${cy + w * .36} H${cx + w * .4}" stroke="${ink}" stroke-width="${w * .012}"/>
          <text x="${cx}" y="${cy + w * .47}" font-family="${F.cond}" font-weight="600" font-size="${w * .06}" letter-spacing="${w * .03}" fill="${ink}">VASQUEZ TACOS · FONTANA</text>
        </g>`;
      case "taco-icon":
        return `<g text-anchor="middle">${tacoIcon(cx, cy - w * .08, w * .7, ink, accent)}
          <text x="${cx}" y="${cy + w * .38}" font-family="${F.cond}" font-weight="700" font-size="${w * .16}" letter-spacing="${w * .03}" fill="${ink}">VASQUEZ TACOS</text></g>`;
      case "varsity":
        return `<g text-anchor="middle">
          ${arcText(id + "t", "VASQUEZ", cx, cy + w * .16, w * .52, w * .14, ink, false, .04, outline, F.block)}
          <text x="${cx}" y="${cy + w * .34}" font-family="${F.block}" font-size="${w * .44}" fill="${accent}"
            stroke="${outline}" stroke-width="${w * .03}" paint-order="stroke" stroke-linejoin="round">909</text>
          <text x="${cx}" y="${cy + w * .46}" font-family="${F.cond}" font-weight="600" font-size="${w * .065}" letter-spacing="${w * .05}" fill="${ink}">FONTANA, CA</text>
        </g>`;
      case "name-number":
        return `<g text-anchor="middle">
          ${arcText(id + "t", "VASQUEZ", cx, cy + w * .02, w * .62, w * .14, ink, false, .06, "", F.block)}
          <text x="${cx}" y="${cy + w * .42}" font-family="${F.block}" font-size="${w * .54}" fill="${accent}"
            stroke="${outline}" stroke-width="${w * .03}" paint-order="stroke" stroke-linejoin="round">909</text>
        </g>`;
      case "crew":
        return `<g text-anchor="middle">
          ${arcText(id + "t", "VASQUEZ TACOS", cx, cy + w * .08, w * .46, w * .1, ink, false, .12)}
          <text x="${cx}" y="${cy + w * .24}" font-family="${F.block}" font-size="${w * .3}" fill="${accent}" stroke="${outline}" stroke-width="${w * .02}" paint-order="stroke">CREW</text>
          <text x="${cx}" y="${cy + w * .38}" font-family="${F.cond}" font-weight="600" font-size="${w * .065}" letter-spacing="${w * .05}" fill="${ink}">FONTANA · CALIFORNIA</text>
        </g>`;
      default:
        return "";
    }
  }

  /* ---------- garments ---------- */
  // Each: body path (clip + outline), print spot, and extra layers
  const TEE = "M140 58 C151 80 173 90 200 90 C227 90 249 80 260 58 L320 80 C334 86 346 98 354 114 L384 178 L330 206 L306 164 L306 350 C306 360 300 366 290 366 L110 366 C100 366 94 360 94 350 L94 164 L70 206 L16 178 L46 114 C54 98 66 86 80 80 Z";
  const HOODIE = "M128 78 L80 94 C62 100 52 112 46 128 L14 296 C12 308 18 316 28 318 L58 322 C67 323 73 318 75 310 L96 196 L96 334 L304 334 L304 196 L325 310 C327 318 333 323 342 322 L372 318 C382 316 388 308 386 296 L354 128 C348 112 338 100 320 94 L272 78 C262 102 234 114 200 114 C166 114 138 102 128 78 Z";
  const LONGSLEEVE = "M140 58 C151 80 173 90 200 90 C227 90 249 80 260 58 L320 80 C336 86 348 100 354 118 L386 296 C388 308 382 316 372 318 L342 322 C333 323 327 318 325 310 L306 190 L306 350 C306 360 300 366 290 366 L110 366 C100 366 94 360 94 350 L94 190 L75 310 C73 318 67 323 58 322 L28 318 C18 316 12 308 14 296 L46 118 C52 100 64 86 80 80 Z";
  const TOTE = "M78 128 L322 128 L338 372 L62 372 Z";
  const APRON = "M148 46 L252 46 L256 132 C292 142 318 152 332 164 L344 382 L56 382 L68 164 C82 152 108 142 144 132 Z";

  // Where each design sits on a shirt: [x, y, width]
  function placeFor(design, drop) {
    if (design === "chest" || design === "chest-vt") return [250, 148 + drop, 44];
    if (design === "logo") return [200, 196 + drop, 132];
    if (design === "badge") return [200, 196 + drop, 150];
    if (design && design.startsWith("script")) return [200, 184 + drop, 190];
    if (design === "name-number" || design === "crew") return [200, 200 + drop, 176];
    return [200, 200 + drop, 164];
  }

  function garment(item, color, side) {
    const id = "g" + ++uid;
    const { ink } = inks(color);
    const edge = mix(color, "#000000", .35);
    const seam = light(color) ? "rgba(0,0,0,.28)" : "rgba(255,255,255,.22)";
    const design = side === "back" ? item.back : item.design;
    let body, spot, under = "", details = "", over = "", drop;

    switch (item.type) {
      case "tee":
        body = TEE;
        drop = shadow(id, 200, 378, 150, 14);
        spot = placeFor(design, 0);
        if (side === "back") {
          details = `<path d="M140 58 C160 68 180 71 200 71 C220 71 240 68 260 58" fill="none" stroke="${edge}" stroke-width="7"/>`;
        } else {
          under = `<path d="M140 58 C156 66 178 70 200 70 C222 70 244 66 260 58 C249 80 227 90 200 90 C173 90 151 80 140 58 Z" fill="${mix(color, "#000000", .45)}"/>`;
          details = `<path d="M140 58 C151 80 173 90 200 90 C227 90 249 80 260 58" fill="none" stroke="${mix(color, "#000000", .18)}" stroke-width="12"/>
            ${stitch("M146 64 C157 84 176 96 200 96 C224 96 243 84 254 64", seam)}`;
        }
        details += `
          ${stitch("M22 168 L75 194", seam)}${stitch("M378 168 L325 194", seam)}
          ${stitch("M98 354 H302", seam)}
          <path d="M96 164 C100 130 100 102 86 80 M304 164 C300 130 300 102 314 80" fill="none" stroke="${seam}" stroke-width="1.4"/>
          ${fold(id, "M112 250 C150 238 176 262 214 250 S270 244 292 258")}
          ${fold(id, "M120 320 C160 306 220 330 280 312", .08)}
          ${fold(id, "M60 150 C78 140 88 150 96 170", .12)}${fold(id, "M340 150 C322 140 312 150 304 170", .12)}
          ${highlightFold(id, "M130 118 C150 130 170 128 188 138")}`;
        break;

      case "jersey": {
        body = TEE;
        drop = shadow(id, 200, 378, 150, 14);
        const pipe = item.trim || inks(color).accent;
        spot = side === "back" ? [200, 196, 190] : [200, 186, 200];
        if (side === "back") {
          details = `<path d="M140 58 C160 68 180 71 200 71 C220 71 240 68 260 58" fill="none" stroke="${pipe}" stroke-width="6"/>`;
        } else {
          under = `<path d="M144 58 C160 66 180 70 200 70 C220 70 240 66 256 58 L200 118 Z" fill="${mix(color, "#000000", .45)}"/>`;
          details = `<path d="M142 58 L200 118 L258 58" fill="none" stroke="${pipe}" stroke-width="7" stroke-linejoin="round"/>
            <path d="M200 118 V366" stroke="${mix(color, "#000000", .25)}" stroke-width="2"/>
            <path d="M206 118 V366" stroke="${pipe}" stroke-width="4"/>
            ${[150, 190, 230, 270, 310].map((y) => `<circle cx="198" cy="${y}" r="5" fill="${mix(color, "#ffffff", .5)}" stroke="#000" stroke-opacity=".3"/><circle cx="197" cy="${y - 1}" r="1.6" fill="#fff" fill-opacity=".7"/>`).join("")}`;
        }
        details = [...Array(30)].map((_, i) => `<path d="M${14 + i * 13} 40 V380" stroke="${pipe}" stroke-opacity=".28" stroke-width="1.3"/>`).join("") + details;
        details += `
          <path d="M16 178 L70 206 M384 178 L330 206" stroke="${pipe}" stroke-width="6"/>
          ${stitch("M98 354 H302", seam)}
          <path d="M96 164 C100 130 100 102 86 80 M304 164 C300 130 300 102 314 80" fill="none" stroke="${seam}" stroke-width="1.4"/>
          ${[...Array(40)].map((_, i) => `<circle cx="${100 + (i % 10) * 22}" cy="${130 + Math.floor(i / 10) * 60}" r="1" fill="#000" fill-opacity=".08"/>`).join("")}
          ${fold(id, "M112 250 C150 238 176 262 214 250 S270 244 292 258")}
          ${fold(id, "M60 150 C78 140 88 150 96 170", .12)}${fold(id, "M340 150 C322 140 312 150 304 170", .12)}
          ${highlightFold(id, "M130 118 C150 130 170 128 188 138")}`;
        break;
      }

      case "longsleeve":
      case "crewneck": {
        const crewneck = item.type === "crewneck";
        body = LONGSLEEVE;
        drop = shadow(id, 200, 378, 175, 14);
        spot = placeFor(design, 0);
        const collar = crewneck ? 16 : 12;
        if (side === "back") {
          details = `<path d="M140 58 C160 68 180 71 200 71 C220 71 240 68 260 58" fill="none" stroke="${edge}" stroke-width="${collar - 4}"/>`;
        } else {
          under = `<path d="M140 58 C156 66 178 70 200 70 C222 70 244 66 260 58 C249 80 227 90 200 90 C173 90 151 80 140 58 Z" fill="${mix(color, "#000000", .45)}"/>`;
          details = `<path d="M140 58 C151 80 173 90 200 90 C227 90 249 80 260 58" fill="none" stroke="${mix(color, "#000000", .18)}" stroke-width="${collar}"/>
            ${crewneck ? [...Array(14)].map((_, i) => { const t = (i + .5) / 14, x = 140 + t * 120, y = 58 + Math.sin(t * Math.PI) * 32; return `<path d="M${x} ${y - 6} V${y + 6}" stroke="#000" stroke-opacity=".12" stroke-width="1.3"/>`; }).join("") : ""}
            ${stitch("M146 66 C157 86 176 98 200 98 C224 98 243 86 254 66", seam)}`;
        }
        details += `
          <path d="M14 296 L75 306 L73 324 L10 314 Z M386 296 L325 306 L327 324 L390 314 Z" fill="${mix(color, "#000000", .15)}"/>
          <path d="M96 190 C100 140 100 106 86 80 M304 190 C300 140 300 106 314 80" fill="none" stroke="${seam}" stroke-width="1.4"/>
          ${crewneck ? `<path d="M94 334 H306 V356 C306 362 300 366 294 366 H106 C100 366 94 362 94 356 Z" fill="${mix(color, "#000000", .15)}"/>
            ${[...Array(24)].map((_, i) => `<path d="M${99 + i * 8.7} 338 V362" stroke="#000" stroke-opacity=".1" stroke-width="1.5"/>`).join("")}` : stitch("M98 354 H302", seam)}
          ${fold(id, "M112 250 C150 238 176 262 214 250 S270 244 292 258")}
          ${fold(id, "M50 190 C58 230 62 260 58 290", .12)}${fold(id, "M350 190 C342 230 338 260 342 290", .12)}
          ${highlightFold(id, "M130 118 C150 130 170 128 188 138")}`;
        break;
      }

      case "hoodie":
        body = HOODIE;
        drop = shadow(id, 200, 372, 170, 14);
        spot = placeFor(design, 16);
        if (side === "back") {
          over = `<path d="M126 80 C124 34 160 10 200 10 C240 10 276 34 274 80 C262 118 234 136 200 136 C166 136 138 118 126 80 Z" fill="${color}"/>
            <path d="M126 80 C124 34 160 10 200 10 C240 10 276 34 274 80 C262 118 234 136 200 136 C166 136 138 118 126 80 Z" fill="url(#${id}-shade)"/>
            <path d="M200 12 V134" stroke="${seam}" stroke-width="1.6"/>
            ${fold(id, "M150 100 C170 124 230 124 250 100", .14)}`;
        } else {
          under = `<path d="M130 80 C128 34 162 12 200 12 C238 12 272 34 270 80 L262 90 C256 60 232 44 200 44 C168 44 144 60 138 90 Z" fill="${color}"/>
            <path d="M130 80 C128 34 162 12 200 12 C238 12 272 34 270 80 L262 90 C256 60 232 44 200 44 C168 44 144 60 138 90 Z" fill="url(#${id}-shade)"/>`;
          over = `<path d="M138 86 C146 56 170 42 200 42 C230 42 254 56 262 86 C250 106 228 116 200 116 C172 116 150 106 138 86 Z" fill="${mix(color, "#000000", .55)}"/>
            <path d="M138 86 C150 104 172 116 200 116 C228 116 250 104 262 86" fill="none" stroke="${mix(color, "#000000", .2)}" stroke-width="9"/>
            <path d="M186 114 C184 140 182 160 180 184 M214 114 C216 140 218 160 220 180" fill="none" stroke="${ink}" stroke-opacity=".85" stroke-width="4" stroke-linecap="round"/>
            <rect x="176" y="182" width="8" height="16" rx="2" fill="#b9bcc2"/><rect x="216" y="178" width="8" height="16" rx="2" fill="#b9bcc2"/>
            <circle cx="186" cy="116" r="3.5" fill="#b9bcc2"/><circle cx="214" cy="116" r="3.5" fill="#b9bcc2"/>`;
          details = `<path d="M128 262 H272 L292 330 H108 Z" fill="${mix(color, "#000000", .08)}"/>
            ${stitch("M134 268 H266 L284 326 H116 Z", seam)}
            <path d="M128 262 C118 280 112 304 108 330 M272 262 C282 280 288 304 292 330" fill="none" stroke="${mix(color, "#000000", .3)}" stroke-width="3"/>`;
        }
        details += `
          <path d="M96 334 H304 V356 C304 362 300 366 294 366 H106 C100 366 96 362 96 356 Z" fill="${mix(color, "#000000", .15)}"/>
          ${[...Array(24)].map((_, i) => `<path d="M${100 + i * 8.5} 338 V362" stroke="#000" stroke-opacity=".1" stroke-width="1.5"/>`).join("")}
          <path d="M14 296 L75 306 L73 324 L10 314 Z M386 296 L325 306 L327 324 L390 314 Z" fill="${mix(color, "#000000", .15)}"/>
          <path d="M96 196 C100 150 98 118 90 96 M304 196 C300 150 302 118 310 96" fill="none" stroke="${seam}" stroke-width="1.4"/>
          ${fold(id, "M120 240 C160 230 200 248 240 236 S290 232 300 244", .1)}
          ${fold(id, "M50 200 C58 230 62 260 58 290", .12)}${fold(id, "M350 200 C342 230 338 260 342 290", .12)}
          ${highlightFold(id, "M120 130 C140 150 160 150 176 160")}`;
        break;

      case "tote":
        body = TOTE;
        drop = shadow(id, 200, 382, 150, 12);
        spot = [200, 254, 170];
        under = `<path d="M146 130 C146 46 254 46 254 130" fill="none" stroke="${mix(color, "#000000", .3)}" stroke-width="14"/>
          <path d="M126 134 C126 26 274 26 274 134" fill="none" stroke="${mix(color, "#000000", .1)}" stroke-width="15"/>
          <path d="M126 134 C126 26 274 26 274 134" fill="none" stroke="${seam}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
        details = `<path d="M78 128 H322 L323 150 H77 Z" fill="${mix(color, "#000000", .08)}"/>
          ${stitch("M80 146 H320", seam)}
          <path d="M122 128 V170 M178 128 V170 M222 128 V170 M278 128 V170" stroke="${seam}" stroke-width="1.2"/>
          ${fold(id, "M110 200 C120 260 116 320 104 368", .12)}${fold(id, "M300 200 C290 260 294 320 306 368", .1)}`;
        break;

      case "apron":
        body = APRON;
        drop = shadow(id, 200, 390, 150, 10);
        spot = [200, 110, 84];
        under = `<path d="M150 50 C160 8 240 8 250 50" fill="none" stroke="${mix(color, "#000000", .25)}" stroke-width="10"/>
          <path d="M70 168 C40 180 26 210 18 250 M330 168 C360 180 374 210 382 250" fill="none" stroke="${mix(color, "#000000", .2)}" stroke-width="9" stroke-linecap="round"/>`;
        details = `<path d="M96 270 H304 V336 C304 340 300 344 296 344 H104 C100 344 96 340 96 336 Z" fill="${mix(color, "#000000", .1)}"/>
          ${stitch("M102 276 H298 V338 H102 Z", seam)}
          <path d="M200 270 V344" stroke="${seam}" stroke-width="1.6" stroke-dasharray="5 4"/>
          ${stitch("M154 54 H246", seam)}${stitch("M64 372 H336", seam)}
          ${fold(id, "M140 180 C150 230 146 300 140 370", .1)}${fold(id, "M260 180 C250 230 254 300 262 370", .08)}`;
        break;
    }

    const [px, py, pw] = spot;
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup${side === "back" ? ", back" : ""}">
      <defs>${defs(id, color)}<clipPath id="${id}-c"><path d="${body}"/></clipPath></defs>
      ${drop}${under}
      <g clip-path="url(#${id}-c)">
        <rect width="400" height="400" fill="${color}"/>
        <g filter="url(#${id}-warp)"><g opacity="${light(color) ? .93 : .97}" style="mix-blend-mode:${light(color) ? "multiply" : "normal"}">${print(design, px, py, pw, color)}</g></g>
        <rect width="400" height="400" fill="url(#${id}-shade)"/>
        <rect x="-60" y="-40" width="520" height="480" fill="url(#${id}-ao)"/>
        <rect width="400" height="400" fill="url(#${id}-glow)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
        ${details}
      </g>
      <path d="${body}" fill="none" stroke="${edge}" stroke-opacity=".55" stroke-width="1.5"/>
      ${over}
    </svg>`;
  }

  /* ---------- embroidered cap monogram ("VT", raised thread look) ---------- */
  function monogram(id, cx, cy, color, trim) {
    const thread = trim || inks(color).ink;
    const edge = light(color) ? RED : isBlue(color) ? RED : BLUE;
    const letters = (fill, extra = "") => `
      <text x="${cx - 14}" y="${cy + 30}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="92" fill="${fill}" ${extra}>V</text>
      <text x="${cx + 16}" y="${cy + 34}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-size="84" fill="${fill}" ${extra}>T</text>`;
    return `<defs><pattern id="${id}-satin" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(55)">
        <rect width="4" height="4" fill="none"/><rect width="1.4" height="4" fill="#fff" fill-opacity=".22"/></pattern>
        <filter id="${id}-raise" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2.5" stdDeviation="1.6" flood-opacity=".55"/></filter></defs>
      <g filter="url(#${id}-raise)">
        ${letters(edge, `stroke="${edge}" stroke-width="7" stroke-linejoin="round"`)}
        ${letters(thread)}
        ${letters(`url(#${id}-satin)`)}
      </g>`;
  }

  // Raised embroidery: outline pass, thread pass, satin-stitch sheen
  function embroidered(id, color, layer) {
    const thread = inks(color).ink;
    const edge = light(color) ? "#ffffff" : NAVY;
    return `<defs><pattern id="${id}-sat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(55)">
        <rect width="1.4" height="4" fill="#fff" fill-opacity=".22"/></pattern>
        <filter id="${id}-rz" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2.5" stdDeviation="1.6" flood-opacity=".5"/></filter></defs>
      <g filter="url(#${id}-rz)">
        ${layer(edge, `stroke="${edge}" stroke-width="6" stroke-linejoin="round"`, false)}
        ${layer(thread, "", true)}
        ${layer(`url(#${id}-sat)`, "", false)}
      </g>`;
  }

  /* ---------- hats ---------- */
  function hat(item, color) {
    const id = "h" + ++uid;
    const dad = item.type === "dadhat";
    const seam = light(color) ? "rgba(0,0,0,.3)" : "rgba(255,255,255,.22)";
    const crown = dad
      ? "M88 226 C86 150 134 100 205 100 C276 100 324 150 322 226 Z"
      : "M86 226 C80 140 130 86 205 86 C280 86 330 140 324 226 Z";
    const brim = dad
      ? "M96 222 C150 212 260 212 314 222 C328 248 320 292 292 314 C256 334 154 334 118 314 C90 292 82 248 96 222 Z"
      : "M90 222 C150 210 260 210 320 222 C334 250 332 298 302 320 C262 340 148 340 108 320 C78 298 76 250 90 222 Z";
    const top = dad ? 102 : 84;
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs>${defs(id, color)}<clipPath id="${id}-c"><path d="${crown}"/></clipPath><clipPath id="${id}-b"><path d="${brim}"/></clipPath></defs>
      ${shadow(id, 205, 352, 150, 16)}
      <g clip-path="url(#${id}-c)">
        <rect width="400" height="400" fill="${color}"/>
        <rect width="400" height="400" fill="url(#${id}-shade)"/>
        <rect width="400" height="400" fill="url(#${id}-glow)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
        <path d="M205 ${top} C200 150 198 190 200 226 M150 ${top + 18} C128 150 124 190 126 228 M262 ${top + 18} C284 150 290 190 288 228" fill="none" stroke="${seam}" stroke-width="1.6"/>
        ${stitch(`M198 ${top + 4} C193 150 191 190 193 226`, seam, 1.2)}${stitch(`M212 ${top + 4} C207 150 205 190 207 226`, seam, 1.2)}
        <circle cx="160" cy="${top + 58}" r="4" fill="none" stroke="${seam}" stroke-width="2"/><circle cx="252" cy="${top + 58}" r="4" fill="none" stroke="${seam}" stroke-width="2"/>
        ${fold(id, "M100 230 C104 190 118 160 140 140", .14)}${highlightFold(id, "M168 118 C180 108 196 104 214 104", .18)}
      </g>
      <path d="${crown}" fill="none" stroke="${mix(color, "#000000", .35)}" stroke-opacity=".5" stroke-width="1.5"/>
      <ellipse cx="205" cy="${top + 2}" rx="15" ry="6" fill="${mix(color, "#000000", .12)}"/>
      <ellipse cx="205" cy="${top}" rx="13" ry="4.5" fill="${mix(color, "#ffffff", .12)}"/>
      ${item.design === "monogram" ? monogram(id, 205, 160, color, item.trim)
        : item.design === "script" ? embroidered(id, color, (fill, extra) => `<text x="205" y="${dad ? 184 : 176}" text-anchor="middle" font-family="${F.script}" font-size="${dad ? 62 : 68}" fill="${fill}" ${extra} transform="rotate(-8 205 165)">Vasquez</text>
            <path d="M262 ${dad ? 190 : 184} C230 ${dad ? 206 : 200} 170 ${dad ? 208 : 202} 142 ${dad ? 196 : 190}" fill="none" stroke="${fill === inks(color).ink ? RED : fill}" stroke-width="5" stroke-linecap="round" ${extra}/>`)
        : item.design === "taco" ? embroidered(id, color, (fill, extra, main) => `<g ${extra}>${tacoIcon(205, dad ? 172 : 164, 104, fill, main ? RED : fill)}</g>`)
        : `<g>
        <circle cx="205" cy="${dad ? 166 : 158}" r="${dad ? 38 : 46}" fill="#1c1210"/>
        ${logoCircle(id + "l", 205, dad ? 166 : 158, dad ? 34 : 42, false)}
        <circle cx="205" cy="${dad ? 166 : 158}" r="${dad ? 36 : 44}" fill="none" stroke="#f2b53a" stroke-width="2" stroke-dasharray="3 3"/>
      </g>`}
      ${item.sidePatch ? `<g transform="translate(292 190) scale(.62 1) rotate(8)">
        <circle r="24" fill="${NAVY}"/>${tacoIcon(0, 2, 30, "#ffffff", RED)}
        <circle r="22" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2"/></g>` : ""}
      <g clip-path="url(#${id}-b)">
        <rect width="400" height="400" fill="${mix(color, "#000000", .06)}"/>
        <rect width="400" height="400" fill="url(#${id}-shade)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
        ${[0, 9, 18, 27].map((o) => stitch(`M${(dad ? 112 : 106) + o * .6} ${306 - o} C160 ${326 - o} 250 ${326 - o} ${(dad ? 298 : 304) - o * .6} ${306 - o}`, seam, 1.2)).join("")}
        <path d="${dad ? "M118 314 C154 334 256 334 292 314" : "M108 320 C148 340 262 340 302 320"}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="6"/>
        <path d="M110 232 C160 246 250 246 300 232" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="10" filter="url(#${id}-soft)"/>
      </g>
      <path d="${brim}" fill="none" stroke="${mix(color, "#000000", .4)}" stroke-opacity=".6" stroke-width="1.5"/>
      <path d="${dad ? "M88 226 C150 216 260 216 322 226" : "M86 226 C150 214 260 214 324 226"}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="3"/>
      ${item.sticker ? `<g transform="translate(262 272) scale(1 .78) rotate(-6)">
        <circle r="19" fill="#d9a93a"/><circle r="19" fill="url(#${id}-shade)"/><circle r="15.5" fill="none" stroke="#fff4c9" stroke-opacity=".7" stroke-width="1"/>
        <text y="-3" text-anchor="middle" font-family="DM Sans, sans-serif" font-weight="700" font-size="9" fill="#3a2a10">${esc(item.sticker)}</text>
        <text y="8" text-anchor="middle" font-family="DM Sans, sans-serif" font-weight="700" font-size="5" letter-spacing=".6" fill="#3a2a10">FITTED</text></g>` : ""}
    </svg>`;
  }

  /* ---------- beanie ---------- */
  function beanie(item, color) {
    const id = "b" + ++uid;
    const cuffColor = mix(color, "#000000", .1);
    const dome = "M96 236 C92 132 146 70 205 70 C264 70 318 132 314 236 Z";
    const cuff = "M88 222 C150 206 260 206 322 222 L326 300 C262 316 148 316 84 300 Z";
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs>${defs(id, color)}<clipPath id="${id}-d"><path d="${dome}"/></clipPath><clipPath id="${id}-c"><path d="${cuff}"/></clipPath></defs>
      ${shadow(id, 205, 322, 150, 14)}
      <g clip-path="url(#${id}-d)">
        <rect width="400" height="400" fill="${color}"/>
        ${[...Array(26)].map((_, i) => `<path d="M${100 + i * 8.4} 60 C${104 + i * 7.6} 140 ${100 + i * 8.4} 200 ${96 + i * 8.8} 240" fill="none" stroke="#000" stroke-opacity=".09" stroke-width="3"/>`).join("")}
        <rect width="400" height="400" fill="url(#${id}-shade)"/><rect width="400" height="400" fill="url(#${id}-glow)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
        ${fold(id, "M130 120 C150 100 176 90 200 88", .1)}
      </g>
      <path d="${dome}" fill="none" stroke="${mix(color, "#000000", .4)}" stroke-opacity=".5" stroke-width="1.5"/>
      <g clip-path="url(#${id}-c)">
        <rect width="400" height="400" fill="${cuffColor}"/>
        ${[...Array(32)].map((_, i) => `<path d="M${86 + i * 7.6} 200 V320" stroke="#000" stroke-opacity=".13" stroke-width="3.2"/>`).join("")}
        <rect width="400" height="400" fill="url(#${id}-shade)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
        <path d="M86 226 C150 212 260 212 324 226" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="5" filter="url(#${id}-soft)"/>
      </g>
      <path d="${cuff}" fill="none" stroke="${mix(color, "#000000", .45)}" stroke-opacity=".55" stroke-width="1.5"/>
      <linearGradient id="${id}-lea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c99a68"/><stop offset="1" stop-color="#8f6139"/></linearGradient>
      <rect x="163" y="232" width="84" height="62" rx="8" fill="url(#${id}-lea)" stroke="#6b4526" stroke-opacity=".5"/>
      <rect x="163" y="232" width="84" height="62" rx="8" filter="url(#${id}-grain)"/>
      <rect x="168" y="237" width="74" height="52" rx="5" fill="none" stroke="#f3e2c8" stroke-opacity=".7" stroke-width="1.3" stroke-dasharray="3 2.5"/>
      <g transform="translate(0 1)">${monogramFlat(205, 256, 38, "#fff3df", "#fff3df").replace(/fill="#fff3df"/g, `fill="#f3e2c8" fill-opacity=".35"`)}</g>
      ${monogramFlat(205, 256, 38, "#6b4526", "#6b4526")}
    </svg>`;
  }

  /* ---------- can cooler ---------- */
  function cooler(item, color) {
    const id = "cc" + ++uid;
    const { ink, accent } = inks(color);
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs>${defs(id, color)}
        <linearGradient id="${id}-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".18" stop-color="#000" stop-opacity=".05"/>
          <stop offset=".32" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
        <linearGradient id="${id}-can" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d9096"/><stop offset=".35" stop-color="#eef0f2"/><stop offset=".7" stop-color="#a9acb2"/><stop offset="1" stop-color="#6d7076"/></linearGradient>
        <clipPath id="${id}-c"><path d="M122 110 H278 V340 A78 16 0 0 1 122 340 Z"/></clipPath></defs>
      ${shadow(id, 200, 360, 110, 12)}
      <path d="M130 92 A70 14 0 0 1 270 92 V112 H130 Z" fill="url(#${id}-can)"/>
      <ellipse cx="200" cy="92" rx="70" ry="14" fill="#d9dce0"/><ellipse cx="200" cy="92" rx="56" ry="10" fill="#b9bcc2"/>
      <path d="M186 88 h28 a4 4 0 0 1 0 8 h-28 a4 4 0 0 1 0 -8z" fill="#9a9da3"/>
      <g clip-path="url(#${id}-c)">
        <rect width="400" height="400" fill="${color}"/>
        <g opacity=".95">${badge(id + "bd", 200, 226, 134, ink, accent)}</g>
        <rect width="400" height="400" fill="url(#${id}-cyl)"/>
        <rect width="400" height="400" filter="url(#${id}-grain)"/>
      </g>
      <ellipse cx="200" cy="110" rx="78" ry="16" fill="none" stroke="${mix(color, "#000000", .35)}" stroke-width="4"/>
      <ellipse cx="200" cy="110" rx="78" ry="16" fill="none" stroke="${ink}" stroke-opacity=".15" stroke-width="1" stroke-dasharray="4 3" transform="translate(0 6)"/>
      <path d="M122 110 V340 A78 16 0 0 0 278 340 V110" fill="none" stroke="${mix(color, "#000000", .4)}" stroke-opacity=".6" stroke-width="1.5"/>
    </svg>`;
  }

  /* ---------- keychain + bottle opener ---------- */
  const metalGrad = (id, color) => `<linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${mix(color, "#ffffff", .55)}"/><stop offset=".35" stop-color="${color}"/>
      <stop offset=".55" stop-color="${mix(color, "#ffffff", .35)}"/><stop offset="1" stop-color="${mix(color, "#000000", .45)}"/></linearGradient>`;
  const keyRing = (id, cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#${id}-metal)" stroke-width="7"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="${r * 1.2} ${r * 5}"/>`;

  function keychain(item, color) {
    const id = "k" + ++uid;
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs>${defs(id, "#ffffff")}${metalGrad(id, color)}
        <linearGradient id="${id}-acr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".4" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient></defs>
      ${shadow(id, 212, 372, 110, 12)}
      ${keyRing(id, 200, 72, 42)}
      <path d="M200 112 V136" stroke="url(#${id}-metal)" stroke-width="5"/>
      <circle cx="200" cy="146" r="11" fill="none" stroke="url(#${id}-metal)" stroke-width="5"/>
      <circle cx="200" cy="252" r="104" fill="#fff" fill-opacity=".55" stroke="#000" stroke-opacity=".12"/>
      <circle cx="200" cy="252" r="95" fill="${BLUE}"/>
      ${badge(id + "bd", 200, 252, 176, "#ffffff", RED)}
      <circle cx="200" cy="252" r="104" fill="url(#${id}-acr)"/>
      <circle cx="200" cy="160" r="7" fill="#e9e4dc" stroke="#000" stroke-opacity=".2"/>
      <path d="M130 190 C150 168 176 158 200 156" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
  }

  function opener(item, color) {
    const id = "o" + ++uid;
    const dark = luma(color) < 90;
    const bodyPath = "M200 64 C250 64 282 96 282 146 L282 312 C282 352 250 372 200 372 C150 372 118 352 118 312 L118 146 C118 96 150 64 200 64 Z";
    const hole = "M160 104 H240 C254 104 262 112 262 124 V132 C262 142 254 148 244 148 H222 L214 162 H186 L178 148 H156 C146 148 138 142 138 132 V124 C138 112 146 104 160 104 Z";
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs>${defs(id, color)}${metalGrad(id, color)}
        <filter id="${id}-engrave"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="${dark ? .9 : .8}" intercept="${dark ? .25 : 0}"/><feFuncG type="linear" slope="${dark ? .9 : .8}" intercept="${dark ? .25 : 0}"/><feFuncB type="linear" slope="${dark ? .9 : .8}" intercept="${dark ? .25 : 0}"/></feComponentTransfer></filter></defs>
      ${shadow(id, 210, 384, 110, 10)}
      <path d="${bodyPath} ${hole}" fill="url(#${id}-metal)" fill-rule="evenodd" transform="rotate(-8 200 220)"/>
      <path d="${hole}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3" transform="rotate(-8 200 220)"/>
      <g transform="rotate(-8 200 220)" opacity=".8">${badge(id + "bd", 200, 252, 124, dark ? "#e4e4e4" : "#3b3d42", dark ? "#e4e4e4" : "#3b3d42")}</g>
      <circle cx="200" cy="252" r="66" fill="none" stroke="#000" stroke-opacity=".12" transform="rotate(-8 200 220)"/>
      <path d="${bodyPath}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2" transform="rotate(-8 200 220) translate(3 3) scale(.985)"/>
      <circle cx="${200 + 22}" cy="342" r="9" fill="#efe9df" stroke="#000" stroke-opacity=".3" transform="rotate(-8 200 220)"/>
      ${keyRing(id, 246, 372, 30)}
    </svg>`;
  }

  /* ---------- stickers ---------- */
  function stickers(item) {
    const id = "s" + ++uid;
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(item.name)} mockup">
      <defs><filter id="${id}-sd" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity=".25"/></filter></defs>
      <g transform="rotate(-8 150 160)" filter="url(#${id}-sd)">
        <circle cx="150" cy="160" r="116" fill="#fff"/><circle cx="150" cy="160" r="106" fill="${BLUE}"/>
        ${badge(id + "b", 150, 160, 196, "#ffffff", RED)}
      </g>
      <g transform="rotate(10 300 250)" filter="url(#${id}-sd)">
        <rect x="236" y="196" width="128" height="112" rx="28" fill="#fff"/>
        ${monogramFlat(300, 238, 84, BLUE, RED)}
      </g>
      <g transform="rotate(-5 150 330)" filter="url(#${id}-sd)">
        <rect x="40" y="290" width="220" height="80" rx="40" fill="#fff" stroke="#e9e9e9"/>
        ${script(150, 318, 170, "Tacos", BLUE, RED, "#ffffff")}
      </g>
      <g transform="rotate(8 320 350)" filter="url(#${id}-sd)">
        <rect x="262" y="326" width="118" height="46" rx="23" fill="${RED}"/>
        <text x="321" y="355" text-anchor="middle" font-family="${F.cond}" font-weight="700" font-size="15" letter-spacing="1.5" fill="#fff">TACO THURSDAY</text>
      </g>
    </svg>`;
  }
  function mockup(item, color, side = "front") {
    switch (item.type) {
      case "snapback": case "dadhat": return hat(item, color);
      case "beanie": return beanie(item, color);
      case "cooler": return cooler(item, color);
      case "keychain": return keychain(item, color);
      case "opener": return opener(item, color);
      case "sticker": return stickers(item);
      default: return garment(item, color, side);
    }
  }

  /* ---------- product cards ---------- */
  const APPAREL_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
  const SIZES = { jersey: APPAREL_SIZES, tee: APPAREL_SIZES, longsleeve: APPAREL_SIZES, crewneck: APPAREL_SIZES, hoodie: APPAREL_SIZES };
  const CATEGORY = { jersey: "Jerseys", tee: "Tees", longsleeve: "Tees", hoodie: "Sweatshirts", crewneck: "Sweatshirts",
    snapback: "Headwear", dadhat: "Headwear", beanie: "Headwear",
    apron: "Home & Kitchen", opener: "Home & Kitchen", cooler: "Home & Kitchen",
    tote: "Accessories", keychain: "Accessories", sticker: "Accessories" };
  const state = new Map();

  function card(item, key, crew) {
    const s = state.get(key) || { color: 0, side: "front" };
    state.set(key, s);
    const [colorName, hex] = item.colors[s.color];
    const sizes = SIZES[item.type];
    return `
      <article class="merch-card" data-key="${key}">
        <div class="merch-stage">
          ${item.badge ? `<span class="merch-badge">${esc(item.badge)}</span>` : ""}
          ${item.back
            ? `<div class="merch-art has-back${s.side === "back" ? " flipped" : ""}" data-flip title="Tap to see the back">
                 <div class="art-front">${mockup(item, hex, "front")}</div><div class="art-back">${mockup(item, hex, "back")}</div></div>
               <span class="flip-hint">Front / Back</span>`
            : `<div class="merch-art">${mockup(item, hex, "front")}</div>`}
        </div>
        <div class="merch-info">
          ${crew ? "" : `<p class="merch-cat">${esc(CATEGORY[item.type] || "Merch")} · ${item.colors.length} color${item.colors.length > 1 ? "s" : ""}</p>`}
          <div class="merch-title">
            <h3>${esc(item.name)}</h3>
            ${crew ? "" : `<p class="merch-price">${money(item.price)}</p>`}
          </div>
          ${item.colors.length > 1 ? `
            <div class="swatches" role="group" aria-label="Color">
              ${item.colors.map(([n, h], i) => `<button class="swatch" style="--sw:${h}" data-color="${i}" aria-label="${esc(n)}" aria-pressed="${i === s.color}"></button>`).join("")}
              <span class="swatch-name">${esc(colorName)}</span>
            </div>` : `<p class="swatch-name solo">${esc(colorName)}</p>`}
          ${crew ? `<p class="merch-spec">${esc(item.spec)}</p>` : `
            <div class="merch-buy">
              ${sizes ? `<select class="size" aria-label="Size">${sizes.map((z) => `<option${z === "L" ? " selected" : ""}>${z}</option>`).join("")}</select>` : ""}
              <a class="btn btn-small order">Order</a>
            </div>`}
        </div>
      </article>`;
  }

  function orderHref(item, key) {
    const s = state.get(key);
    const size = $(`[data-key="${key}"] .size`)?.value;
    const body = `Hi Vasquez Tacos! I'd like to order: ${item.name} (${item.colors[s.color][0]}${size ? ", size " + size : ""}). How do I pay and pick up?`;
    return `sms:${phone}?&body=${encodeURIComponent(body)}`;
  }

  function mount(grid, list, prefix, crew) {
    const view = { cat: "All", sort: "featured" };
    const render = () => {
      let rows = list.map((item, i) => [item, i]).filter(([item]) => view.cat === "All" || CATEGORY[item.type] === view.cat);
      if (view.sort === "low") rows.sort((a, b) => a[0].price - b[0].price);
      if (view.sort === "high") rows.sort((a, b) => b[0].price - a[0].price);
      grid.innerHTML = rows.map(([item, i]) => card(item, prefix + i, crew)).join("");
      if (!crew) rows.forEach(([item, i]) => { $(`[data-key="${prefix + i}"] .order`, grid).href = orderHref(item, prefix + i); });
    };
    if (!crew) {
      const cats = ["All", ...new Set(list.map((m) => CATEGORY[m.type]).filter(Boolean))];
      const tabs = $(".shop-tabs");
      const count = (c) => c === "All" ? list.length : list.filter((m) => CATEGORY[m.type] === c).length;
      tabs.innerHTML = cats.map((c) => `<button role="tab" data-cat="${esc(c)}" aria-selected="${c === "All"}">${esc(c)} <span>${count(c)}</span></button>`).join("");
      tabs.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cat]");
        if (!b) return;
        view.cat = b.dataset.cat;
        $$("button", tabs).forEach((x) => x.setAttribute("aria-selected", x === b));
        render();
      });
      $(".shop-sort").addEventListener("change", (e) => { view.sort = e.target.value; render(); });
    }
    grid.addEventListener("click", (e) => {
      const flip = e.target.closest("[data-flip]");
      if (flip) {
        const s = state.get(flip.closest(".merch-card").dataset.key);
        s.side = s.side === "back" ? "front" : "back";
        flip.classList.toggle("flipped", s.side === "back");
        return;
      }
      const el = e.target.closest("[data-color], [data-side]");
      if (!el) return;
      const cardEl = el.closest(".merch-card"), key = cardEl.dataset.key, s = state.get(key);
      const item = list[+key.slice(prefix.length)];
      if (el.dataset.color) s.color = +el.dataset.color;
      if (el.dataset.side) s.side = el.dataset.side;
      const size = $(".size", cardEl)?.value;
      cardEl.outerHTML = card(item, key, crew);
      const fresh = $(`[data-key="${key}"]`, grid);
      if (size && $(".size", fresh)) $(".size", fresh).value = size;
      if (!crew) $(".order", fresh).href = orderHref(item, key);
    });
    grid.addEventListener("change", (e) => {
      if (!e.target.matches(".size")) return;
      const key = e.target.closest(".merch-card").dataset.key;
      $(`[data-key="${key}"] .order`, grid).href = orderHref(list[+key.slice(prefix.length)], key);
    });
    render();
  }

  mount($(".merch-grid"), SITE.merch, "m", false);
  mount($(".crew-grid"), SITE.crew, "c", true);

  // Hero lineup: tee, snapback, hoodie
  const pick = (type) => SITE.merch.find((m) => m.type === type);
  const lineup = [pick("jersey") || pick("tee"), SITE.merch.find((m) => m.design === "monogram") || pick("snapback"), pick("hoodie")].filter(Boolean);
  $(".merch-lineup").innerHTML = lineup.map((m, i) => `<div class="lineup-item l${i}">${mockup(m, m.colors[0][1])}</div>`).join("");

  $("[data-merch-note]").textContent = SITE.merchNote;
  $$("[data-phone]").forEach((a) => { if (!a.textContent.trim()) a.textContent = biz.phone; a.href = "tel:" + phone; });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
