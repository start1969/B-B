import { UI, LANGUAGE_NAMES, detectLanguage, pick } from "./i18n.js";
import { icon, scene } from "./icons.js";

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
  const keys = wifi.open ? ["ssid"] : ["ssid", "password"];
  const rows = keys.map((k) => {
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
      ${wifi.open ? `<p class="wifi__open">${icon("wifi", 18)} ${esc(t.wifi.openLabel)}</p>` : ""}
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
      (sec) => `
      <li>
        <button class="tile" data-go="${esc(sec.id)}">
          <span class="tile__icon">${icon(sec.icon, 24)}</span>
          <span class="tile__label">${val(sec.label)}</span>
        </button>
      </li>`
    )
    .join("");

  return `
    <section class="home">
      ${langSwitcher()}
      <img class="home__logo" src="${esc(property.logoLight ?? property.logo)}"
           alt="${esc(property.name)}">
      <p class="home__tagline">${val(property.tagline)}</p>
      <div class="home__tiles"><ul class="tiles">${tiles}</ul></div>
      <a class="home__call" href="${tel(host.phone)}">
        ${icon("phone", 16)} ${esc(t.call)}
      </a>
      <p class="home__colophon">
        ${esc(t.updated)} ${esc(config.updated)} ·
        <a href="${esc(property.website)}" target="_blank" rel="noopener">${esc(
          property.website.replace(/^https?:\/\//, "")
        )}</a>
      </p>
    </section>`;
}

/* -------------------------------------------------------------------------
   Section renderers, one per "type" in the config
   ------------------------------------------------------------------------- */

/** One row in a contact list — shared by the emergency and contacts types. */
function contactRow(c) {
  return `
    <li class="contact">
      <div>
        <p class="contact__name">${name(c.name)}</p>
        <p class="contact__detail">${val(c.detail)}</p>
      </div>
      ${tel(c.phone) ? `<a href="${tel(c.phone)}">${icon("phone", 14)} ${esc(t.callNow)}</a>` : ""}
    </li>`;
}

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
        // Over an hour on foot is not a walk anybody makes: showing it as an
        // option is noise, so only the driving time is offered.
        const walkable = p.walkMin && p.walkMin <= 60;
        const times = [
          walkable ? `${p.walkMin} min ${esc(t.walk)}` : "",
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
          : `<div class="place__photo place__photo--scene">${scene(p.scene ?? s.scene ?? "house")}</div>`;

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

  contacts: (s) => {
    const groups = (s.groups ?? [])
      .map(
        (g) => `
        <div class="group">
          <h3 class="group__label">${val(g.label)}</h3>
          <ul class="contacts">${g.items.map(contactRow).join("")}</ul>
        </div>`
      )
      .join("");

    return `${s.intro ? `<p class="prose">${val(s.intro)}</p>` : ""}${groups}`;
  },

  emergency: (s) => {
    const contacts = s.contacts.map(contactRow).join("");

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

  return `
    <section class="band">
      <div>
        <button class="back" data-go="home">${icon("home", 16)} ${esc(t.home)}</button>
        <h2 class="band__title">
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
      <img class="masthead__logo" src="${esc(property.logoLight ?? property.logo)}" alt="${esc(property.name)}">
    </button>
    ${langSwitcher()}`;

  $("#colophon").innerHTML = "";
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

  if (config.property.photo) {
    // Resolved against the document: inside a custom property a relative URL
    // would otherwise be resolved against the stylesheet's own folder.
    const src = new URL(config.property.photo, document.baseURI).href;
    document.documentElement.style.setProperty("--photo", `url("${src}")`);
  }

  route = location.hash.slice(1) || "home";
  renderShell();
  renderRoute();

  registerServiceWorker();
}

/**
 * Register the worker and adopt a new version as soon as one is published.
 * Without this a guest keeps the copy cached on their first visit, and an edit
 * to the house rules never reaches them.
 */
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloading) return;
    reloading = true;
    location.reload();
  });

  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => {
      reg.update();

      reg.addEventListener("updatefound", () => {
        const incoming = reg.installing;
        if (!incoming) return;

        incoming.addEventListener("statechange", () => {
          // A new worker is ready and an old one is in charge: hand over now.
          if (incoming.state === "installed" && navigator.serviceWorker.controller) {
            incoming.postMessage("skipWaiting");
          }
        });
      });

      // Check again when the guest returns to the app.
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") reg.update();
      });
    })
    .catch(() => {});
}

boot();
