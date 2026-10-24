// Catalogue data.
//
// PHOTOS: every photo lives in /public/photos and is a free Pexels photo
// (pexels.com — free for commercial use, no attribution required). The file name is the
// Pexels photo ID, so you can find the original at https://www.pexels.com/photo/<ID>/
//
// To use your own shop photo for a product: put the file in /public/photos
// (e.g. /public/photos/my-teddy.jpg) and set  photo: "my-teddy"  on that product.

export type CategorySlug =
  | "hot-wheels"
  | "toys"
  | "soft-toys"
  | "keychains"
  | "table-mats"
  | "diaries"
  | "wallets"
  | "stationery"
  | "jewellery";

export type Recipient = "little" | "kids" | "teens" | "her" | "him" | "home" | "bulk";

export const recipients: { id: Recipient; label: string; sub: string }[] = [
  { id: "little", label: "Little ones", sub: "Ages 0–5" },
  { id: "kids", label: "Kids", sub: "Ages 6–12" },
  { id: "teens", label: "Teens", sub: "Ages 13–19" },
  { id: "her", label: "For her", sub: "Friends, sisters, mothers" },
  { id: "him", label: "For him", sub: "Friends, brothers, fathers" },
  { id: "home", label: "For the home", sub: "Housewarming & family" },
  { id: "bulk", label: "Bulk & corporate", sub: "Return gifts, schools, offices" },
];

export type Category = {
  slug: CategorySlug;
  name: string;
  tint: string;
  blurb: string;
  line: string;
  cover: string;
  for: Recipient[];
};

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  note?: string;
  photo: string;
  isNew?: boolean;
  for?: Recipient[];
};

/** Path of a photo in /public/photos (accepts a Pexels ID or your own file name). */
export const photo = (name: string | number) => `/photos/${name}.jpg`;
/** @deprecated kept for older components — same as photo() */
export const pexels = (name: string | number, _w?: number) => photo(name);

export const categories: Category[] = [
  { slug: "hot-wheels", name: "Hot Wheels", tint: "#E9EDF0", cover: "33846177", blurb: "Die-cast cars, gift packs and track sets for young collectors.", line: "For the collector in every family.", for: ["kids", "teens", "him"] },
  { slug: "toys", name: "Toys", tint: "#F3EEE6", cover: "3661247", blurb: "Building, pretend-play, wooden and electronic toys.", line: "Play that keeps little hands busy.", for: ["little", "kids", "bulk"] },
  { slug: "soft-toys", name: "Soft Toys", tint: "#F1ECE6", cover: "245914", blurb: "Teddies, pandas and plush friends, small to large.", line: "Something soft to hold on to.", for: ["little", "kids", "her"] },
  { slug: "keychains", name: "Keychains", tint: "#ECE8E1", cover: "16043302", blurb: "Brass, metal and novelty keychains and charms.", line: "Small gifts that go everywhere.", for: ["teens", "her", "him", "bulk"] },
  { slug: "table-mats", name: "Table Mats", tint: "#EFEBE3", cover: "19870054", blurb: "Placemats, runners and table sets for every home.", line: "Dress the table for every day.", for: ["home"] },
  { slug: "diaries", name: "Diaries", tint: "#F2EDE6", cover: "5088025", blurb: "Notebooks, planners and journals for every age.", line: "Pages for plans, notes and secrets.", for: ["teens", "her", "him", "bulk"] },
  { slug: "wallets", name: "Wallets", tint: "#EEE8E0", cover: "915917", blurb: "Wallets, card holders, pouches and bags.", line: "Everyday essentials, beautifully kept.", for: ["teens", "her", "him"] },
  { slug: "stationery", name: "Stationery", tint: "#F4ECEA", cover: "8099596", blurb: "Desk sets, notebooks, markers and school supplies.", line: "Everything for the school bag.", for: ["kids", "teens", "bulk"] },
  { slug: "jewellery", name: "Jewellery", tint: "#F1EAE3", cover: "20858959", blurb: "Rings, earrings, bracelets, bangles and pendants.", line: "Little sparkles for every day.", for: ["teens", "her"] },
];

type Row = [name: string, photo: string, note?: string, isNew?: boolean, forWho?: Recipient[]];
const p = (category: CategorySlug, items: Row[]): Product[] =>
  items.map(([name, ph, note, isNew, forWho], i) => ({ id: `${category}-${i + 1}`, name, category, photo: ph, note, isNew, for: forWho }));

