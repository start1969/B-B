/**
 * Line icons, 24×24, stroke-based so they inherit currentColor and stay crisp
 * at any size. Drawn for this project rather than pulled from a generic set:
 * the weight matches the hairline of the didone in the property logo.
 */

export const ICONS = {
  home:
    '<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.6 9.5V20.8h12.8V9.5"/><path d="M10 20.8v-5.2h4v5.2"/>',

  key:
    '<circle cx="8.6" cy="8.6" r="4.6"/><path d="m11.9 11.9 8.6 8.6"/><path d="m17.4 17.4 2.2-2.2"/>',

  wifi:
    '<path d="M2.6 8.6a14.5 14.5 0 0 1 18.8 0"/><path d="M6.1 12.1a9.4 9.4 0 0 1 11.8 0"/><path d="M9.4 15.5a4.3 4.3 0 0 1 5.2 0"/><circle cx="12" cy="19.2" r="1.1"/>',

  doc:
    '<path d="M6.2 2.8h7.6l4 4v14.4H6.2z"/><path d="M13.8 2.8v4h4"/><path d="M9 11.5h6M9 14.8h6M9 8.2h2.5"/>',

  pin:
    '<path d="M12 21.2s6.9-6.4 6.9-11.2a6.9 6.9 0 1 0-13.8 0C5.1 14.8 12 21.2 12 21.2z"/><circle cx="12" cy="9.8" r="2.6"/>',

  train:
    '<rect x="5.2" y="2.8" width="13.6" height="13" rx="3.2"/><path d="M5.2 10.2h13.6"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="m8.4 15.8-2.6 5.4M15.6 15.8l2.6 5.4"/>',

  sofa:
    '<path d="M5 12.4V9.6a2.2 2.2 0 0 1 4.4 0"/><path d="M14.6 9.6a2.2 2.2 0 0 1 4.4 0v2.8"/><path d="M9.4 12.4V8a2 2 0 0 1 2-2h1.2a2 2 0 0 1 2 2v4.4"/><rect x="3.4" y="12.4" width="17.2" height="5.6" rx="2.2"/><path d="M6.6 18v2.6M17.4 18v2.6"/>',

  camera:
    '<path d="M2.8 8.4h4.3L9 5.8h6l1.9 2.6h4.3v11.8H2.8z"/><circle cx="12" cy="14.1" r="3.6"/>',

  cutlery:
    '<path d="M7 3v18"/><path d="M4.8 3v3.8a2.2 2.2 0 0 0 4.4 0V3"/><path d="M17.2 21V3c-2.1 1.1-3.2 3.2-3.2 6.2s1.1 4.2 3.2 4.2"/>',

  glass:
    '<path d="M4.6 4h14.8l-7.4 8.6z"/><path d="M12 12.6V20"/><path d="M8.4 20h7.2"/>',

  cart:
    '<path d="M2.6 3.6h2.7l2.6 11.8h11l2.1-8.6H6"/><circle cx="9.4" cy="19.6" r="1.4"/><circle cx="17.2" cy="19.6" r="1.4"/>',

  wave:
    '<circle cx="12" cy="6.4" r="3.4"/><path d="M2.4 15.4c2.4 0 2.4-1.7 4.8-1.7s2.4 1.7 4.8 1.7 2.4-1.7 4.8-1.7 2.4 1.7 4.8 1.7"/><path d="M2.4 19.6c2.4 0 2.4-1.7 4.8-1.7s2.4 1.7 4.8 1.7 2.4-1.7 4.8-1.7 2.4 1.7 4.8 1.7"/>',

  bike:
    '<circle cx="5.8" cy="16.8" r="3.6"/><circle cx="18.2" cy="16.8" r="3.6"/><path d="m5.8 16.8 4.4-8.2h4.2"/><path d="m10.2 8.6 5 8.2"/><path d="M13.4 5.6h3.2"/>',

  cross:
    '<path d="M9.6 3.2h4.8v6.4h6.4v4.8h-6.4v6.4H9.6v-6.4H3.2V9.6h6.4z"/>',

  suitcase:
    '<rect x="3" y="7" width="18" height="13.2" rx="2.4"/><path d="M8.6 7V4.6h6.8V7"/><path d="M3 12.2h18"/>',

  phone:
    '<path d="M6.2 3.2h2.9l1.9 4.8-2.4 1.5a12 12 0 0 0 5.9 5.9l1.5-2.4 4.8 1.9v2.9a2.4 2.4 0 0 1-2.6 2.4C10.6 19.6 4.4 13.4 3.8 5.8a2.4 2.4 0 0 1 2.4-2.6z"/>',

  clock:
    '<circle cx="12" cy="12" r="9"/><path d="M12 6.4V12l3.9 2.4"/>',

  car:
    '<path d="M4.6 15.4 6.6 9h10.8l2 6.4"/><rect x="2.8" y="15.4" width="18.4" height="4.2" rx="1.6"/><path d="M6.4 19.6v1.2M17.6 19.6v1.2"/>',

  flame:
    '<path d="M12 21c3.9 0 6.4-2.6 6.4-6 0-4.6-4.4-6-4.4-12 0 0-3 2-3 5.6C11 10 8.1 9 8.1 6.5c0 0-2.5 3-2.5 8.5 0 3.4 2.5 6 6.4 6z"/>',

  shirt:
    '<path d="m8.6 3 3.4 2.4L15.4 3 21 6.1l-2.5 4-2-1.1V21h-9V9l-2 1.1L3 6.1z"/>',

  water:
    '<path d="M12 3.2s6 6.4 6 10.4a6 6 0 1 1-12 0c0-4 6-10.4 6-10.4z"/>'
};

/** Build an inline SVG for an icon name. */
export function icon(name, size = 24) {
  const body = ICONS[name] ?? ICONS.info ?? ICONS.home;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none"
    stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

ICONS.info =
  '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.4" r="1"/>';
