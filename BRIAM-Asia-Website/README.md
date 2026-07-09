# BRIAM Asia — Marketing Site

Front-end implementation of the BRIAM Asia Figma design — a Next.js marketing
site for Singapore's exclusive regional agent of the SCE RD Steel Alliance.

Built from the [BRIAM Asia Figma file](https://www.figma.com/design/QsdmEny1BxDHBY5ZjJ7XJb/BRIAM-Asia)
with faithful layout, real exported imagery, and a layer of "subtle & premium"
motion + usability polish.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens mapped from Figma in `app/globals.css`)
- **Motion** (`motion/react`) for scroll reveals & micro-interactions
- `next/font` + `next/image` for fonts and optimized assets

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx        # fonts + metadata
  page.tsx          # section composition
  globals.css       # design tokens (colors, type, spacing) + base styles
components/
  sections/         # Navbar, Hero, SplitFeature, EngineeringCapabilities,
                    # Gateways, SteelAlliance, Stats, RegionalPresence,
                    # MarketsServed, LeadGen, Projects, ContactForm, Footer
  ui/               # Container, Section, Button, Reveal, GlowCard,
                    # AnimatedCounter, ScrollProgress, FloatingCTA
lib/                # motion variants, cn() helper
public/images/      # real assets exported from Figma
```

## Design system (from Figma)

| Token | Value |
| --- | --- |
| Ink / text | `#202D35` |
| Accent (purple) | `#773DBD` |
| SCE blue | `#66ADC8` |
| Silbloxx yellow | `#FFDC00` |
| Background | `#E0E0E0` |
| Headings | Anton *(placeholder for licensed **Druk Text Medium**)* |
| Body | Poppins *(placeholder for licensed **Galano Grotesque**)* |

### Swapping in the licensed brand fonts

The design uses commercial fonts (Druk Text + Galano Grotesque). This build ships
with close free substitutes (**Anton** + **Poppins**). To swap in the real fonts,
add the `.woff2` files under `app/fonts/`, replace the two `next/font` declarations
in `app/layout.tsx` with `next/font/local`, and keep the same CSS variable names
(`--font-anton` → heading, `--font-poppins` → body) — no other changes needed.

## Motion & usability features

Scroll-reveal animations, sticky condensing navbar with blur, top scroll-progress
bar, hero parallax + headline reveal, animated stat counters, timeline spine draw,
card hover lift + purple glow, image hover-zoom, floating "Get in Touch" CTA,
working mobile drawer + language dropdown, and a validating contact form. All motion
respects `prefers-reduced-motion`.

## Notes

- Copy and imagery are taken from the Figma; a couple of obvious typos in the
  source ("THAIILAND", "Lare warehouse") were corrected.
- Contact form and lead-gen "download" are front-end only — wire them to your
  email/CRM backend before go-live.
