/**
 * Line icons, 24×24, stroke-based so they inherit currentColor and stay crisp
 * at any size. Drawn for this project rather than pulled from a generic set:
 * the weight matches the hairline of the didone in the property logo.
 */

export const ICONS = {
  home:
    '<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.6 9.5V20.8h12.8V9.5"/><path d="M10 20.8v-5.2h4v5.2"/>',

  key:
    '<circle cx="7.8" cy="7.8" r="4.2"/><path d="m10.9 10.9 9.3 9.3"/><path d="m15.6 15.6 2.3-2.3"/><path d="m18 18 2.3-2.3"/>',

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


/**
 * Category artwork. Used as the thumbnail for any place that has no photograph
 * of its own yet. Drawn in the same line language as the icons, on a 100×100
 * field, so a list without photographs still looks composed rather than empty.
 *
 * Photographs of businesses on the web are licensed to their owners, so they
 * cannot be copied into this repository. Replace a scene by setting the place's
 * `photo` field to a picture the host has taken.
 */
export const SCENES = {
  sea:
    `<circle cx="74" cy="26" r="8"/>
     <path d="M4 56c8 0 14-3 22-9s14-11 22-11 12 5 18 9"/>
     <path d="M4 62h92" opacity=".35"/>
     <path d="M8 72c6 0 6-5 12-5s6 5 12 5 6-5 12-5 6 5 12 5 6-5 12-5 6 5 12 5"/>
     <path d="M8 84c6 0 6-5 12-5s6 5 12 5 6-5 12-5 6 5 12 5 6-5 12-5 6 5 12 5"/>`,

  trail:
    `<circle cx="76" cy="22" r="7"/>
     <path d="M4 70 32 40l14 16 14-14 32 28"/>
     <path d="M4 70h92"/>
     <path d="M48 94c4-10-6-13-6-21s10-12 10-20"/>
     <path d="M22 70V56"/><path d="M13 56h18l-9-14z"/>`,

  village:
    `<path d="M8 88V58l13-11 13 11v30"/>
     <path d="M21 88V72a5 5 0 0 1 10 0v16"/>
     <path d="M40 88V44h22v44"/>
     <path d="M47 62h8v10h-8z"/>
     <path d="M68 88V30h18v58"/>
     <path d="M77 30V18"/><path d="M71 18h12"/>
     <path d="M73 48h8M73 62h8"/>
     <path d="M4 88h92"/>`,

  table:
    `<circle cx="50" cy="44" r="21"/>
     <circle cx="50" cy="44" r="12" opacity=".45"/>
     <path d="M13 16v13a6 6 0 0 0 12 0V16"/><path d="M19 29v53"/>
     <path d="M87 16c-6 5-9 12-9 19s3 11 9 11"/><path d="M84 46v36"/>
     <path d="M8 88h84" opacity=".35"/>`,

  aperitivo:
    `<path d="M22 28h52L48 58z"/>
     <path d="M48 58v24"/>
     <path d="M32 82h32"/>
     <path d="m58 22 16-10"/>
     <circle cx="78" cy="10" r="5"/>
     <path d="M22 28h52" opacity=".4"/>`,

  market:
    `<path d="M24 40h52l-6 48H30z"/>
     <path d="M39 48V28a9 9 0 0 1 18 0v20"/>
     <circle cx="43" cy="66" r="7" opacity=".6"/>
     <circle cx="59" cy="72" r="6" opacity=".6"/>
     <path d="M12 88h76" opacity=".4"/>`,

  transport:
    `<rect x="26" y="14" width="48" height="46" rx="11"/>
     <path d="M26 38h48"/>
     <circle cx="39" cy="49" r="3.5"/><circle cx="61" cy="49" r="3.5"/>
     <path d="M34 60 24 84M66 60l10 24"/>
     <path d="M10 88h80" opacity=".4"/>
     <path d="M36 24h28" opacity=".55"/>`,

  house:
    `<path d="M14 50 50 22l36 28"/>
     <path d="M22 46v42h56V46"/>
     <path d="M41 88V66h18v22"/>
     <path d="M31 56h12v12H31z" opacity=".6"/>
     <path d="M63 56h10v12H63z" opacity=".6"/>
     <path d="M6 88h88"/>`
};

/** Build the SVG for a category scene. */
export function scene(name) {
  const body = SCENES[name] ?? SCENES.house;
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
    fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
