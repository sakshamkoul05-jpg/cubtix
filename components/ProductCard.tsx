import Link from "next/link";
import Photo from "./Photo";
import { AddButton } from "./Enquiry";
import { WaIcon } from "./Icons";
import { categoryBySlug, formatPrice, productPhoto, type Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const cat = categoryBySlug(product.category)!;
  return (
    <article className="pcard" style={{ "--c": cat.color } as React.CSSProperties}>
      <div className="pcard-media">
        <Photo src={productPhoto(product)} alt={product.name} tint={cat.tint} label={cat.name} />
        {product.isNew && <span className="tag-new">New</span>}
      </div>
      <div className="pcard-body">
        <Link href={`/categories/${cat.slug}`} className="pcard-cat">{cat.name}</Link>
        <h3 className="pcard-name">{product.name}</h3>
        {product.note && <p className="pcard-note">{product.note}</p>}
        <p className="pcard-price">
          {formatPrice(product.price) ? <><strong>{formatPrice(product.price)}</strong><span className="pcard-bulk">Bulk price on request</span></> : "Price on request"}
        </p>
        <div className="pcard-actions">
          <AddButton id={product.id} />
          <a
            className="pcard-wa"
            href={whatsappLink(`Hi Cubtix! Is "${product.name}"${formatPrice(product.price) ? ` (${formatPrice(product.price)})` : ""} available? Please share photos.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${product.name} on WhatsApp`}
            title="Ask on WhatsApp"
          >
            <WaIcon size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
