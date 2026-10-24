import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EnquiryProvider, FloatingList } from "@/components/Enquiry";
import { site } from "@/lib/site";
import Preloader from "@/components/motion/Preloader";
import { Cursor, Reveal, SmoothScroll } from "@/components/motion/Motion";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cubtix — The Gift House of Dharamshala",
    template: "%s · Cubtix Dharamshala",
  },
  description:
    "Cubtix, Krishna Gallery, Dharamshala — Hot Wheels, toys, soft toys, keychains, table mats, diaries, wallets, stationery & jewellery. Retail and bulk orders on WhatsApp.",
  openGraph: {
    title: "Cubtix — Toys, Gifts & Accessories",
    description: "Browse the shelf, add to your list and get prices on WhatsApp. Krishna Gallery, Dharamshala.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('cbx-seen'))document.documentElement.classList.add('seen')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Reveal />
        <div className="grain" aria-hidden="true" />
        <EnquiryProvider>
          <a className="skip" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingList />
        </EnquiryProvider>
      </body>
    </html>
  );
}
