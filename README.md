# Cubtix website

Next.js 16 site for Cubtix — The Gift House of Dharamshala (Krishna Gallery).

Signature features: Gift Finder quiz (/gift-finder), scroll-animated departments, "Shop the shelf" hotspots (configure a real shop photo in `lib/shelf.ts`), and a WhatsApp enquiry list.

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo → Deploy (no settings needed).

## Edit content
- Business details (phones, WhatsApp, address, map, owner photo): `lib/site.ts`
- Products & categories: `lib/products.ts`
- Product photos: put files in `public/products/` and add `image: "/products/file.jpg"` to the product.
- Owner photo: put `owner.jpg` in `public/` and set `ownerPhoto: "/owner.jpg"` in `lib/site.ts`.

## Run locally
npm install
npm run dev

## Photos
All photos are real image files in `public/photos/` (free Pexels photos, OK for commercial use, no credit needed).
Each file is named by its Pexels photo ID — the original is at https://www.pexels.com/photo/<ID>/.
To use Vinay ji's own shop photos: drop them in `public/photos/` (e.g. `teddy.jpg`) and set `photo: "teddy"` on that product in `lib/products.ts`.

## Fonts
Poppins (self-hosted via @fontsource) — the same family Hamleys India uses; designed by the Indian Type Foundry.

## Motion & interactions (v5)

All animation code lives in `components/motion/`:

- `Motion.tsx`: smooth scrolling (Lenis), custom cursor + magnetic buttons + 3D card tilt, scroll reveals, smart header, progress line
- `Preloader.tsx`: first-visit loader (once per browser session)
- `app/template.tsx`: page-change curtain
- `ToyBox.tsx`: the draggable/throwable hero toys (edit the `toys` list to change photos/links)
- `Marquee.tsx`: scroll-reactive department marquee
- `Departments.tsx`: pinned horizontal-scroll departments (swipe row on phones)
- `fly.ts`: product photo flies into "My list"

Everything switches off automatically for visitors who have "reduce motion" turned on, and the custom cursor only appears on mouse/trackpad devices.
