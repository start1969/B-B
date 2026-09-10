# Lacrêma Welcome

A welcome app for guests of a small bed & breakfast. It opens on the phone from a
QR code in the room, works offline once loaded, and needs no installation, no
account and no backend.

Built for [B&B Lacrêma](https://www.beblacrema.it) in Finale Ligure, Italy, and
designed so that another property can fork it and change one JSON file.

## How it works for a guest

The home screen shows, in this order: the host's greeting, the Wi-Fi password in
full size, a tap-to-call and a tap-for-directions, and then a grid of fifteen
sections. Tap one, read it, tap home.

The Wi-Fi comes before everything else on purpose. Most welcome guides open with
a photo gallery; a guest arriving at eleven at night with a suitcase wants to
connect and find out when breakfast is. The photographs can wait.

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
| `emergency` | large call button plus contacts, on black | emergency numbers |
| `text` | a paragraph | anything else |

Icons come from `assets/js/icons.js`, drawn for this project at a hairline weight
that matches the didone in the logo. Add one there and reference it by name.

### Distances

Places carry `walkMin` and `driveMin`, not kilometres. "1.5 km" tells a guest
nothing; "26 minutes on foot, 5 by car" tells them whether to walk. Because the
house sits on the hillside, every section that shows times also shows a standing
note that the return leg is uphill. The current values are estimates from
straight-line distance and need checking on the ground.

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
4. The trusted taxi number, and the nearest bus stop.
5. The nearest supermarket, the bakery, the market day.
6. The out-of-hours doctor number.
7. Quiet hours, smoking policy, where to leave the keys at check-out.
8. Photographs of the recommended places — real ones, not stock.

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

`.nojekyll` is included so GitHub Pages serves the files untouched. When you
change any file in the shell list, bump `CACHE` in `sw.js` so guests get the new
version instead of the cached one. Content changes in `config/` do not need it —
the service worker fetches the config from the network first.

## Design

Colours come from the property's own logo: `#000000` and `#FBBA16`, sampled from
the file rather than guessed. `#A67B0E` is the same gold darkened enough to pass
contrast as text on white. `#EDEEE9` and `#55604A` are the lime plaster and the
olive terraces the house sits among.

Type is Bodoni Moda for display, echoing the didone in the logo; IBM Plex Sans
for the interface, for its clear numerals and full German coverage; IBM Plex Mono
for the Wi-Fi password only, where telling `l` from `1` is a function rather than
a style.

There is no frosted glass over photographs anywhere in the app. It looks
appealing in a promotional video and fails the only test that matters here:
a tired guest, at night, with the screen dimmed, looking for a password.

Fonts load from Google Fonts. For genuinely offline-first behaviour, self-host
them and add them to the service worker shell list.

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
