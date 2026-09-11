# Lacrêma Welcome

A welcome app for guests of a small bed & breakfast. It opens on the phone from a
QR code in the room, works offline once loaded, and needs no installation, no
account and no backend.

Built for [B&B Lacrêma](https://www.beblacrema.it) in Finale Ligure, Italy, and
designed so that another property can fork it and change one JSON file.

## How it works for a guest

The home screen is the front door. The entrance photograph fills the viewport,
the logo sits centred at the top, and fifteen square glass tiles float over it —
everything on one screen, no scrolling before the first tap. Tap a tile, read it,
tap home. A single call button sits at the foot.

Interface and content are in Italian, English and German, chosen from the phone's
language and overridable by the guest. Languages are named in their own language
rather than shown as flags: a flag is a country, not a language.

## Configure it

Everything a guest reads lives in [`config/lacrema.json`](config/lacrema.json).
The sections themselves are data, so adding, removing or reordering them means
editing that file — never the code.

```jsonc
{
  "property": { "name": "…", "coords": [44.1879211, 8.3549945], "languages": ["it","en","de"] },
  "host":     { "name": "…", "phone": "+39…" },
  "wifi":     { "ssid": "…", "password": "…" },
  "sections": [ /* one object per tile in the launcher */ ]
}
```

Any text a guest reads is either a plain string or an object keyed by language:

```json
"label": { "it": "Colazione", "en": "Breakfast", "de": "Frühstück" }
```

### Section types

A section declares an `id`, an `icon`, a `label` and a `type`. The type decides
how it renders:

| type | renders as | use it for |
| --- | --- | --- |
| `rows` | key/value list | times, rules, contact details |
| `places` | list with photo, walking and driving time, call and map | restaurants, beaches, shops |
| `amenities` | icon list with a short description | what the house offers |
| `wifi` | the Wi-Fi card | network and password |
| `emergency` | large call button plus contacts | emergency numbers |
| `contacts` | contacts grouped under headings | useful local numbers |
| `text` | a paragraph | anything else |

Icons come from `assets/js/icons.js`, drawn for this project at a hairline weight
that matches the didone in the logo. Add one there and reference it by name.

`property.photo` is the home-screen image and `property.logoLight` the logo used
over it. Drop either and the home falls back to a plain dark panel.

### Distances

Places carry `walkMin` and `driveMin`, not kilometres. "1.5 km" tells a guest
nothing; "26 minutes on foot, 5 by car" tells them whether to walk. Anything over
an hour on foot is hidden: nobody walks to a trailhead in Varigotti, and offering
it as an option is noise. Because the house sits on the hillside, every section
that shows times also carries a note that the return leg is uphill.

The values are estimated from straight-line distance with a road factor, and need
checking on the ground.

### Category artwork instead of photographs

Photographs of businesses on the web belong to their owners: Google Maps images
are licensed for use inside Google's own maps, and a restaurant's own pictures
are its property. Copying either into a public MIT-licensed repository would
expose the host, so this project does not ship them.

Instead, every place without a photograph shows a drawn scene for its category —
sea, trail, village, table, aperitivo, market, transport, house — in the same
line language as the icons, defined in `assets/js/icons.js` as `SCENES`. A place
picks one with its `scene` field, or inherits the section's.

Set a place's `photo` field to replace its scene with a real picture. The right
pictures are the ones the host takes himself.

### Fields still to be filled in

Values left as `DA_COMPLETARE` render as a visible *to be completed* marker
rather than disappearing. A blank in a guest app becomes a phone call to the
host, so the gap is shown rather than hidden — and it doubles as the host's
checklist. Open the app and you can see exactly what is missing.

Outstanding for Lacrêma, in order of value:

1. **Mario's own note on each recommended place.** No data source can supply
   this, and it is the only reason a guest would use the app instead of Google
   Maps.
2. Wi-Fi network and password.
3. Breakfast time and where it is served.
4. The nearest bus stop and the line down to the seafront.
5. The nearest supermarket, the bakery, the market day.
6. Quiet hours, smoking policy, where to leave the keys at check-out.
8. Photographs of the recommended places — real ones, not stock. Set the `photo`
   field on each place; until then the slot shows a marked placeholder.

## Run it locally

The app loads its configuration with `fetch`, so it needs a server. Opening
`index.html` by double-clicking will not work.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish it

1. Push the repository to GitHub.
2. Settings → Pages → deploy from branch, root folder.
3. Generate a QR code pointing at the published URL and put it in each room.

`.nojekyll` is included so GitHub Pages serves the files untouched.

Put the files in the repository root, not inside a subfolder — every path in the
app is relative, so a stray `lacrema-welcome/` level will serve a blank page.

### Publishing an update

The service worker fetches `index.html` and anything under `config/` from the
network first, so content edits reach guests on the next load with nothing else
to do.

When you change CSS, JS or an image, bump `CACHE` in `sw.js` (`lacrema-v4` →
`lacrema-v5`). On the next visit the new worker installs, deletes the old cache,
takes over immediately and the page reloads itself once. Forget the bump and
guests keep the old stylesheet.

If you are testing and the browser still shows the previous version, unregister
the worker once: developer tools → Application → Service Workers → Unregister,
then Storage → Clear site data. On iOS, an app added to the Home screen keeps its
own cache — remove the icon and add it again.

## Design

Two sources feed the palette, both sampled from files rather than guessed. The
logo gives `#000000` and `#FBBA16`; `#A67B0E` is the same gold darkened enough to
pass contrast as text on stone. The entrance photograph gives the rest — walnut
`#755544`, limestone `#AFA089`, shadow `#241F15`, foliage `#35412F`.

The photograph is not a header image: it is fixed behind the entire application,
so the house stays present on every screen while content scrolls over it. The
scrim is lighter on the home, where the doorway should read, and nearly solid on
the inner pages, where long text has to stay comfortable.

Tiles are dark glass rather than light. Light frosted panels depend on
`backdrop-filter`, which not every browser honours, and over a bright patch of a
photograph they leave white text stranded. A dark tint guarantees the contrast
whatever sits behind it, and still reads as transparent.

Type is Bodoni Moda for display, echoing the didone in the logo; IBM Plex Sans
for the interface, for its clear numerals and full German coverage; IBM Plex Mono
for the Wi-Fi password only, where telling `l` from `1` is a function rather than
a style.

The logo ships in two versions: `logo.png` as supplied, and `logo-light.png`
generated from it by recolouring the black glyphs to white while keeping the gold
ampersand, for use over the photograph.

Photographs carry a warm scrim rather than a frosted-glass panel. Frosted glass
looks appealing in a promotional video and fails the only test that matters here:
a tired guest, at night, with the screen dimmed.

Fonts load from Google Fonts. For genuinely offline-first behaviour, self-host
them and add them to the service worker shell list.

## What is already filled in

Bars, groceries, trails, sights, transport and the emergency and useful-number
lists carry real, researched content rather than placeholders — five aperitivo
addresses, the four nearest supermarkets, five walks, five things worth seeing.
The restaurants still wait for Mario's own words.

One finding worth keeping: the closest supermarket is not one of those in the
centre but the Penny on Corso Europa, which sits almost straight downhill from
the house.

## Local numbers

The emergency and useful-numbers sections are filled in with verified local
data rather than placeholders: the ASL2 out-of-hours doctor freephone, the
emergency department at Santa Corona in Pietra Ligure, the two Finale taxi
firms, the Carabinieri and municipal police stations, the coastguard, and the
pharmacy on Via Pertica that opens every day of the year.

Numbers move. Check them once a season, and treat 112 as the one that never
changes.

## Data and attribution

Opening hours and closing days are the fastest-ageing data in a project like
this. They are stored as the host's own knowledge rather than scraped, so that
nobody sends a guest to a closed door, and every list carries a call-ahead note.

If you extend the app with automatically generated points of interest, prefer
OpenStreetMap via the Overpass API — no key, no billing, and an ODbL licence that
survives a fork. Attribute it in the interface.

## Roadmap

- Self-hosted fonts for true offline use
- QR generator for the room cards
- A room-specific view (`?room=fiordaliso`) so the pet policy matches the room
  the guest is actually in
- A simple editor page so the host can change the Wi-Fi password without opening
  a JSON file

## Licence

MIT. The Lacrêma name, logo and photographs are not covered by it and remain the
property of the B&B.
