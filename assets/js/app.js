import { UI, LANGUAGE_NAMES, detectLanguage, pick } from "./i18n.js";
import { icon } from "./icons.js";

const CONFIG_URL = "config/lacrema.json";
const PLACEHOLDER = /^(DA_COMPLETARE|DA_VERIFICARE|TO BE COMPLETED|TO VERIFY|ZU ERGÄNZEN|ZU PRÜFEN)/i;

let config = null;
let lang = "it";
let t = UI.it;
let route = "home"; // "home" or a section id

const $ = (sel) => document.querySelector(sel);

/* -------------------------------------------------------------------------
   Text helpers
   ------------------------------------------------------------------------- */

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function raw(field) {
  return pick(field, lang, config?.property?.defaultLanguage ?? "it");
}

function missing(field) {
  const s = raw(field);
  return !s || PLACEHOLDER.test(s);
}

/**
 * Render a config value. Unfilled fields show a visible marker instead of
 * vanishing: a blank in a guest app becomes a phone call to the host, and the
 * marker doubles as the host's own checklist.
 */
function val(field) {
  const s = raw(field);
  if (!s) return `<span class="todo">${esc(t.todo)}</span>`;
  if (PLACEHOLDER.test(s)) {
    const hint = s.replace(PLACEHOLDER, "").replace(/^\s*[—–-]\s*/, "").trim();
    return `<span class="todo">${esc(t.todo)}</span>${hint ? " " + esc(hint) : ""}`;
  }
  return esc(s);
}

function name(str) {
  if (!str || PLACEHOLDER.test(str)) {
    const hint = String(str || "").replace(PLACEHOLDER, "").replace(/^\s*[—–-]\s*/, "").trim();
    return `<span class="todo">${esc(t.todo)}</span>${hint ? " " + esc(hint) : ""}`;
  }
  return esc(str);
}

const tel = (n) => (n ? `tel:${n.replace(/\s+/g, "")}` : null);
const map = (c) => (c ? `https://www.google.com/maps/search/?api=1&query=${c[0]},${c[1]}` : null);

/* -------------------------------------------------------------------------
   Home — greeting, Wi-Fi, then the launcher
   ------------------------------------------------------------------------- */

function wifiCard() {
  const { wifi } = config;
  const rows = ["ssid", "password"].map((k) => {
    const gone = missing(wifi[k]);
    return `
      <div class="wifi__row">
        <p class="wifi__key">${esc(t.wifi[k])}</p>
        <div class="wifi__value">
          <span>${gone ? `<span class="todo">${esc(t.todo)}</span>` : esc(wifi[k])}</span>
          ${gone ? "" : `<button class="wifi__copy" data-copy="${esc(wifi[k])}">${esc(t.wifi.copy)}</button>`}
        </div>
      </div>`;
  }).join("");

  return `
    <div class="wifi">
      <p class="wifi__label">${esc(t.wifi.label)}</p>
      ${rows}
      <p class="wifi__note">${val(wifi.note)}</p>
    </div>`;
}

function langSwitcher(extraClass = "") {
  return `<div class="langs ${extraClass}" role="group" aria-label="${esc(t.langLabel)}">
    ${config.property.languages
      .map(
        (l) =>
          `<button data-lang="${l}" aria-pressed="${l === lang}" lang="${l}">${esc(
            LANGUAGE_NAMES[l] ?? l.toUpperCase()
          )}</button>`
      )
      .join("")}
  </div>`;
}

