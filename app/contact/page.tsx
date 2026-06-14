import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { SocialLinks } from "../social-links";
import { submitContactAction } from "./actions";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("contact");
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
  const content = await getSiteContent();

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="relative min-h-[380px] overflow-hidden">
        <Image
          src={content.contactPage.heroImage}
          alt={content.contactPage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto flex min-h-[380px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.contactPage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.contactPage.breadcrumb}</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(960px,calc(100%_-_48px))] grid-cols-1 gap-8 py-24 lg:grid-cols-[1fr_310px]">
        <form className="grid gap-5" action={submitContactAction}>
          <div className="grid grid-cols-[auto_1fr] items-center gap-8">
            <h2 className="text-3xl font-black text-[#061338]">{content.contactPage.formTitle}</h2>
            <span className="h-1 bg-[#c81422]" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 font-bold text-[#061338] outline-none" name="name" placeholder="Enter Your Name" required />
            <input className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 font-bold text-[#061338] outline-none" name="email" type="email" placeholder="Enter Your Email" required />
            <input className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 font-bold text-[#061338] outline-none" name="phone" placeholder="Enter Phone Number" />
            <input className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 font-bold text-[#061338] outline-none" name="subject" placeholder="Enter Subject" />
          </div>
          <textarea className="min-h-40 border border-[#dce3ee] bg-[#f5f6f8] p-4 font-bold text-[#061338] outline-none" name="message" placeholder="Write Your Message" required />
          {params.sent === "1" ? (
            <p className="font-bold text-[#0b7a44]">Message sent.</p>
          ) : null}
          {params.error === "1" ? (
            <p className="font-bold text-[#c81422]">Message not sent. Check required fields and database config.</p>
          ) : null}
          <div className="text-center">
            <button className="bg-[#c81422] px-8 py-4 text-xs font-black uppercase text-white" type="submit">
              Send Message
            </button>
          </div>
        </form>

        <aside className="bg-[#c81422] p-7 text-white">
          <h2 className="text-2xl font-black leading-tight">{content.contactPage.infoTitle}</h2>
          <div className="mt-7 grid gap-4 text-sm font-bold leading-6">
            <p className="flex gap-2">
              <MapPin className="mt-1 flex-none" size={18} />
              {content.contactPage.address}
            </p>
            <a className="flex gap-2 text-white no-underline" href={`tel:${content.contactPage.phone}`}>
              <Phone className="mt-1 flex-none" size={18} />
              {content.contactPage.phone}
            </a>
            <a className="flex gap-2 text-white no-underline" href={`mailto:${content.contactPage.email}`}>
              <Mail className="mt-1 flex-none" size={18} />
              {content.contactPage.email}
            </a>
          </div>
          <SocialLinks
            content={content}
            className="mt-8 flex flex-wrap gap-3"
            linkClassName="grid h-10 w-10 place-items-center rounded-full border border-white text-white transition hover:bg-white hover:text-[#c81422]"
          />
        </aside>

        <iframe
          className="min-h-[360px] w-full border-0 lg:col-span-2"
          src={content.contactPage.mapEmbedUrl}
          loading="lazy"
          title="Academy location map"
        />
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
