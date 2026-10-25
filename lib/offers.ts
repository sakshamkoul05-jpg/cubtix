// Banners, offers and the top ticker — edit freely. Keep offers honest: only promise what the shop really offers.

export type Slide = {
  id: string;
  kicker: string;
  title: string;
  accent: string; // word(s) in the title shown in colour
  text: string;
  cta: { label: string; href: string };
  photo: string; // file name in /public/photos (without .jpg)
  theme: "black" | "red" | "pink" | "blue";
  badge: string;
};

export const slides: Slide[] = [
  {
    id: "house",
    kicker: "Krishna Gallery · Dharamshala",
    title: "The Gift House of Dharamshala",
    accent: "Gift House",
    text: "Toys, Hot Wheels, soft toys, jewellery and gifts for every age — retail and bulk.",
    cta: { label: "Shop the catalogue", href: "/catalogue" },
    photo: "1303080",
    theme: "black",
    badge: "9 departments",
  },
  {
    id: "hot-wheels",
    kicker: "Just landed",
    title: "New Hot Wheels in store",
    accent: "Hot Wheels",
    text: "Die-cast cars, collector models, track sets and car buckets.",
    cta: { label: "Shop Hot Wheels", href: "/categories/hot-wheels" },
    photo: "33846177",
    theme: "blue",
    badge: "New arrivals",
  },
  {
    id: "soft-toys",
    kicker: "Something to hug",
    title: "Teddies for every size of hug",
    accent: "Teddies",
    text: "Pocket teddies to giant bears, pandas and plush friends.",
    cta: { label: "Shop Soft Toys", href: "/categories/soft-toys" },
    photo: "245914",
    theme: "pink",
    badge: "Gift-wrapped",
  },
  {
    id: "bulk",
    kicker: "Shops, schools & events",
    title: "Return gifts by the dozen",
    accent: "by the dozen",
    text: "Send your list on WhatsApp — we reply with bulk prices and dispatch details.",
    cta: { label: "Get bulk prices", href: "/contact" },
    photo: "1666069",
    theme: "red",
    badge: "Bulk rates",
  },
];

export const ticker = [
  "Retail & bulk orders welcome",
  "New Hot Wheels just landed",
  "Gift wrapping available in store",
  "Return gifts for birthdays & weddings",
  "Order on WhatsApp — confirm before you pay",
  "Visit us at Krishna Gallery, Dharamshala",
];

export const promos = [
  {
    title: "Festive gift hampers",
    text: "Diwali, Rakhi, weddings — we put together hampers to your budget.",
    cta: "Ask for a hamper",
    msg: "Hi Cubtix! I'd like a festive gift hamper. Budget and occasion:",
    photo: "1666069",
    theme: "gold",
  },
  {
    title: "Jewellery that sparkles",
    text: "Rings, studs, bangles and bracelets — little gifts, big smiles.",
    cta: "Shop jewellery",
    href: "/categories/jewellery",
    photo: "20858959",
    theme: "pink",
  },
];
