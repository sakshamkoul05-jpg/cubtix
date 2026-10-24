// All business details live here — edit this one file to update the whole site.

export const site = {
  name: "Cubtix",
  tagline: "Toys, gifts & everyday accessories",
  owner: "Vinay Kumar",
  // Drop the owner's photo into /public as owner.jpg and change this to "/owner.jpg"
  ownerPhoto: "/owner.jpg",
  phones: [
    { display: "+91 92167 53108", tel: "+919216753108" },
    { display: "+91 94596 12348", tel: "+919459612348" },
  ],
  // Number that receives WhatsApp enquiries (country code, no +)
  whatsapp: "919216753108",
  address: {
    line1: "Krishna Gallery",
    line2: "Dharamshala, Himachal Pradesh 176215",
  },
  // Exact store pin (from the owner's Google Maps link)
  mapsQuery: "32.216835,76.3209429",
  mapsLink: "https://maps.app.goo.gl/9UQ15yWGNdQdWfdL7",
  url: "https://cubtix.vercel.app",
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${site.mapsQuery}&z=16&output=embed`;
export const mapsLinkUrl = site.mapsLink;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