export const products: Product[] = [
  ...p("hot-wheels", [
    ["Classic Red Model Car", "12361140", "Die-cast · collector style", true],
    ["Die-cast Car Collection", "33846177", "Assorted sports models"],
    ["Racing Track Mat with Cars", "33803875", "Play mat + mini cars"],
    ["Mixed Toy Car Bucket", "19342203", "Assorted cars & trucks"],
    ["Construction Truck Set", "14007163", "Dumper, digger & more", false, ["little", "kids"]],
    ["Vintage Beetle with Surfboard", "2767818", "Metal display model", false, ["him", "home"]],
  ]),
  ...p("toys", [
    ["Robot Pet Toy", "8982666", "Lights & movement", true, ["kids", "teens"]],
    ["Big Building Blocks", "8289844", "Chunky blocks for small hands", false, ["little", "kids"]],
    ["Wooden Animals & Blocks", "3662629", "Natural wood, safe finish", false, ["little"]],
    ["Tea Party Play Set", "4491728", "Pretend play", false, ["little", "kids"]],
    ["Wooden Toy Vehicles", "10831695", "Crane & police car", false, ["little", "kids"]],
    ["Wooden Toy Basket", "3661247", "Mixed wooden & plush toys", false, ["little", "bulk"]],
  ]),
  ...p("soft-toys", [
    ["Teddy Bear with Bow", "245914", "Soft brown plush", true],
    ["Classic Teddy (Large)", "860882", "Huggable size"],
    ["Panda Plush", "815491", "Black & white classic"],
    ["Beige Teddy (Small)", "19849143", "Pocket-friendly gift"],
    ["Handmade Rag Dolls", "38286862", "Cloth dolls, assorted", false, ["little", "kids", "home"]],
  ]),
  ...p("keychains", [
    ["Brass Eagle Keychain", "16329479", "Solid brass, detailed", true, ["him", "teens"]],
    ["Dragon Keychain", "16043302", "Antique silver finish", false, ["him", "teens"]],
    ["Golden Fish Keychain", "15862192", "Brass charm on ring"],
    ["Brass Crab Keychain", "16137824", "Handcrafted look"],
    ["House-shaped Keychain", "29094497", "Housewarming gift", false, ["home", "bulk"]],
  ]),
  ...p("table-mats", [
    ["Round Cane Placemats", "19870054", "Natural weave · set", true],
    ["Woven Water-Hyacinth Mats", "5053903", "Everyday dining"],
    ["Handwoven Table Runner", "36819963", "Bold traditional prints"],
    ["Lace-edge Dinner Set Mats", "17754273", "For festive tables"],
  ]),
  ...p("diaries", [
    ["Kraft Spiral Notebook", "5088025", "Plain pages", true],
    ["Terrazzo Planner", "5594266", "Spiral · with clips", false, ["teens", "her"]],
    ["Minimal White Planner", "7578199", "Dated / undated", false, ["him", "her", "bulk"]],
    ["Pocket Journal", "4639031", "Travel size", false, ["teens", "her"]],
    ["Writing Notebook", "5710614", "Ruled pages", false, ["him", "bulk"]],
  ]),
  ...p("wallets", [
    ["Distressed Leather Wallet", "915917", "Card slots, stitched", true, ["him"]],
    ["Yellow Chain Sling Bag", "5352628", "Compact crossbody", false, ["her", "teens"]],
    ["Bi-fold Card Holder", "7952556", "Slim design"],
    ["Leather Coin Pouch", "6633602", "Zip closure"],
    ["Slim Tan Wallet", "6127090", "Minimal everyday", false, ["him", "teens"]],
  ]),
  ...p("stationery", [
    ["Pastel Desk Set", "8099596", "Clipboard, clips, notepads", true, ["teens", "her", "bulk"]],
    ["Notebook & Marker Set", "6193089", "Colour markers + notebook", false, ["kids", "teens"]],
    ["Sketch & Geometry Kit", "5088008", "Notebook, ruler, pencils", false, ["kids", "teens", "bulk"]],
  ]),
  ...p("jewellery", [
    ["Stackable Rings", "29544342", "Adjustable sizes", true],
    ["Stud Earrings in Gift Box", "39070291", "Everyday wear"],
    ["Charm Bracelet", "34549909", "Delicate chain"],
    ["Pendant Necklace", "7700270", "Sparkling stone"],
    ["Glass Bangle Sets", "36738994", "Festive colours", false, ["her", "teens", "bulk"]],
    ["Beaded Bracelet Stack", "37401695", "Handmade style", false, ["her", "teens"]],
  ]),
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((x) => x.category === slug);
export const productPhoto = (prod: Product, _w?: number) => photo(prod.photo);
export const recipientsOf = (prod: Product): Recipient[] => prod.for ?? categoryBySlug(prod.category)!.for;
export const productsFor = (r: Recipient) => products.filter((x) => recipientsOf(x).includes(r));

export const heroPhotos = {
  main: photo("1303080"),
  small: photo("245914"),
  gifts: photo("1666069"),
};
