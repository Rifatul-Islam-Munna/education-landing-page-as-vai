import Link from "next/link";
import type { SiteContent } from "@/lib/site";

export function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer id="contact" className="bg-[#061338] text-white">
      <div className="mx-auto grid w-[min(1110px,calc(100%_-_48px))] grid-cols-1 gap-10 py-20 md:grid-cols-4">
        <div>
          <Link className="inline-flex items-center gap-3 no-underline" href="/">
            <span className="grid h-11 w-12 place-items-center bg-gradient-to-br from-[#0b3a82] to-[#c81422] font-black text-white [clip-path:polygon(50%_0,100%_30%,88%_100%,12%_100%,0_30%)]">
              {content.logoMark}
            </span>
            <span>
              <strong className="block text-2xl leading-none">{content.brandName}</strong>
              <small className="block font-bold uppercase text-[#dbe7ff]">{content.brandTagline}</small>
            </span>
          </Link>
          <p className="mt-8 max-w-60 whitespace-pre-line text-sm font-semibold leading-7 text-[#dbe7ff]">
            {content.footer.address}
          </p>
          <a className="mt-3 block text-sm font-semibold text-white no-underline" href={`mailto:${content.footer.email}`}>
            {content.footer.email}
          </a>
          <a className="mt-6 block text-2xl font-black text-white no-underline" href={`tel:${content.phoneText}`}>
            {content.phoneText}
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-black">Useful Links</h2>
          <ul className="mt-7 grid gap-3 text-sm font-semibold text-[#dbe7ff]">
            {content.footer.links.map((link, index) => (
              <li key={index}>
                <a className="text-inherit no-underline hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-black">Our Services</h2>
          <ul className="mt-7 grid gap-3 text-sm font-semibold text-[#dbe7ff]">
            {content.footer.services.map((service, index) => (
              <li key={index}>
                <a className="text-inherit no-underline hover:text-white" href={service.href}>
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-black">Contact</h2>
          <p className="mt-7 whitespace-pre-line text-sm font-semibold leading-7 text-[#dbe7ff]">
            {content.footer.contactText}
          </p>
          <div className="mt-7 flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" href={content.footer.facebook} aria-label="Facebook">
              f
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" href={content.footer.twitter} aria-label="Twitter">
              x
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" href={content.footer.linkedin} aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex w-[min(1110px,calc(100%_-_48px))] flex-col gap-4 py-6 text-sm font-semibold text-[#dbe7ff] md:flex-row md:items-center md:justify-between">
          <p>{content.footer.copyright}</p>
          <div className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-[#c81422]" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
