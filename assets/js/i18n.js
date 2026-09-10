/* Interface strings. Everything a guest reads about the property lives in
   config/*.json — this file only holds the chrome. */

/* Languages are named in their own language. A flag is a country, not a
   language: an American does not recognise himself in the Union Jack. */
export const LANGUAGE_NAMES = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  nl: "Nederlands"
};

export const UI = {
  it: {
    back: "Indietro",
    home: "Casa",
    wifi: { label: "Wi-Fi di casa", ssid: "Rete", password: "Password", copy: "Copia", copied: "Copiato" },
    call: "Chiama Mario",
    directions: "Come arrivare",
    directionsSub: "Apri le mappe",
    sections: "Tutto quello che serve",
    walk: "a piedi",
    drive: "in auto",
    closed: "Chiuso",
    phone: "Telefona",
    map: "Mappa",
    callNow: "Chiama",
    todo: "da completare",
    photoMissing: "foto da aggiungere",
    updated: "Aggiornato al",
    langLabel: "Lingua"
  },

  en: {
    back: "Back",
    home: "Home",
    wifi: { label: "House Wi-Fi", ssid: "Network", password: "Password", copy: "Copy", copied: "Copied" },
    call: "Call Mario",
    directions: "Directions",
    directionsSub: "Open maps",
    sections: "Everything you need",
    walk: "on foot",
    drive: "by car",
    closed: "Closed",
    phone: "Call",
    map: "Map",
    callNow: "Call",
    todo: "to be completed",
    photoMissing: "photo to be added",
    updated: "Updated",
    langLabel: "Language"
  },

  de: {
    back: "Zurück",
    home: "Start",
    wifi: { label: "WLAN im Haus", ssid: "Netzwerk", password: "Passwort", copy: "Kopieren", copied: "Kopiert" },
    call: "Mario anrufen",
    directions: "Anfahrt",
    directionsSub: "Karte öffnen",
    sections: "Alles, was Sie brauchen",
    walk: "zu Fuß",
    drive: "mit dem Auto",
    closed: "Ruhetag",
    phone: "Anrufen",
    map: "Karte",
    callNow: "Anrufen",
    todo: "zu ergänzen",
    photoMissing: "Foto fehlt noch",
    updated: "Stand",
    langLabel: "Sprache"
  }
};

/** Pick the best available language for this visitor. */
export function detectLanguage(available, fallback) {
  const stored = localStorage.getItem("lacrema:lang");
  if (stored && available.includes(stored)) return stored;

  for (const tag of navigator.languages || [navigator.language || ""]) {
    const base = tag.slice(0, 2).toLowerCase();
    if (available.includes(base)) return base;
  }
  return fallback;
}

/** Resolve a {it,en,de} object, falling back to the property default. */
export function pick(field, lang, fallback) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field[fallback] ?? Object.values(field)[0] ?? "";
}
