import Image from "next/image";
import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Code2,
  FlaskConical,
  School,
  Sparkles,
} from "lucide-react";
import { HomeSlider } from "./home-slider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TestimonialSlider } from "./testimonial-slider";
import { VideoModal } from "./students/video-modal";
import { WelcomeSlider } from "./welcome-slider";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/site";

export const dynamic = "force-dynamic";

const deptIcons = [Sparkles, BookOpenCheck, Code2, School, BriefcaseBusiness, FlaskConical];

export async function generateMetadata() {
  return getSeoMetadata("home");
}

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="site-page">
      <SiteHeader content={content} />

      <HomeSlider slides={content.heroSlides} />

      <section className="feature-grid" aria-label="Academy highlights">
        {content.featureCards.map((card, index) => (
          <article className={`feature-card ${card.tone}`} key={index}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div className="feature-overlay" />
            <div className="feature-copy">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="welcome-section" id="about">
        <WelcomeSlider
          images={content.welcome.sliderImages.length ? content.welcome.sliderImages : [content.welcome.image]}
          title={content.welcome.title}
        />
        <div className="welcome-copy">
          <h2>{content.welcome.title}</h2>
          <p>{content.welcome.descriptionOne}</p>
          <p>{content.welcome.descriptionTwo}</p>
          <div className="welcome-list">
            {content.welcome.features.map((feature, index) => (
              <span key={index}>
                <BadgeCheck size={18} />
                {feature.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="departments-section">
        <div className="section-title">
          <p>{content.departments.eyebrow}</p>
          <h2>{content.departments.title}</h2>
        </div>
        <div className="department-grid">
          {content.departments.items.map((department, index) => {
            const Icon = deptIcons[index % deptIcons.length];
            return (
              <article className="department-card" key={index}>
                <Icon size={54} />
                <h3>{department.title}</h3>
                <p>{department.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="university-section">
        <div className="university-inner">
          <div className="university-media">
            <VideoModal title={content.university.title} url={content.university.videoUrl} />
          </div>
          <div className="university-copy">
            <h2>{content.university.title}</h2>
            <p>{content.university.descriptionOne}</p>
            <p>{content.university.descriptionTwo}</p>
            <p>{content.university.descriptionThree}</p>
          </div>
          <div className="stats-grid">
            {content.university.stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-title">
          <p>{content.testimonials.eyebrow}</p>
          <h2>{content.testimonials.title}</h2>
        </div>
        <TestimonialSlider items={content.testimonials.items} />
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
