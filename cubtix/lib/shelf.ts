// "Shop the shelf" section.
//
// Right now it renders a display wall built from category photos.
// To switch to a REAL photo of the Cubtix shelf:
//   1. Put the photo in /public as shelf.jpg (landscape works best).
//   2. Set `photo: "/shelf.jpg"` below.
//   3. For each hotspot, set x / y as a percentage of the photo's width / height
//      (x: 0 = left edge, 100 = right edge; y: 0 = top, 100 = bottom),
//      pointing at where that product sits in the photo.

import type { CategorySlug } from "./products";

export type Hotspot = { category: CategorySlug; x: number; y: number };

export const shelf: { photo: string | null; hotspots: Hotspot[] } = {
  photo: null,
  hotspots: [
    { category: "soft-toys", x: 18, y: 30 },
    { category: "hot-wheels", x: 50, y: 28 },
    { category: "toys", x: 80, y: 32 },
    { category: "stationery", x: 22, y: 70 },
    { category: "diaries", x: 50, y: 72 },
    { category: "jewellery", x: 78, y: 70 },
  ],
};
