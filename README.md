# Kikirikí

**Live app:** https://jchevere.github.io/Kikiriki/ (open it on your phone, then Add to Home Screen; it works offline)

An offline, bilingual (EN/ES) backyard-chicken care app: flock records, egg carton, Health Passport, care guide, reminders and a flock game.

## Source

This is the offline, bilingual (EN/ES) backyard-chicken web app.

You edit the files in `src/`. The build script joins them into **one self-contained `index.html`**, so the app keeps working offline as a single file.

## Folder map
```
src/
  index.template.html   page shell (head, header, nav); {{CSS}} and {{JS}} are filled in by the build
  css/                  styles, applied in file-name order (00 → 90)
  js/content/           text and art: guide chapters, care kits, foods, glossary, icons, illustrations
  js/app/               app logic: state, screens, eggs, health, game, backup, install, reminders
public/                 copied as-is to dist/: manifest, offline worker (sw.js), icons, hosting README
tools/
  build.py              src/ → build/index.html (Claude artifact copy), dist/ and docs/ (the site GitHub Pages serves)
  css_dead.py           finds CSS declarations that are always overridden
  dead_functions.js     finds duplicate function declarations
  patch_layers.js       finds functions that get reassigned at runtime (should report 0)
tests/                  browser tests (Python + Playwright + Chrome)
  run_all.py            runs every test
  snapshot.py           exact before/after check of 16 screens × 2 widths, plus an action replay
```

The JS files load in the order of their **number prefix**, whichever folder they are in. Content and logic interleave where one needs the other.

## Everyday workflow
```bash
python3 tools/build.py            # build
python3 tests/run_all.py          # all tests (about 90 seconds)
```

### Changes that shouldn't change anything visible (refactors)
```bash
python3 tests/snapshot.py save     # before you start
# ...edit...
python3 tools/build.py && python3 tests/snapshot.py compare   # must say IDENTICAL
```

### Releasing
1. Bump `VERSION` in `public/sw.js` so installed phones pick up the update.
2. Build, then commit and push. GitHub Pages republishes `docs/` within a minute or two.

## Rules of the house
- **One definition per function.** Don't reassign functions at runtime (`foo = function…`). If you need to extend a function, rename the original to `fooBase` and write `function foo(){ …fooBase()… }`. `node tools/patch_layers.js` must report 0.
- **Data is sacred.** `S` is saved to localStorage under `kikiriki_v1`, mirrored to IndexedDB, with 7 daily snapshots. If stored data can't be read, a copy is kept in `kikiriki_v1_unreadable` before anything can overwrite it.
- **Not a vet.** Health text gives general guidance only. Keep the disclaimers and the "follow the label / your vet" wording.
- Errors go to `kkWarn(where, error)`, which writes to the console and keeps the last 30 in `KK_LOG`.

## Known debt (next steps)
- About 380 `!important` rules remain, left over from the redesign layers. Removing them safely means consolidating each component's styles into one place, one component at a time, checking with the snapshot.
- Translation strings use two styles: `t("key")` and inline `es ? "…" : "…"`. Move the inline ones into the UI text table.
- Every tap re-renders the whole screen. It's fine at today's sizes. Long term, render only the part of the screen that changed.
