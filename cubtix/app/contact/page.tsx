import type { Metadata } from "next";
import { PageBanner } from "@/components/Sections";
import ContactForm from "@/components/ContactForm";
import { ArrowRight, Phone, Pin, WaIcon } from "@/components/Icons";
import { mapsEmbedUrl, mapsLinkUrl, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, WhatsApp or send Cubtix an enquiry — Krishna Gallery, Dharamshala, Himachal Pradesh. Owner: Vinay Kumar.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact Us" }]}
        title="Contact Us"
        text="Call, WhatsApp or fill in the form — we'll get back to you with prices and stock."
      />

      <section className="section">
        <div className="wrap contact">
          <article className="owner">
            <div className="owner-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.ownerPhoto} alt={`${site.owner}, owner of ${site.name}`} />
            </div>
            <div className="owner-body">
              <p className="eyebrow">Owner</p>
              <h2>{site.owner}</h2>
              <p>{site.name}, {site.address.line1}, Dharamshala</p>
              <a className="btn btn-wa btn-block" href={whatsappLink(`Hi ${site.owner.split(" ")[0]}ji!`)} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Message {site.owner.split(" ")[0]}
              </a>
            </div>
          </article>

          <div className="contact-main">
            <div className="contact-cards">
              {site.phones.map((p, i) => (
                <div className="contact-card" key={p.tel}>
                  <span className="contact-icon"><Phone size={22} /></span>
                  <div>
                    <p className="contact-label">{i === 0 ? "Phone & WhatsApp" : "Phone"}</p>
                    <a className="contact-value" href={`tel:${p.tel}`}>{p.display}</a>
                    <div className="contact-actions">
                      <a href={`tel:${p.tel}`}>Call</a>
                      <a href={`https://wa.me/${p.tel.replace("+", "")}?text=${encodeURIComponent("Hi Cubtix!")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </div>
                  </div>
                </div>
              ))}
              <div className="contact-card span-2">
                <span className="contact-icon"><Pin size={22} /></span>
                <div>
                  <p className="contact-label">Store address</p>
                  <p className="contact-value">{site.address.line1}, {site.address.line2}</p>
                  <div className="contact-actions">
                    <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={14} /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="cform-block">
              <h2 className="cform-title">Send us an enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cmap">
        <iframe src={mapsEmbedUrl} title={`Map: ${site.name}, Dharamshala`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
      <a className="cmap-place" href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
        Dharamshala, Himachal Pradesh
      </a>
    </>
  );
}
