import { WaIcon } from "./Icons";
import { whatsappLink } from "@/lib/site";

// Always-visible WhatsApp button, fixed bottom-right while scrolling.
export default function FloatingWhatsApp() {
  return (
    <a className="fab-wa" href={whatsappLink("Hi Cubtix! I have a question.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Cubtix on WhatsApp (92167 53108)">
      <WaIcon size={30} />
      <span className="fab-wa-tip">Chat on WhatsApp</span>
    </a>
  );
}