function renderHome() {
  const { property, host, sections } = config;

  const tiles = sections
    .map(
      (s) => `
      <li>
        <button class="tile" data-go="${esc(s.id)}">
          <span class="tile__icon">${icon(s.icon, 26)}</span>
          <span class="tile__label">${val(s.label)}</span>
        </button>
      </li>`
    )
    .join("");

  const photo = property.photo
    ? ` style="background-image:url('${esc(property.photo)}')"`
    : "";

  return `
    <section class="hero"${photo}>
      <div class="hero__top">${langSwitcher("langs--onphoto")}</div>
      <div class="hero__mark">
        <img class="hero__logo" src="${esc(property.logoLight ?? property.logo)}"
             alt="${esc(property.name)}">
        <p class="hero__tagline">${val(property.tagline)}</p>
        <p class="hero__from">${val(host.greeting)}</p>
        <a class="hero__call" href="${tel(host.phone)}">${esc(t.call)}</a>
      </div>
    </section>

    <section class="band band--stone">
      <div>
        <h2 class="band__title band__title--center">${esc(t.sections)}</h2>
        <ul class="tiles">${tiles}</ul>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------
   Section renderers, one per "type" in the config
   ------------------------------------------------------------------------- */

const TYPES = {
  text: (s) => `<div class="prose"><p>${val(s.body)}</p></div>`,

  wifi: () => wifiCard(),

  rows: (s) =>
    `<div class="rows">${s.rows
      .map(
        (r) => `
        <div class="row">
          <p class="row__key">${val(r.key)}</p>
          <p class="row__val${r.big ? " row__val--big" : ""}">${val(r.val)}</p>
        </div>`
      )
      .join("")}</div>`,

  amenities: (s) =>
    `<ul class="amenities">${s.items
      .map(
        (a) => `
        <li class="amenity">
          <span class="amenity__icon">${icon(a.icon, 22)}</span>
          <div>
            <h3>${val(a.label)}</h3>
            <p>${val(a.detail)}</p>
          </div>
        </li>`
      )
      .join("")}</ul>`,

  places: (s) => {
    const items = s.places
      .map((p) => {
        const times = [
          p.walkMin ? `${p.walkMin} min ${esc(t.walk)}` : "",
          p.driveMin ? `${p.driveMin} min ${esc(t.drive)}` : ""
        ]
          .filter(Boolean)
          .join(" · ");

        const actions = [
          tel(p.phone) ? `<a href="${tel(p.phone)}">${esc(t.phone)}</a>` : "",
          map(p.coords) ? `<a href="${map(p.coords)}" target="_blank" rel="noopener">${esc(t.map)}</a>` : ""
        ]
          .filter(Boolean)
          .join("");

        const media = p.photo
          ? `<img class="place__photo" src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">`
          : `<div class="place__photo place__photo--empty">${icon("camera", 20)}<span>${esc(t.photoMissing)}</span></div>`;

        return `
          <li class="place">
            ${media}
            <div class="place__body">
              <h3 class="place__name">${name(p.name)}</h3>
              ${times ? `<p class="place__times">${times}</p>` : ""}
              <p class="place__note">${val(p.note)}</p>
              ${p.closed ? `<p class="place__closed">${esc(t.closed)}: ${val(p.closed)}</p>` : ""}
              ${actions ? `<div class="place__actions">${actions}</div>` : ""}
            </div>
          </li>`;
      })
      .join("");

    const anyTimes = s.places.some((p) => p.walkMin || p.driveMin);

    return `
      ${s.intro ? `<p class="prose">${val(s.intro)}</p>` : ""}
      <ul class="places">${items}</ul>
      ${anyTimes ? `<p class="disclaimer">${val(config.travelNote)}</p>` : ""}`;
  },

  emergency: (s) => {
    const contacts = s.contacts
      .map(
        (c) => `
        <li class="contact">
          <div>
            <p class="contact__name">${name(c.name)}</p>
            <p class="contact__detail">${val(c.detail)}</p>
          </div>
          ${tel(c.phone) ? `<a href="${tel(c.phone)}">${esc(t.callNow)}</a>` : ""}
        </li>`
      )
      .join("");

    return `
      <a class="emergency-call" href="tel:${esc(s.generic.number)}">
        <span>${val(s.generic.label)}</span>
        <strong>${esc(s.generic.number)}</strong>
      </a>
      <ul class="contacts">${contacts}</ul>`;
  }
};

function renderSection(id) {
  const s = config.sections.find((x) => x.id === id);
  if (!s) return renderHome();

  const render = TYPES[s.type] ?? TYPES.text;
  const dark = s.type === "emergency";

  return `
    <section class="band${dark ? " band--ink" : ""}">
      <div>
        <button class="back" data-go="home">${icon("home", 16)} ${esc(t.home)}</button>
        <h2 class="band__title band__title--section">
          <span class="band__icon">${icon(s.icon, 28)}</span>
          ${val(s.label)}
        </h2>
        ${render(s)}
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------
   Shell
   ------------------------------------------------------------------------- */

function renderShell() {
  const { property } = config;

  $("#masthead").innerHTML = `
    <button class="masthead__home" data-go="home" aria-label="${esc(t.home)}">
      <img class="masthead__logo" src="${esc(property.logo)}" alt="${esc(property.name)}">
    </button>
    ${langSwitcher()}`;

  $("#colophon").innerHTML = `
    ${esc(t.updated)} ${esc(config.updated)} ·
    <a href="${esc(property.website)}" target="_blank" rel="noopener">${esc(
      property.website.replace(/^https?:\/\//, "")
    )}</a>`;
}

function renderRoute() {
  document.body.classList.toggle("is-home", route === "home");
  $("#panel").innerHTML = route === "home" ? renderHome() : renderSection(route);
  window.scrollTo(0, 0);
}

function go(next) {
  route = next;
  location.hash = next === "home" ? "" : next;
  renderRoute();
}

function setLanguage(next) {
  lang = next;
  t = UI[lang] ?? UI.it;
  localStorage.setItem("lacrema:lang", lang);
  document.documentElement.lang = lang;
  renderShell();
  renderRoute();
}

/* -------------------------------------------------------------------------
   Events
   ------------------------------------------------------------------------- */

document.addEventListener("click", async (e) => {
  const langBtn = e.target.closest("[data-lang]");
  if (langBtn) return setLanguage(langBtn.dataset.lang);

  const goBtn = e.target.closest("[data-go]");
  if (goBtn) return go(goBtn.dataset.go);

  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      copyBtn.textContent = t.wifi.copied;
      copyBtn.dataset.copied = "true";
      setTimeout(() => {
        copyBtn.textContent = t.wifi.copy;
        delete copyBtn.dataset.copied;
      }, 2000);
    } catch {
      /* Clipboard blocked — the value is on screen anyway. */
    }
  }
});

window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1) || "home";
  if (id !== route) {
    route = id;
    renderRoute();
  }
});

/* -------------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------------- */

async function boot() {
  try {
    const res = await fetch(CONFIG_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    config = await res.json();
  } catch {
    $("#panel").innerHTML = `
      <section class="band">
        <div>
          <h2 class="band__title">Configurazione non caricata</h2>
          <p class="prose">Il file <code>${CONFIG_URL}</code> non è raggiungibile.
          Apri il progetto da un server (<code>python3 -m http.server</code>), non con doppio clic.</p>
        </div>
      </section>`;
    return;
  }

  lang = detectLanguage(config.property.languages, config.property.defaultLanguage);
  t = UI[lang] ?? UI.it;
  document.documentElement.lang = lang;
  document.title = config.property.name;

  route = location.hash.slice(1) || "home";
  renderShell();
  renderRoute();

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
}

boot();
