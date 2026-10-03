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
    sameAs: Object.entries(SITE.social || {}).filter(([, h]) => h).map(([k, h]) => /^https?:\/\//i.test(h) ? h :
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
  // Each entry can be a handle ("vasquez_tacos") or a full profile link
  const isUrl = (h) => /^https?:\/\//i.test(String(h).trim());
  const socials = Object.entries(SITE.social || {}).filter(([k, h]) => PROFILES[k] && handle(h))
    .map(([k, h]) => isUrl(h)
      ? [PROFILES[k][0], String(h).trim(), ""]
      : [PROFILES[k][0], PROFILES[k][1](encodeURIComponent(handle(h))), handle(h)]);
  $(".socials").innerHTML = socials.length
    ? socials.map(([n, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${n}</a>`).join("<br>")
    : `<a href="${telHref}">Call us: ${esc(biz.phone)}</a>`;
  $(".follow").innerHTML = socials.map(([n, url, h]) =>
    `<a class="btn btn-ghost btn-small" href="${esc(url)}" target="_blank" rel="noopener">${n}${h ? ` · @${esc(h)}` : ""}</a>`).join("");

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
      ${s.video ? `<div class="special-media"><video class="special-video" data-src="${esc(s.video)}" muted loop playsinline preload="none" aria-label="${esc(s.name)}"></video></div>`
        : s.img ? `<img src="${esc(s.img)}" alt="" loading="lazy">` : ""}
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
    <figure class="${g.wide ? "wide " : ""}${g.long ? "long " : ""}${g.video ? "is-video" : ""}"${g.video ? ` data-story="${esc(g.srcs[0])}"` : ""}>
      ${g.video
        ? `<video muted loop playsinline preload="none"${g.poster ? ` poster="${esc(g.poster)}"` : ""} aria-label="${esc(g.caption || "Vasquez Tacos video")}">
             ${g.srcs.map((s) => `<source src="${esc(s)}">`).join("")}</video>
           <span class="play-badge" aria-hidden="true">▶</span>`
        : `<img src="${esc(g.img)}" alt="${esc(g.caption || "Vasquez Tacos photo")}" loading="lazy"${g.fallback ? ` data-fallback="${esc(g.fallback)}"` : ""}>`}
      ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
    </figure>`;
  const GALLERY_START = 8;   // fills whole rows on desktop and phone
  let galleryItems = [], showAll = false;
  const renderGallery = (items) => {
    galleryItems = items;
    $("#gallery").hidden = !items.length;
    const shown = showAll ? items : items.slice(0, GALLERY_START);
    galleryEl.innerHTML = shown.map(figure).join("");
    galleryEl.querySelectorAll("figure").forEach((el) => el.classList.add("reveal", "in"));
    const more = $(".gallery-more");
    more.hidden = items.length <= GALLERY_START;
    more.textContent = showAll ? "Show less" : `Show all ${items.length} photos & videos`;
  };
  $(".gallery-more").addEventListener("click", () => {
    showAll = !showAll;
    renderGallery(galleryItems);
    if (!showAll) $("#gallery").scrollIntoView();
  });
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
        const base = (n) => n.replace(/\.[^.]+$/, "").toLowerCase();
        const videoNames = new Set(files.filter((f) => VID_EXT.test(f.name)).map((f) => base(f.name)));
        const posterFor = (n) => files.find((f) => IMG_EXT.test(f.name) && base(f.name) === base(n));
        // Skip clips already featured in another section so nothing repeats
        const featured = new Set([...(SITE.flatTopVideos || []), SITE.heroVideo, SITE.whyVideo, SITE.eventsVideo,
          ...(SITE.customerPosts || []).map((p) => p.video), ...SITE.specials.map((s) => s.video)]
          .filter(Boolean).map((p) => base(p.split("/").pop())));
        const uploads = files.filter((f) => f.type === "file" && !featured.has(base(f.name)) && (VID_EXT.test(f.name) || (IMG_EXT.test(f.name) && !videoNames.has(base(f.name)))))
          .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
          .map((f) => {
            const local = `${folder}/${encodeURIComponent(f.name)}`;
            return VID_EXT.test(f.name)
              ? { video: true, srcs: [local, f.download_url], caption: niceCaption(f.name), poster: posterFor(f.name) && `${folder}/${encodeURIComponent(posterFor(f.name).name)}` }
              : { img: local, fallback: f.download_url, caption: niceCaption(f.name) };
          });
        // Your best photos lead, then everything uploaded to media/
        uploads.filter((u) => u.video).forEach((u) => addStory({ src: u.srcs[0], fallback: u.srcs[1], poster: u.poster, caption: u.caption || "Vasquez Tacos" }));
        // Alternate photos and videos so the first rows show both
        const vids = uploads.filter((u) => u.video), pics = [...SITE.gallery, ...uploads.filter((u) => !u.video)], mixed = [];
        while (vids.length || pics.length) { if (pics.length) mixed.push(pics.shift()); if (vids.length) mixed.push(vids.shift()); }
        if (uploads.length) renderGallery(mixed);
      })
      .catch(() => {});
  }
  // If an uploaded photo isn't on this server yet, load it straight from GitHub
  galleryEl.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
  }, true);

  /* ---------- Story-style video viewer (full screen, with sound) ---------- */
  const stories = [];
  const addStory = (s) => { if (s.src && !stories.some((x) => x.src === s.src)) stories.push(s); };
  const posterOf = (src) => src.replace(/\.[^.]+$/, ".jpg");
  const captionOf = (src) => niceCaption(src.split("/").pop()) || "Vasquez Tacos";

  const viewer = document.createElement("dialog");
  viewer.className = "stories";
  viewer.innerHTML = `
    <div class="st-frame">
      <div class="st-bars"></div>
      <video class="st-video" playsinline></video>
      <button class="st-zone st-prev" aria-label="Previous video"></button>
      <button class="st-zone st-next" aria-label="Next video"></button>
      <div class="st-top">
        <img src="logo.jpg" alt=""><b>Vasquez Tacos</b><span class="st-caption"></span>
        <button class="st-sound" aria-label="Mute">🔊</button>
        <button class="st-close" aria-label="Close" autofocus>&times;</button>
      </div>
      <a href="#quote" class="btn st-cta">Book this for your event</a>
    </div>`;
  document.body.append(viewer);
  const stVideo = $(".st-video", viewer);
  let stIndex = 0, stMuted = false;

  function showStory(i) {
    stIndex = (i + stories.length) % stories.length;
    const s = stories[stIndex];
    $(".st-bars", viewer).innerHTML = stories.map((_, j) => `<i><b style="width:${j < stIndex ? 100 : 0}%"></b></i>`).join("");
    $(".st-caption", viewer).textContent = s.caption;
    stVideo.poster = s.poster || "";
    stVideo.src = s.src;
    stVideo.onerror = () => { if (s.fallback && stVideo.src !== s.fallback) stVideo.src = s.fallback; };
    stVideo.muted = stMuted;
    stVideo.play().catch(() => { stVideo.muted = true; stVideo.play().catch(() => {}); });
  }
  function openStories(src) {
    if (!stories.length || !viewer.showModal) return;
    $$("video").forEach((v) => { if (v !== stVideo) v.pause(); });
    stMuted = false;
    $(".st-sound", viewer).textContent = "🔊";
    viewer.showModal();
    showStory(Math.max(0, stories.findIndex((s) => s.src === src)));
  }
  function closeStories() { stVideo.pause(); viewer.close(); resumeLoops(); }
  stVideo.addEventListener("timeupdate", () => {
    const bar = $$(".st-bars b", viewer)[stIndex];
    if (bar && stVideo.duration) bar.style.width = (stVideo.currentTime / stVideo.duration) * 100 + "%";
  });
  stVideo.addEventListener("ended", () => showStory(stIndex + 1));
  $(".st-prev", viewer).addEventListener("click", () => showStory(stIndex - 1));
  $(".st-next", viewer).addEventListener("click", () => showStory(stIndex + 1));
  $(".st-close", viewer).addEventListener("click", closeStories);
  $(".st-cta", viewer).addEventListener("click", closeStories);
  $(".st-sound", viewer).addEventListener("click", (e) => {
    stMuted = !stMuted; stVideo.muted = stMuted;
    e.currentTarget.textContent = stMuted ? "🔇" : "🔊";
    e.currentTarget.setAttribute("aria-label", stMuted ? "Unmute" : "Mute");
  });
  viewer.addEventListener("cancel", (e) => { e.preventDefault(); closeStories(); });
  viewer.addEventListener("click", (e) => { if (e.target === viewer) closeStories(); });
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showStory(stIndex + 1);
    if (e.key === "ArrowLeft") showStory(stIndex - 1);
  });
  let touchX = 0;
  viewer.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  viewer.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showStory(stIndex + (dx < 0 ? 1 : -1));
  });

  /* ---------- Inline looping clips ----------
     Muted until the visitor taps a sound button. After that, "sound mode"
     follows them: whichever clip is on screen plays with sound. */
  const loops = [];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let soundOn = false;
  const audible = (v) => v.dataset.audible === "1";
  function refreshSoundButtons() {
    document.body.classList.toggle("sound-on", soundOn);
    loops.forEach((v) => {
      const b = v.parentElement.querySelector(".sound-btn");
      if (!b) return;
      b.innerHTML = !v.muted ? `<span>🔊</span> Sound on` : soundOn ? `<span>🔈</span> Tap to hear this` : `<span>🔇</span> Tap for sound`;
    });
  }
  function hearOnly(video) {
    loops.forEach((v) => { if (v !== video) v.muted = true; });
    if (video) { video.muted = false; video.play().catch(() => {}); }
    refreshSoundButtons();
  }
  function soundButton(video) {
    const b = document.createElement("button");
    b.className = "sound-btn";
    b.type = "button";
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (video.muted) { soundOn = true; hearOnly(video); }
      else { soundOn = false; hearOnly(null); }
    });
    return b;
  }
  // opts.silent: clip has no audio. opts.decor: background only (no sound, no viewer)
  function registerLoop(video, src, opts = {}) {
    if (!src || loops.includes(video)) return;
    video.src = src;
    video.poster = posterOf(src);
    loops.push(video);
    if (opts.decor) return loopObserver && loopObserver.observe(video);
    video.dataset.audible = opts.silent ? "" : "1";
    addStory({ src, poster: posterOf(src), caption: opts.caption || captionOf(src) });
    if (!opts.silent) video.parentElement.append(soundButton(video));
    video.style.cursor = "pointer";
    video.addEventListener("click", () => openStories(src));
    loopObserver && loopObserver.observe(video);
  }
  const inView = new Set();
  const loopObserver = "IntersectionObserver" in window && new IntersectionObserver((entries) => entries.forEach((en) => {
    const v = en.target;
    en.isIntersecting ? inView.add(v) : inView.delete(v);
    if (en.isIntersecting) {
      if (!reduceMotion || !v.muted) v.play().catch(() => {});
      if (soundOn && audible(v) && en.intersectionRatio > .5) hearOnly(v);
    } else {
      v.pause();
      if (!v.muted) { v.muted = true; refreshSoundButtons(); }
    }
  }), { threshold: [.35, .6] });
  function resumeLoops() { if (!reduceMotion) inView.forEach((v) => v.play().catch(() => {})); }

  // Hero video card
  const heroVid = $(".hero-video");
  if (heroVid) {
    if (reduceMotion) heroVid.removeAttribute("autoplay");
    registerLoop(heroVid, SITE.heroVideo || heroVid.getAttribute("src"), { caption: SITE.heroCaption || undefined });
    if (SITE.heroCaption) heroVid.insertAdjacentHTML("afterend", `<span class="hero-caption">${esc(SITE.heroCaption)}</span>`);
  }

  // Flat-top clips
  const ftWrap = $(".flat-top-videos");
  const ftList = SITE.flatTopVideos || [];
  $("#flat-top").hidden = !ftList.length;
  ftWrap.innerHTML = ftList.map(() => `<div class="ft-clip"><video muted loop playsinline preload="none" aria-label="Meat grilling on the flat-top"></video>
      <span class="ft-expand" aria-hidden="true">⤢</span></div>`).join("");
  $$("video", ftWrap).forEach((v, i) => registerLoop(v, ftList[i]));

  // One video per section
  const whyVid = $(".why-video");
  if (whyVid) SITE.whyVideo ? registerLoop(whyVid, SITE.whyVideo) : whyVid.closest(".why-media").remove();
  const evVid = $(".event-video");
  if (evVid) SITE.eventsVideo ? registerLoop(evVid, SITE.eventsVideo, { decor: true }) : evVid.remove();
  $$(".special-video").forEach((v) => registerLoop(v, v.dataset.src));

  // The Vasquez promise
  $(".promise-list").innerHTML = (SITE.promise || []).map(([t, d]) => `<li><span class="promise-check">✓</span><b>${esc(t)}</b><p>${esc(d)}</p></li>`).join("");
  $(".promise").hidden = !(SITE.promise || []).length;

  // Real customer posts
  const posts = SITE.customerPosts || [];
  $(".posts").hidden = !posts.length;
  $(".posts-grid").innerHTML = posts.map((p) => `
    <figure class="post">
      <div class="post-media"><video muted loop playsinline preload="none" aria-label="${esc(p.quote)}"></video>
        <span class="post-tag">@${esc((SITE.social && SITE.social.instagram) || "vasquez_tacos")}</span></div>
      <figcaption><span class="stars" aria-label="Customer post">★★★★★</span>
        <blockquote>“${esc(p.quote)}”</blockquote><cite>${esc(p.source)}</cite></figcaption>
    </figure>`).join("");
  $$(".post video").forEach((v, i) => registerLoop(v, posts[i].video, { silent: true, caption: posts[i].quote }));
  refreshSoundButtons();

  // Gallery videos: silent preview on hover, full screen with sound on tap
  galleryEl.addEventListener("mouseover", (e) => {
    const v = e.target.closest("figure.is-video")?.querySelector("video");
    if (v && v.paused && !reduceMotion) { v.muted = true; v.play().catch(() => {}); }
  });
  galleryEl.addEventListener("mouseout", (e) => {
    const fig = e.target.closest("figure.is-video");
    if (fig && !fig.contains(e.relatedTarget)) fig.querySelector("video").pause();
  });
  galleryEl.addEventListener("click", (e) => {
    const fig = e.target.closest("figure.is-video");
    if (fig) openStories(fig.dataset.story);
  });

  /* ---------- Party planner ---------- */
  const planner = $(".planner");
  if (planner) {
    const range = $("input[type=range]", planner), out = $("output", planner), pkgBox = $(".planner-pkgs", planner);
    let plannerPkg = (SITE.packages.find((p) => p.popular) || SITE.packages[0]).id;
    pkgBox.innerHTML = SITE.packages.map((p) => `<button type="button" role="radio" data-pkg="${esc(p.id)}" aria-checked="${p.id === plannerPkg}">${esc(p.name)}<small>${money(p.perGuest)}/guest</small></button>`).join("");
    const setText = (k, v) => ($(`[data-p="${k}"]`, planner).textContent = v);
    function plan() {
      const guests = +range.value, pkg = SITE.packages.find((p) => p.id === plannerPkg);
      const billed = Math.max(guests, pkg.minGuests);
      out.textContent = guests + (guests >= +range.max ? "+" : "");
      range.style.setProperty("--fill", ((guests - range.min) / (range.max - range.min)) * 100 + "%");
      setText("tacos", (guests * 4).toLocaleString());
      setText("meat", Math.round(guests * .33) + " lbs");
      setText("taqueros", Math.max(pkg.id === "lacasa" ? 2 : 1, Math.ceil(guests / 100)));
      setText("total", money(Math.round(pkg.perGuest * billed * 100) / 100));
      setText("note", guests < pkg.minGuests ? `${pkg.name} has a ${pkg.minGuests}-guest minimum.` : `${money(pkg.perGuest)} × ${guests} guests, plus tax.`);
    }
    range.addEventListener("input", plan);
    pkgBox.addEventListener("click", (e) => {
      const b = e.target.closest("[data-pkg]");
      if (!b) return;
      plannerPkg = b.dataset.pkg;
      $$("button", pkgBox).forEach((x) => x.setAttribute("aria-checked", x === b));
      plan();
    });
    $(".planner-use", planner).addEventListener("click", () => {
      form.guests.value = range.value;
      form.package.value = plannerPkg;
      updateQuote();
      $("#quote").scrollIntoView();
      setTimeout(() => form.name.focus({ preventScroll: true }), 500);
    });
    plan();
  }

  /* ---------- Hero numbers count up ---------- */
  if (!reduceMotion) $$(".hero-stats b").forEach((el) => {
    const m = el.textContent.match(/^(\d+)(%?)$/);
    if (!m) return;
    const end = +m[1], t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + m[2]; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });

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
  /* ---------- Live availability from Google Calendar ----------
     Uses the public free/busy view, so no customer details are ever loaded. */
  async function loadGoogleCalendar() {
    const gc = SITE.googleCalendar || {};
    if (!gc.id || !gc.apiKey) return;
    const perDay = new Map();   // iso -> { blocks, hours }
    const add = (iso, hrs) => { const d = perDay.get(iso) || { blocks: 0, hours: 0 }; d.blocks++; d.hours += hrs; perDay.set(iso, d); };
    const end = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1);
    const chunks = [];
    for (let t = new Date(today); t < end; t = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 56)) {
      const tEnd = new Date(Math.min(end, new Date(t.getFullYear(), t.getMonth(), t.getDate() + 56)));
      chunks.push([t, tEnd]);
    }
    try {
      const results = await Promise.all(chunks.map(([a, b]) =>
        fetch(`https://www.googleapis.com/calendar/v3/freeBusy?key=${encodeURIComponent(gc.apiKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeMin: a.toISOString(), timeMax: b.toISOString(), timeZone: "America/Los_Angeles", items: [{ id: gc.id }] }),
        }).then((r) => r.ok ? r.json() : Promise.reject(r.status))));
      for (const res of results) {
        const cal = res.calendars && res.calendars[gc.id];
        if (!cal || (cal.errors && cal.errors.length)) throw new Error("calendar not public");
        for (const { start, end: stop } of cal.busy) {
          // Split each busy block across the days it covers (local time)
          let s = new Date(start); const e = new Date(stop);
          while (s < e) {
            const nextDay = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1);
            const segEnd = e < nextDay ? e : nextDay;
            add(toISO(s), (segEnd - s) / 36e5);
            s = segEnd;
          }
        }
      }
      booked.clear(); limited.clear();
      perDay.forEach(({ blocks, hours }, iso) => {
        (blocks >= 2 || hours >= (gc.bookedHours || 6) ? booked : limited).add(iso);
      });
      renderCalendar();
      const note = $(".cal-live");
      if (note) { note.hidden = false; note.textContent = "● Live availability, synced with our calendar"; }
    } catch (err) {
      console.warn("Google Calendar availability unavailable, using manual dates.", err);
    }
  }
  loadGoogleCalendar();
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
    }), { rootMargin: "0px 0px -40px 0px" });
    $$(".event-card, .special, .holiday, .package, .why-item, .gallery figure, .step, .split-head, .section-head")
      .forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  renderCalendar();
})();
