import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Headphones,
  Mic,
  Music,
  School,
  Users,
} from "lucide-react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { TestimonialSlider } from "../testimonial-slider";
import { WelcomeSlider } from "../welcome-slider";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/site";

export const dynamic = "force-dynamic";

const serviceIcons = [GraduationCap, Users, BookOpen];
const chooseIcons = [Users, Music, Mic, Headphones, BookOpen, School];

export async function generateMetadata() {
  return getSeoMetadata("about");
}

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="about-hero relative min-h-[380px] overflow-hidden">
        <Image
          src={content.aboutPage.heroImage}
          alt={content.aboutPage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="about-hero-copy relative mx-auto flex min-h-[380px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.aboutPage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.aboutPage.breadcrumb}</p>
        </div>
      </section>

      <section className="about-service-grid mx-auto grid w-[min(1000px,calc(100%_-_48px))] grid-cols-1 gap-7 py-24 md:grid-cols-3">
        {content.featureCards.map((card, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          const active = index === 1;
          return (
            <article
              className={`about-service-card border p-12 text-center ${active ? "border-[#c81422] bg-[#c81422] text-white" : "border-[#dce3ee] bg-white text-[#061338]"}`}
              key={index}
            >
              <Icon className={`mx-auto ${active ? "text-white" : "text-[#c81422]"}`} size={68} />
              <h2 className="mt-8 text-2xl font-black">{card.title}</h2>
              <p className={`mt-5 text-base font-semibold leading-8 ${active ? "text-white" : "text-[#667085]"}`}>
                {card.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="about-story mx-auto grid w-[min(1180px,calc(100%_-_48px))] grid-cols-1 items-center gap-12 pb-24 md:grid-cols-2">
        <WelcomeSlider
          images={content.welcome.sliderImages.length ? content.welcome.sliderImages : [content.welcome.image]}
          title={content.welcome.title}
        />
        <div className="about-story-copy">
          <h2 className="text-5xl font-black text-[#061338]">{content.welcome.title}</h2>
          <p className="mt-6 text-base font-semibold leading-8 text-[#667085]">{content.welcome.descriptionOne}</p>
          <div className="mt-5 grid gap-3">
            {content.welcome.features.slice(0, 3).map((feature, index) => (
              <span className="inline-flex items-center gap-3 text-base font-bold text-[#061338]" key={index}>
                <BadgeCheck className="fill-[#c81422] text-[#c81422]" size={20} />
                {feature.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats relative overflow-hidden bg-[#061338] py-20 text-white">
        <Image src={content.university.image} alt={content.university.title} fill sizes="100vw" className="object-cover opacity-20" />
        <div className="relative mx-auto grid w-[min(1000px,calc(100%_-_48px))] grid-cols-2 gap-7 md:grid-cols-4">
          {content.university.stats.map((stat, index) => (
            <div className="about-stat-card border-4 border-white/15 bg-[#061338]/70 p-10 text-center" key={index}>
              <strong className="block text-6xl font-black text-[#c81422]">{stat.value}</strong>
              <span className="mt-4 block text-base font-black">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-choose mx-auto grid w-[min(1180px,calc(100%_-_48px))] grid-cols-1 gap-14 py-24 md:grid-cols-[0.9fr_1.1fr]">
        <div className="about-choose-copy">
          <h2 className="text-5xl font-black text-[#061338]">{content.aboutPage.chooseTitle}</h2>
          <p className="mt-6 text-base font-semibold leading-8 text-[#667085]">{content.university.descriptionOne}</p>
          <p className="mt-6 text-base font-semibold leading-8 text-[#667085]">{content.university.descriptionTwo}</p>
          <Link className="mt-7 inline-block bg-[#c81422] px-5 py-3 text-xs font-black uppercase text-white no-underline" href="#contact">
            {content.aboutPage.chooseButtonText}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.departments.items.map((item, index) => {
            const Icon = chooseIcons[index % chooseIcons.length];
            return (
              <article className="about-choice-item flex gap-4" key={index}>
                <span className="grid h-12 w-12 flex-none place-items-center rounded-full border border-[#c81422] text-[#c81422]">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-black text-[#061338]">{item.title}</h3>
                  <p className="mt-2 text-base font-semibold leading-7 text-[#667085]">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-testimonials bg-[#f5f6f8] py-20">
        <div className="mx-auto w-[min(900px,calc(100%_-_48px))] text-center">
          <h2 className="text-5xl font-black text-[#061338]">{content.testimonials.title}</h2>
          <TestimonialSlider items={content.testimonials.items} variant="single" />
        </div>
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
