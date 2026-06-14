import Image from "next/image";
import { MessageCircle, Star, Users } from "lucide-react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("courses");
}

export default async function CoursesPage() {
  const content = await getSiteContent();

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="relative min-h-[380px] overflow-hidden">
        <Image
          src={content.coursePage.heroImage}
          alt={content.coursePage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto flex min-h-[380px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.coursePage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.coursePage.breadcrumb}</p>
        </div>
      </section>

      <section className="mx-auto w-[min(1110px,calc(100%_-_48px))] py-24">
        <p className="mx-auto max-w-2xl text-center text-base font-semibold leading-8 text-[#667085]">
          {content.coursePage.intro}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.coursePage.courses.map((course, index) => (
            <article className="group border border-[#dce3ee] bg-white" key={index}>
              <div className="relative h-56 overflow-hidden border-b-4 border-[#c81422]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute -bottom-8 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-4 border-[#c81422] bg-white text-lg font-black text-[#c81422]">
                  {course.price}
                </span>
              </div>
              <div className="px-7 pb-7 pt-12 text-center">
                <h2 className="text-2xl font-black text-[#061338]">{course.title}</h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#667085]">
                  {course.description}
                </p>
              </div>
              <div className="grid grid-cols-3 border-t border-[#dce3ee] text-xs font-bold text-[#8a93a3]">
                <span className="inline-flex items-center justify-center gap-1 py-4">
                  <Users size={14} />
                  {course.students}
                </span>
                <span className="inline-flex items-center justify-center gap-1 border-x border-[#dce3ee] py-4">
                  <MessageCircle size={14} />
                  {course.comments}
                </span>
                <span className="inline-flex items-center justify-center gap-1 py-4">
                  {course.reviews}
                  <Star className="fill-[#f59e0b] text-[#f59e0b]" size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
