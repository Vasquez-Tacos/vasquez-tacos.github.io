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
  $$("[data-phone]").forEach((a) => { a.textContent = biz.phone; a.href = telHref; });
  $$("[data-email]").forEach((a) => { if (biz.email) { a.textContent = biz.email; a.href = "mailto:" + biz.email; } else a.remove(); });
  $$("[data-area]").forEach((el) => (el.textContent = `${biz.city} · Serving ${biz.serviceArea}`));
  $$("[data-hours]").forEach((el) => (el.textContent = biz.hours));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-deposit-pct]").forEach((el) => (el.textContent = pay.depositPercent));
  const socials = [["Instagram", biz.instagram], ["Facebook", biz.facebook]].filter(([, url]) => url);
  $(".socials").innerHTML = socials.length
    ? socials.map(([n, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${n}</a>`).join("<br>")
    : `<a href="${telHref}">Call us: ${esc(biz.phone)}</a>`;

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav-toggle"), links = $(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); } });

  /* ---------- Menu ---------- */
  const tabs = $(".menu-tabs"), menuGrid = $(".menu-grid");
  function showMenu(i) {
    $$("button", tabs).forEach((b, j) => b.setAttribute("aria-selected", i === j));
    menuGrid.innerHTML = SITE.menu[i].items.map((it) => `
      <article class="menu-item">
        <h3>${esc(it.name)}${it.tag ? `<span class="tag ${esc(it.tag)}">${esc(it.tag)}</span>` : ""}</h3>
        <p>${esc(it.desc)}</p>
      </article>`).join("");
  }
  tabs.innerHTML = SITE.menu.map((c, i) => `<button role="tab" data-i="${i}">${esc(c.category)}</button>`).join("");
  tabs.addEventListener("click", (e) => { if (e.target.dataset.i) showMenu(+e.target.dataset.i); });
  showMenu(0);

  /* ---------- Packages ---------- */
  const maxPkgGuests = Math.max(...SITE.packages.map((p) => p.maxGuests));
  $(".packages").innerHTML = SITE.packages.map((p) => `
    <article class="package ${esc(p.color || "red")}">
      <h3 class="ribbon">${esc(p.name)} Package</h3>
      ${p.popular ? `<span class="popular-tag">Most Popular</span>` : ""}
      <p class="price">${money(p.price)} <small>for</small></p>
      <p class="guests">${esc(p.guestsLabel)}</p>
      <ul>${p.includes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <a href="#quote" class="btn" data-pick="${esc(p.id)}">Book Now <span aria-hidden="true">›</span></a>
    </article>`).join("");
  $(".packages").addEventListener("click", (e) => {
    const id = e.target.closest("[data-pick]")?.dataset.pick;
    if (id) { form.package.value = id; pkgChosenByUser = true; updateQuote(); }
  });

  /* ---------- Gallery ---------- */
  $(".gallery").innerHTML = SITE.gallery.map((g) =>
    `<figure style="--photo: url('${encodeURI(g.img)}')"><figcaption>${esc(g.caption)}</figcaption></figure>`).join("");

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
  let pkgChosenByUser = false;
  form.package.innerHTML = SITE.packages.map((p) => `<option value="${esc(p.id)}"${p.popular ? " selected" : ""}>${esc(p.name)}: ${money(p.price)} (${esc(p.guestsLabel.toLowerCase())})</option>`).join("");
  $(".addons").insertAdjacentHTML("beforeend", SITE.addons.map((a) => `
    <label><input type="checkbox" name="addon" value="${esc(a.id)}"> ${esc(a.name)} <small>${money(a.price)}/${a.per}</small></label>`).join(""));
  form.package.addEventListener("change", () => (pkgChosenByUser = true));
  // Pick the package that fits the guest count (unless the customer chose one bigger)
  form.guests.addEventListener("input", () => {
    const n = parseInt(form.guests.value, 10);
    if (!n) return;
    const fit = SITE.packages.find((p) => n <= p.maxGuests) || SITE.packages[SITE.packages.length - 1];
    const current = SITE.packages.find((p) => p.id === form.package.value);
    if (!pkgChosenByUser || current.maxGuests < n) form.package.value = fit.id;
  });

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
    const guests = Math.min(entered, pkg.maxGuests) || pkg.maxGuests;
    const lines = [[`${pkg.name} Package (${pkg.guestsLabel.toLowerCase()})`, pkg.price]];
    $$("input[name=addon]:checked", form).forEach((cb) => {
      const a = SITE.addons.find((x) => x.id === cb.value);
      lines.push([a.per === "guest" ? `${a.name} × ${guests}` : a.name, a.per === "guest" ? a.price * guests : a.price]);
    });
    const total = lines.reduce((s, [, v]) => s + v, 0);
    return { pkg, guests, entered, custom: entered > maxPkgGuests, lines, total, deposit: Math.round(total * pay.depositPercent) / 100 };
  }
  function updateQuote() {
    const q = getQuote();
    $(".quote-lines").innerHTML = q.lines.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${money(v)}</dd></div>`).join("")
      + (q.custom ? `<div class="warn"><dt>${q.entered} guests is over ${maxPkgGuests}. We'll send you a custom quote.</dt><dd></dd></div>` : "")
      + (!q.entered ? `<div class="warn"><dt>Add-ons estimated at ${q.guests} guests. Enter your guest count.</dt><dd></dd></div>` : "");
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
      estimate: q.custom ? "Custom quote needed (over " + maxPkgGuests + " guests)" : money(q.total),
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
        form.reset(); selectedISO = ""; pkgChosenByUser = false; renderCalendar(); updateQuote();
        setMsg("¡Gracias! Your request was sent. Our family will call or email you within 24 hours to confirm.", "ok");
      } else if (biz.email) {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
        location.href = `mailto:${biz.email}?subject=${encodeURIComponent("Booking request: " + data.date)}&body=${encodeURIComponent(body)}`;
        setMsg("Your email app should open with your request filled in. Just press send.", "ok");
      } else {
        setMsg(`To finish booking, please call or text us at ${biz.phone}. Your estimate is ${data.estimate}.`, "ok");
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

  renderCalendar();
})();
