import Link from "next/link";
import { PageBanner } from "@/components/Sections";

export default function NotFound() {
  return (
    <>
      <PageBanner crumbs={[{ href: "/", label: "Home" }, { label: "Page not found" }]} title="Page not found" text="The page you were looking for isn't here." />
      <section className="section">
        <div className="wrap">
          <Link className="btn btn-primary" href="/catalogue">Go to catalogue</Link>
        </div>
      </section>
    </>
  );
}
