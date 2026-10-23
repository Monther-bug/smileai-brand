# SmileAI — Brand Identity Proposal

A one-page website that presents **three logo and visual identity directions** for SmileAI,
the AI oral-health app from Libya. The client can read the research, compare the three
concepts and send back their choice.

**Open it:** `index.html` (or the GitHub Pages link for this repo).
Add `?lang=ar` to the link to open it in Arabic.

## The three concepts

| # | Name | Idea |
|---|------|------|
| 01 | **Sīn · السين** | The letter س drawn as teeth + a smile. The one concept built from the name. |
| 02 | **Arch · القوس** | The dentist's U-shaped chart as dots. One blue dot is the AI finding. |
| 03 | **Scan · المسح** | A tooth drawn with seven scan lines. One blue line is the scan. |

All three use the app's own theme (`lib/core/theme/app_colors.dart`): Smile Blue `#3A9BE0`,
Ink `#0F141A`, Soft Blue `#EAF3FB`, Background `#FAFBFC`, Rose `#DE5D93`, and the app fonts
Poppins + Tajawal.

## What is inside

```
index.html                 the presentation (English + Arabic, right-to-left ready)
assets/css/style.css       styles
assets/js/main.js          language switch, motion, choice form
assets/js/config.js        WhatsApp number / email that receive the client's choice
assets/logos/<concept>/    every logo file as clean SVG (text outlined) + 1024 px app icon PNG
assets/mockups/            photo mockups (EN + AR) for each concept
assets/img/                construction drawings, patterns, social preview image
downloads/                 one zip of logo files per concept
```

## Before sending to the client

1. Open `assets/js/config.js` and add your WhatsApp number (digits only, e.g. `218910000000`)
   and/or email, so the client's choice comes straight to you.
2. Turn on GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Credits

- Fonts: Poppins, Tajawal, Readex Pro, IBM Plex Sans / Sans Arabic — SIL Open Font License.
- Mockup photos: [Pexels](https://www.pexels.com/license/) (free to use). Logos were placed on the photos with a perspective warp.
- Logos, lettering, drawings and site: designed for SmileAI. Concepts for review — final files after approval.
