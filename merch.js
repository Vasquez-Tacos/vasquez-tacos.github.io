/* Vasquez Tacos — merch page. Products live in config.js (merch, crew). */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 });
  const biz = SITE.business;
  const telHref = "tel:" + biz.phone.replace(/[^\d+]/g, "");

  // Light garments get dark ink, dark garments get gold ink
  const isLight = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150;
  };
  let uid = 0;

  // Logo in a circle, or a text print, centered at (x, y)
  function print(p, x, y, r, ink) {
    if (p === "logo" || p === "chest") {
      const id = "c" + ++uid;
      return `<clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath>
        <image href="logo.jpg" x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" clip-path="url(#${id})"/>`;
    }
    const words = String(p).split(" ");
    return words.map((w, i) => `<text x="${x}" y="${y + (i - (words.length - 1) / 2) * r * .75}" text-anchor="middle" dominant-baseline="middle"
      font-family="Fraunces, Georgia, serif" font-weight="800" font-style="italic" font-size="${r * .7}" fill="${ink}">${esc(w)}</text>`).join("");
  }

  const SHAPES = {
    tee: (c, p, ink, back) => `
      <path d="M104 40 60 56 18 104l34 28 24-20v156h148V112l24 20 34-28-42-48-44-16c-8 18-26 28-46 28s-38-10-46-28z" fill="${c}"/>
      <path d="M104 40c8 18 26 28 46 28s38-10 46-28" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="4"/>
      ${back ? print(back, 150, 150, 46, ink)
        : p === "chest" ? print(p, 186, 104, 16, ink) : print(p, 150, 150, p === "logo" ? 48 : 46, ink)}`,
    hoodie: (c, p, ink, back) => `
      <path d="M100 52 58 64 18 118l32 26 26-22v146h148V122l26 22 32-26-40-54-42-12c0-26-22-40-50-40s-50 14-50 40z" fill="${c}"/>
      <path d="M112 56c4-18 18-28 38-28s34 10 38 28c-10 12-24 18-38 18s-28-6-38-18z" fill="rgba(0,0,0,.28)"/>
      ${back ? "" : `<path d="M104 210h92l-10 44H114z" fill="rgba(0,0,0,.18)"/>
      <path d="M142 74v40M158 74v40" stroke="rgba(255,255,255,.55)" stroke-width="3" stroke-linecap="round"/>`}
      ${back ? print(back, 150, 150, 46, ink)
        : p === "chest" ? print(p, 186, 116, 15, ink) : print(p, 150, 158, 40, ink)}`,
    hat: (c, p, ink) => `
      <path d="M62 176c0-64 38-100 88-100s88 36 88 100z" fill="${c}"/>
      <path d="M150 76v100M104 88c-10 24-14 56-12 88M196 88c10 24 14 56 12 88" stroke="rgba(0,0,0,.14)" stroke-width="3" fill="none"/>
      <circle cx="150" cy="78" r="6" fill="rgba(0,0,0,.25)"/>
      <path d="M50 178c40-10 160-10 200 0 18 6 20 30-4 34-60 10-132 10-192 0-24-4-22-28-4-34z" fill="${c}"/>
      <path d="M50 178c40-10 160-10 200 0 18 6 20 30-4 34-60 10-132 10-192 0-24-4-22-28-4-34z" fill="rgba(0,0,0,.2)"/>
      ${print(p, 150, 132, 32, ink)}`,
    tote: (c, p, ink) => `
      <path d="M112 100V70a38 38 0 0 1 76 0v30" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
      <path d="M112 100V70a38 38 0 0 1 76 0v30" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="12" stroke-linecap="round"/>
      <path d="M68 96h164l10 176H58z" fill="${c}"/>
      ${print(p, 150, 180, 50, ink)}`,
    apron: (c, p, ink) => `
      <path d="M116 46h68" stroke="rgba(0,0,0,.35)" stroke-width="8" stroke-linecap="round"/>
      <path d="M112 46h76v60c30 0 44-6 58-14l6 176H48l6-176c14 8 28 14 58 14z" fill="${c}"/>
      <path d="M86 206h128v42H86z" fill="rgba(0,0,0,.15)"/><path d="M150 206v42" stroke="rgba(0,0,0,.2)" stroke-width="3"/>
      ${print(p, 150, 140, 40, ink)}`,
    sticker: () => `
      <g transform="rotate(-8 150 150)"><circle cx="150" cy="150" r="104" fill="#fff" filter="drop-shadow(0 6px 10px rgba(0,0,0,.25))"/>${print("logo", 150, 150, 92)}</g>
      <g transform="rotate(12 232 232)"><rect x="176" y="208" width="112" height="46" rx="23" fill="#f6bd2f"/>
      <text x="232" y="232" text-anchor="middle" dominant-baseline="middle" font-family="Fraunces, Georgia, serif" font-weight="800" font-style="italic" font-size="16" fill="#1c1210">TACO TUESDAY</text></g>`,
  };

  function mockup(item, side = "front") {
    const ink = isLight(item.color) ? "#1c1210" : "#f6bd2f";
    const back = side === "back" ? item.back : null;
    return `<svg viewBox="0 0 300 300" role="img" aria-label="${esc(item.name)}${back ? " (back)" : ""} mockup">${SHAPES[item.type](item.color, item.print, ink, back)}</svg>`;
  }

  function card(item, crew) {
    return `
      <article class="merch-card">
        <div class="merch-stage${item.back ? " two" : ""}">
          ${mockup(item)}${item.back ? mockup(item, "back") : ""}
        </div>
        <div class="merch-info">
          <h3>${esc(item.name)}</h3>
          ${crew ? `<p class="merch-spec">${esc(item.spec)}</p>`
            : `<p class="merch-colors">${esc(item.colors)}</p><p class="merch-price">${money(item.price)}</p>`}
        </div>
      </article>`;
  }

  $(".merch-grid").innerHTML = SITE.merch.map((m) => card(m, false)).join("");
  $(".crew-grid").innerHTML = SITE.crew.map((m) => card(m, true)).join("");
  $("[data-merch-note]").textContent = SITE.merchNote;
  document.querySelectorAll("[data-phone]").forEach((a) => { a.textContent = biz.phone; a.href = telHref; });
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
