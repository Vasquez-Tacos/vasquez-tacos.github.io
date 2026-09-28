/* Vasquez Tacos — site behavior. Content lives in config.js. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const { business: biz, payments: pay } = SITE;

  /* ---------- Dates ---------- */
  const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fromISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const earliest = new Date(today); earliest.setDate(earliest.getDate() + SITE.minDaysNotice);
  const booked = new Set(SITE.booked);
  const limited = new Set(SITE.limited);

  function dateStatus(d) {
    if (d < earliest) return "past";
    const iso = toISO(d);
    if (booked.has(iso) || SITE.closedWeekdays.includes(d.getDay())) return "booked";
    if (limited.has(iso)) return "limited";
    return "open";
  }

  /* ---------- Contact info ---------- */
  const telHref = "tel:" + biz.phone.replace(/[^\d+]/g, "");
  $$("[data-phone]").forEach((a) => { if (!a.textContent.trim()) a.textContent = biz.phone; a.href = telHref; });
  // Text-message links open the phone's texting app with a starter message
  const smsHref = (body) => `sms:${biz.phone.replace(/[^\d+]/g, "")}?&body=${encodeURIComponent(body)}`;
  $$("[data-sms]").forEach((a) => (a.href = smsHref("Hi Vasquez Tacos! I'd like to book taco catering. Date: ___ Guests: ___ City: ___")));

  // Service-area map (city only, no street address)
  $$("[data-map]").forEach((f) => (f.src = `https://www.google.com/maps?q=${encodeURIComponent(biz.city)}&z=11&output=embed`));

  // Business details for Google search results
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "FoodEstablishment", servesCuisine: "Mexican",
    name: biz.name, description: biz.tagline, telephone: biz.phone, image: new URL("logo.jpg", location.href).href,
    ...(biz.website && { url: biz.website }), ...(biz.email && { email: biz.email }),
    address: { "@type": "PostalAddress", addressLocality: "Fontana", addressRegion: "CA", addressCountry: "US" },
    areaServed: biz.serviceArea, priceRange: "$$",
    sameAs: Object.entries(SITE.social || {}).filter(([, h]) => h).map(([k, h]) =>
      ({ instagram: `https://www.instagram.com/${h}/`, tiktok: `https://www.tiktok.com/@${h}`, facebook: `https://www.facebook.com/${h}`, youtube: `https://www.youtube.com/@${h}` }[k])),
  });
  document.head.append(ld);
  $$("[data-email]").forEach((a) => { if (biz.email) { a.textContent = biz.email; a.href = "mailto:" + biz.email; } else a.remove(); });
  $$("[data-area]").forEach((el) => (el.textContent = `${biz.city} · Serving ${biz.serviceArea}`));
  $$("[data-hours]").forEach((el) => (el.textContent = biz.hours));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-deposit-pct]").forEach((el) => (el.textContent = pay.depositPercent));
  $$("[data-deposit-pct-label]").forEach((el) => (el.textContent = pay.depositPercent + "%"));
  $$("[data-pickup]").forEach((el) => (el.textContent = biz.pickup || ""));
  $$("[data-custom-over]").forEach((el) => (el.textContent = SITE.customQuoteOver));
  const fromPrice = Math.min(...SITE.packages.map((p) => p.perGuest));
  $$("[data-from-price]").forEach((el) => (el.textContent = money(fromPrice)));
  $(".badges").innerHTML = (biz.credentials || []).map((c) => `<li>${esc(c)}</li>`).join("");
  /* ---------- Social handles + clips ---------- */
  const handle = (h) => String(h || "").trim().replace(/^@/, "");
  const PROFILES = {
    instagram: ["Instagram", (h) => `https://www.instagram.com/${h}/`],
    tiktok: ["TikTok", (h) => `https://www.tiktok.com/@${h}`],
    facebook: ["Facebook", (h) => `https://www.facebook.com/${h}`],
    youtube: ["YouTube", (h) => `https://www.youtube.com/@${h}`],
  };
  const socials = Object.entries(SITE.social || {}).filter(([k, h]) => PROFILES[k] && handle(h))
    .map(([k, h]) => [PROFILES[k][0], PROFILES[k][1](encodeURIComponent(handle(h))), handle(h)]);
  $(".socials").innerHTML = socials.length
    ? socials.map(([n, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${n}</a>`).join("<br>")
    : `<a href="${telHref}">Call us: ${esc(biz.phone)}</a>`;
  $(".follow").innerHTML = socials.map(([n, url, h]) =>
    `<a class="btn btn-ghost btn-small" href="${esc(url)}" target="_blank" rel="noopener">${n} · @${esc(h)}</a>`).join("");

  // Turn a pasted post/video link into that platform's official embed
  const scripts = new Set();
  const loadScript = (src) => { if (scripts.has(src)) return; scripts.add(src); const s = document.createElement("script"); s.src = src; s.async = true; document.body.append(s); };
  function clipHTML(raw) {
    let u; try { u = new URL(raw.trim()); } catch { return ""; }
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "instagram.com" && /^\/(p|reel|tv)\/[\w-]+/.test(u.pathname)) {
      loadScript("https://www.instagram.com/embed.js");
      const link = `https://www.instagram.com${u.pathname.match(/^\/(p|reel|tv)\/[\w-]+/)[0]}/`;
      return `<blockquote class="instagram-media" data-instgrm-permalink="${esc(link)}" data-instgrm-version="14"><a href="${esc(link)}" target="_blank" rel="noopener">View on Instagram</a></blockquote>`;
    }
    const tt = host === "tiktok.com" && u.pathname.match(/\/video\/(\d+)/);
    if (tt) {
      loadScript("https://www.tiktok.com/embed.js");
      return `<blockquote class="tiktok-embed" cite="${esc(u.href)}" data-video-id="${tt[1]}"><section><a href="${esc(u.href)}" target="_blank" rel="noopener">View on TikTok</a></section></blockquote>`;
    }
    const yt = (host === "youtu.be" && u.pathname.slice(1)) ||
      (host === "youtube.com" && (u.searchParams.get("v") || (u.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/) || [])[2]));
    if (yt && /^[\w-]{6,}$/.test(yt)) {
      const tall = u.pathname.startsWith("/shorts/");
      return `<div class="clip-frame${tall ? " tall" : ""}"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="YouTube video" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    if (host === "facebook.com" || host === "fb.watch") {
      return `<div class="clip-frame tall"><iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u.href)}&show_text=false" title="Facebook video" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    return "";
  }
  const clips = (SITE.socialClips || []).map(clipHTML).filter(Boolean);
  $(".clips").innerHTML = clips.map((c) => `<div class="clip">${c}</div>`).join("");
  $("#social").hidden = !clips.length && !socials.length;

  /* ---------- Nav ---------- */
  const nav = $(".nav"), toggle = $(".nav-toggle"), links = $(".nav-links");
  const setOpen = (open) => { links.classList.toggle("open", open); nav.classList.toggle("menu-open", open); toggle.setAttribute("aria-expanded", open); };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") setOpen(false); });
  const bar = $(".mobile-bar");
  let formInView = false;
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 40 || !$(".hero"));
    bar?.classList.toggle("show", scrollY > innerHeight * .6 && !formInView);
  };
  addEventListener("scroll", onScroll, { passive: true });
  if (bar && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => { formInView = en.isIntersecting; onScroll(); }).observe($(".book-form"));
  }
  onScroll();

  /* ---------- Weekly specials ---------- */
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const priceRows = (rows) => rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  $(".specials").innerHTML = SITE.specials.map((s) => {
    const weekly = s.day !== undefined;
    const isToday = weekly && s.day === new Date().getDay();
    return `
    <article class="special${isToday ? " today" : ""}">
      ${isToday ? `<span class="today-tag">Today</span>` : ""}
      ${s.img ? `<img src="${esc(s.img)}" alt="" loading="lazy">` : ""}
      <div class="special-body">
        <span class="special-day">${weekly ? `Every ${DAYS[s.day]}` : esc(s.label || "Every day")}</span>
        <h3>${esc(s.name)}</h3>
        <p class="special-deal">${esc(s.deal)}</p>
        <dl class="price-list">${priceRows(s.items)}</dl>
      </div>
    </article>`;
  }).join("");
  if (SITE.showHoliday && SITE.holiday) {
    const h = $(".holiday");
    h.hidden = false;
    $(".holiday-title", h).textContent = SITE.holiday.title;
    $(".holiday-note", h).textContent = SITE.holiday.note;
    $(".holiday-list", h).innerHTML = priceRows(SITE.holiday.items);
  }

  /* ---------- Menu ---------- */
  const tabs = $(".menu-tabs"), menuGrid = $(".menu-grid");
  function showMenu(i) {
    $$("button", tabs).forEach((b, j) => b.setAttribute("aria-selected", i === j));
    menuGrid.innerHTML = SITE.menu[i].items.map((it) => `
      <article class="menu-item">
        ${it.img ? `<img src="${esc(it.img)}" alt="" loading="lazy">` : ""}
        <div>
          <h3>${esc(it.name)}${it.tag ? `<span class="tag ${esc(it.tag)}">${esc(it.tag)}</span>` : ""}</h3>
          <p>${esc(it.desc)}</p>
        </div>
      </article>`).join("");
  }
  const soon = SITE.comingSoon || [];
  $(".coming-soon").hidden = !soon.length;
  $(".cs-list").innerHTML = soon.map(([name, desc]) => `<li><span class="cs-tag">Soon</span><b>${esc(name)}</b><small>${esc(desc)}</small></li>`).join("");
  tabs.innerHTML = SITE.menu.map((c, i) => `<button role="tab" data-i="${i}">${esc(c.category)}</button>`).join("");
  tabs.addEventListener("click", (e) => { if (e.target.dataset.i) showMenu(+e.target.dataset.i); });
  showMenu(0);

  /* ---------- Packages ---------- */
  const customOver = SITE.customQuoteOver;
  $(".packages").innerHTML = SITE.packages.map((p) => `
    <article class="package${p.popular ? " popular" : ""}">
      ${p.popular ? `<span class="popular-tag">Most Popular</span>` : ""}
      <h3>${esc(p.name)}</h3>
      <p class="package-blurb">${esc(p.blurb)}</p>
      <p class="price">${money(p.perGuest)} <small>/ guest</small></p>
      <p class="guests">${p.minGuests}-guest minimum (${money(p.perGuest * p.minGuests)})</p>
      <ul>${p.includes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <a href="#quote" class="btn${p.popular ? "" : " btn-outline"}" data-pick="${esc(p.id)}">Choose ${esc(p.name)}</a>
    </article>`).join("");
  $(".packages").addEventListener("click", (e) => {
    const id = e.target.closest("[data-pick]")?.dataset.pick;
    if (id) { form.package.value = id; updateQuote(); }
  });

  /* ---------- Gallery ---------- */
  const galleryEl = $(".gallery");
  const figure = (g) => `
    <figure class="${g.wide ? "wide " : ""}${g.long ? "long " : ""}${g.video ? "is-video" : ""}">
      ${g.video
        ? `<video controls playsinline preload="metadata"${g.caption ? ` aria-label="${esc(g.caption)}"` : ""}>
             ${g.srcs.map((s) => `<source src="${esc(s)}">`).join("")}</video>`
        : `<img src="${esc(g.img)}" alt="${esc(g.caption || "Vasquez Tacos photo")}" loading="lazy"${g.fallback ? ` data-fallback="${esc(g.fallback)}"` : ""}>`}
      ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
    </figure>`;
  const renderGallery = (items) => {
    $("#gallery").hidden = !items.length;
    galleryEl.innerHTML = items.map(figure).join("");
  };
  renderGallery(SITE.gallery);

  // Photos & videos uploaded to the repo's media folder show up automatically
  const IMG_EXT = /\.(jpe?g|png|webp|gif|avif)$/i, VID_EXT = /\.(mp4|m4v|mov|webm)$/i;
  const niceCaption = (name) => /^(img|vid|pxl|dsc|mvimg|screenshot|\d)/i.test(name) ? ""
    : name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  if (SITE.media?.repo) {
    const { repo, folder, branch } = SITE.media;
    fetch(`https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((files) => {
        const uploads = files.filter((f) => f.type === "file" && (IMG_EXT.test(f.name) || VID_EXT.test(f.name)))
          .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
          .map((f) => {
            const local = `${folder}/${encodeURIComponent(f.name)}`;
            return VID_EXT.test(f.name)
              ? { video: true, srcs: [local, f.download_url], caption: niceCaption(f.name) }
              : { img: local, fallback: f.download_url, caption: niceCaption(f.name) };
          });
        if (uploads.length) {
          renderGallery([...uploads, ...SITE.gallery]);
          galleryEl.querySelectorAll("figure").forEach((el) => el.classList.add("reveal", "in"));
        }
      })
      .catch(() => {});
  }
  // If an uploaded photo isn't on this server yet, load it straight from GitHub
  galleryEl.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
  }, true);

  // Tap a photo to see it full size
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">`;
  document.body.append(lightbox);
  galleryEl.addEventListener("click", (e) => {
    const img = e.target.closest("figure:not(.is-video)")?.querySelector("img");
    if (!img || !lightbox.showModal) return;
    $("img", lightbox).src = img.currentSrc || img.src;
    $("img", lightbox).alt = img.alt;
    lightbox.showModal();
  });
  lightbox.addEventListener("click", () => lightbox.close());

  /* ---------- Reviews ---------- */
  const reviewLinks = [["Review us on Google", biz.googleReviews], ["Review us on Yelp", biz.yelp]].filter(([, u]) => u);
  $(".reviews").innerHTML = SITE.reviews.length
    ? SITE.reviews.map((r) => `
      <blockquote class="review">
        <div class="stars" aria-label="${r.stars || 5} out of 5 stars">${"★".repeat(r.stars || 5)}</div>
        <p>“${esc(r.text)}”</p>
        <cite>${esc(r.name)}${r.event ? ` <span>· ${esc(r.event)}</span>` : ""}</cite>
      </blockquote>`).join("")
    : `<div class="reviews-empty">
        <p>Had Vasquez Tacos at your event? We'd love to hear about it!</p>
        <div class="links">${reviewLinks.length
          ? reviewLinks.map(([t, u]) => `<a class="btn btn-small" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join("")
          : `<a class="btn btn-small" href="${telHref}">Text us your review: ${esc(biz.phone)}</a>`}</div>
      </div>`;

  /* ---------- Calendar ---------- */
  const calGrid = $(".cal-grid"), calTitle = $(".cal-title");
  const [prevBtn, nextBtn] = $$(".cal-nav");
  const firstMonth = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() + 12, 1);
  let view = new Date(firstMonth);
  let selectedISO = "";

  function renderCalendar() {
    calTitle.textContent = view.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    prevBtn.disabled = view <= firstMonth;
    nextBtn.disabled = view >= lastMonth;
    const y = view.getFullYear(), m = view.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    let html = "<span></span>".repeat(new Date(y, m, 1).getDay());
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d), iso = toISO(date), st = dateStatus(date);
      const label = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      const clickable = st === "open" || st === "limited";
      html += clickable
        ? `<button class="cal-cell ${st}${iso === selectedISO ? " selected" : ""}" data-date="${iso}" aria-label="${label}, ${st === "open" ? "available" : "limited availability"}">${d}</button>`
        : `<span class="cal-cell ${st}" aria-label="${label}, ${st === "past" ? "unavailable" : "booked"}">${d}</span>`;
    }
    calGrid.innerHTML = html;
  }
  $$(".cal-nav").forEach((b) => b.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + +b.dataset.dir, 1);
    renderCalendar();
  }));
  calGrid.addEventListener("click", (e) => {
    const iso = e.target.dataset.date;
    if (!iso) return;
    selectDate(iso);
    $("#quote").scrollIntoView();
    form.name.focus({ preventScroll: true });
  });
  function selectDate(iso) {
    selectedISO = iso;
    form.date.value = iso;
    checkDate();
    renderCalendar();
  }

  /* ---------- Booking form + quote ---------- */
  const form = $(".book-form"), msg = $(".form-msg");
  form.date.min = toISO(earliest);
  form.package.innerHTML = SITE.packages.map((p) => `<option value="${esc(p.id)}"${p.popular ? " selected" : ""}>${esc(p.name)}: ${money(p.perGuest)} per guest (${p.minGuests} min.)</option>`).join("");
  $(".addons").insertAdjacentHTML("beforeend", SITE.addons.map((a) => `
    <label><input type="checkbox" name="addon" value="${esc(a.id)}"> ${esc(a.name)} <small>${money(a.price)}/${a.per}</small></label>`).join(""));

  function setMsg(text, type = "") { msg.textContent = text; msg.className = "form-msg " + type; }

  function checkDate() {
    const v = form.date.value;
    if (!v) return true;
    const st = dateStatus(fromISO(v));
    form.date.classList.toggle("invalid", st === "booked" || st === "past");
    if (st === "past") { setMsg(`Please choose a date at least ${SITE.minDaysNotice} days from today.`, "error"); return false; }
    if (st === "booked") { setMsg("Sorry, that date is booked. Please pick another date from the calendar.", "error"); return false; }
    setMsg(st === "limited" ? "Heads up: that date has limited availability. We'll confirm with you." : "");
    return true;
  }
  form.date.addEventListener("change", () => {
    if (checkDate() && form.date.value) {
      selectedISO = form.date.value;
      const d = fromISO(selectedISO);
      view = new Date(d.getFullYear(), d.getMonth(), 1);
      renderCalendar();
    }
  });

  function getQuote() {
    const pkg = SITE.packages.find((p) => p.id === form.package.value);
    const entered = parseInt(form.guests.value, 10) || 0;
    const guests = Math.max(entered, pkg.minGuests);
    const lines = [[`${pkg.name} × ${guests} guests @ ${money(pkg.perGuest)}`, pkg.perGuest * guests]];
    $$("input[name=addon]:checked", form).forEach((cb) => {
      const a = SITE.addons.find((x) => x.id === cb.value);
      lines.push([a.per === "guest" ? `${a.name} × ${guests}` : a.name, a.per === "guest" ? a.price * guests : a.price]);
    });
    const total = Math.round(lines.reduce((s, [, v]) => s + v, 0) * 100) / 100;
    return { pkg, guests, entered, custom: entered > customOver, lines, total, deposit: Math.round(total * pay.depositPercent) / 100 };
  }
  function updateQuote() {
    const q = getQuote();
    $(".quote-lines").innerHTML = q.lines.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${money(v)}</dd></div>`).join("")
      + (q.custom ? `<div class="warn"><dt>${q.entered} guests is over ${customOver}. We'll send you a custom quote.</dt><dd></dd></div>` : "")
      + (!q.entered ? `<div class="warn"><dt>Showing the ${q.pkg.minGuests}-guest minimum. Enter your guest count.</dt><dd></dd></div>` : "")
      + (q.entered && q.entered < q.pkg.minGuests ? `<div class="warn"><dt>Under ${q.pkg.minGuests} guests, the package minimum applies.</dt><dd></dd></div>` : "");
    $("[data-total]").textContent = money(q.total);
    $("[data-deposit]").textContent = money(q.deposit);
  }
  form.addEventListener("input", updateQuote);
  form.addEventListener("change", updateQuote);
  updateQuote();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstBad = null;
    ["name", "phone", "email", "date", "guests", "location"].forEach((n) => {
      const el = form[n], bad = !el.value.trim() || !el.checkValidity();
      el.classList.toggle("invalid", bad);
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) { setMsg("Please fill in the highlighted fields.", "error"); firstBad.focus(); return; }
    if (!checkDate()) { form.date.focus(); return; }

    const q = getQuote();
    const data = {
      name: form.name.value, phone: form.phone.value, email: form.email.value,
      date: form.date.value, time: form.time.value, guests: form.guests.value,
      eventType: form.eventType.value, location: form.location.value,
      package: q.pkg.name, addons: q.lines.slice(1).map(([k]) => k).join(", ") || "None",
      estimate: q.custom ? "Custom quote needed (over " + customOver + " guests)" : money(q.total),
      deposit: money(q.deposit), notes: form.notes.value,
    };
    const btn = $("button[type=submit]", form);
    const btnLabel = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";

    try {
      if (SITE.formEndpoint) {
        const res = await fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: `New booking request: ${data.date} (${data.guests} guests)`, ...data }),
        });
        if (!res.ok) throw new Error("send failed");
        form.reset(); selectedISO = ""; renderCalendar(); updateQuote();
        setMsg("¡Gracias! Your request was sent. Our family will call or email you within 24 hours to confirm.", "ok");
      } else if (biz.email) {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
        location.href = `mailto:${biz.email}?subject=${encodeURIComponent("Booking request: " + data.date)}&body=${encodeURIComponent(body)}`;
        setMsg("Your email app should open with your request filled in. Just press send.", "ok");
      } else {
        // No form service or email yet: send the request as a text message
        const text = [
          `Booking request - ${data.name}`,
          `${data.eventType} on ${data.date}${data.time ? " at " + data.time : ""}`,
          `${data.guests} guests in ${data.location}`,
          `Package: ${data.package}`,
          `Add-ons: ${data.addons}`,
          `Estimate: ${data.estimate}`,
          `Phone: ${data.phone} · Email: ${data.email}`,
          data.notes && `Notes: ${data.notes}`,
        ].filter(Boolean).join("\n");
        location.href = smsHref(text);
        setMsg(`Your texting app should open with your request filled in. Just press send. If it didn't open, call or text us at ${biz.phone}.`, "ok");
      }
    } catch {
      setMsg(`Something went wrong sending your request. Please call or text us at ${biz.phone}.`, "error");
    } finally {
      btn.disabled = false; btn.textContent = btnLabel;
    }
  });

  /* ---------- Payments ---------- */
  const payCards = [];
  if (pay.depositLink) payCards.push(["Pay Deposit", `Hold your date with a ${pay.depositPercent}% deposit. Card, Apple Pay & Google Pay accepted.`, `<a class="btn" href="${esc(pay.depositLink)}" target="_blank" rel="noopener">Pay Deposit</a>`]);
  if (pay.balanceLink) payCards.push(["Pay Balance", "Pay your remaining balance before the event.", `<a class="btn" href="${esc(pay.balanceLink)}" target="_blank" rel="noopener">Pay Balance</a>`]);
  if (pay.venmo) payCards.push(["Venmo", "Include your name and event date in the note.", `<span class="pay-handle">${esc(pay.venmo)}</span>`]);
  if (pay.zelle) payCards.push(["Zelle", "Send to this email or phone from your bank app.", `<span class="pay-handle">${esc(pay.zelle)}</span>`]);
  if (pay.cashApp) payCards.push(["Cash App", "Include your name and event date in the note.", `<span class="pay-handle">${esc(pay.cashApp)}</span>`]);
  if (!payCards.length) payCards.push(["Pay by Phone", "Online payments are coming soon. Call or text us and we'll send you a secure payment link.", `<a class="btn" href="${telHref}">${esc(biz.phone)}</a>`]);
  $(".pay-options").innerHTML = payCards.map(([t, p, action]) => `<div class="pay-card"><h3>${t}</h3><p>${p}</p>${action}</div>`).join("");

  /* ---------- FAQ ---------- */
  $(".faq-list").innerHTML = SITE.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

  /* ---------- Policies + photo credits ---------- */
  $(".policies").innerHTML = SITE.policies.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("");
  $(".credits").hidden = !SITE.credits.length;
  $(".credits ul").innerHTML = SITE.credits.map(([what, who, lic, url]) =>
    `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(what)}</a> by ${esc(who)}, ${esc(lic)}</li>`).join("");

  /* ---------- Fade sections in as you scroll ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".event-card, .special, .holiday, .package, .why-item, .gallery figure, .step, .split-head, .section-head")
      .forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  renderCalendar();
})();
