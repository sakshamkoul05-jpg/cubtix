import type { Metadata } from "next";
import { PageBanner } from "@/components/Sections";
import WriteForUsForm from "@/components/WriteForUsForm";

export const metadata: Metadata = {
  title: "Write for Us",
  description: "Write for Cubtix — share gift guides, toy reviews, festival gifting ideas and collector stories with our readers.",
};

const topics = [
  ["Gift guides", "Birthday, Diwali, Rakhi, wedding and return-gift ideas for every budget."],
  ["Toy reviews", "Honest reviews of toys, Hot Wheels sets, soft toys and learning toys."],
  ["Parenting & play", "Play ideas, age-wise toy picks and screen-free fun for kids."],
  ["Collectors' corner", "Die-cast cars, keychains and collectibles — tips and stories."],
  ["Stationery & study", "Desk setups, journaling, planners and back-to-school lists."],
  ["Style & accessories", "Jewellery, wallets and small accessories that make great gifts."],
];

const rules = [
  "Original, unpublished writing only — no AI-spun or copied content.",
  "800–1,500 words, written in simple English or Hinglish.",
  "Useful for shoppers in India: practical, honest and easy to read.",
  "Include 1–3 of your own photos if you can (you must own the rights).",
  "One relevant link to your own site or profile is allowed in your author bio.",
  "We may edit for length and clarity. We reply within 3–5 working days.",
];

export default function WriteForUsPage() {
  return (
    <>
      <PageBanner
        crumbs={[{ href: "/", label: "Home" }, { label: "Write for Us" }]}
        title="Write for"
        italic="Us"
        text="Love gifts, toys or stationery? Share your ideas with Cubtix readers — parents, students, shop owners and gift-hunters."
      />

      <section className="section">
        <div className="wrap wfu">
          <div className="wfu-info">
            <h2 className="wfu-h">What we publish</h2>
            <div className="wfu-topics">
              {topics.map(([t, d]) => (
                <div className="wfu-topic" key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>

            <h2 className="wfu-h">Guidelines</h2>
            <ul className="wfu-rules">
              {rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h2 className="wfu-h">How it works</h2>
            <ol className="wfu-steps">
              <li><strong>Pitch</strong> — send your topic and a short summary using the form.</li>
              <li><strong>Write</strong> — once we say yes, share your article (Google Doc or Word).</li>
              <li><strong>Publish</strong> — we publish it with your name, photo and bio.</li>
            </ol>
          </div>

          <div className="wfu-form-wrap">
            <h2 className="wfu-h">Send your pitch</h2>
            <WriteForUsForm />
          </div>
        </div>
      </section>
    </>
  );
}
