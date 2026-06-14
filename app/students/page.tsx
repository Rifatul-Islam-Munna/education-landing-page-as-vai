import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { Search } from "lucide-react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { StudentCard } from "./student-card";
import { VideoModal } from "./video-modal";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent, getStudentsPage } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("students");
}

function qrTarget(studentId: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base}/students?studentId=${encodeURIComponent(studentId)}`;
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ studentId?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || "1") || 1;
  const studentId = params.studentId || "";
  const [content, result] = await Promise.all([
    getSiteContent(),
    getStudentsPage({ page, studentId }),
  ]);

  const pageLinks = Array.from({ length: result.totalPages }, (_, index) => index + 1);

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="relative min-h-[360px] overflow-hidden">
        <Image
          src={content.studentPage.heroImage}
          alt={content.studentPage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto flex min-h-[360px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.studentPage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.studentPage.breadcrumb}</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1110px,calc(100%_-_48px))] grid-cols-1 gap-8 py-24 md:grid-cols-[310px_1fr]">
        <aside className="grid content-start gap-8">
          <form className="bg-[#f5f6f8] p-7" action="/students">
            <h2 className="text-2xl font-black text-[#061338]">{content.studentPage.searchTitle}</h2>
            <span className="mt-3 block h-[2px] w-16 bg-[#c81422]" />
            <label className="mt-7 block">
              <span className="sr-only">{content.studentPage.searchPlaceholder}</span>
              <input
                className="h-14 w-full border border-[#dce3ee] bg-white px-4 font-bold text-[#061338] outline-none"
                defaultValue={studentId}
                name="studentId"
                placeholder={content.studentPage.searchPlaceholder}
              />
            </label>
            <button className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 bg-[#c81422] text-sm font-black uppercase text-white" type="submit">
              <Search size={18} />
              Search Now
            </button>
          </form>

          <VideoModal title={content.studentPage.searchTitle} url={content.studentPage.videoUrl} />
        </aside>

        <div>
          {result.students.length ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {await Promise.all(
                result.students.map(async (student) => {
                  const qr = await QRCode.toDataURL(qrTarget(student.id), {
                    margin: 1,
                    width: 220,
                    color: { dark: "#061338", light: "#ffffff" },
                  });
                  return <StudentCard key={student.id} student={student} qrDataUrl={qr} />;
                }),
              )}
            </div>
          ) : (
            <div className="border border-[#dce3ee] p-12 text-center text-xl font-black text-[#061338]">
              {content.studentPage.emptyText}
            </div>
          )}

          <div className="mt-14 flex justify-center gap-4">
            {pageLinks.map((pageNumber) => {
              const href = `/students?${new URLSearchParams({
                ...(studentId ? { studentId } : {}),
                page: String(pageNumber),
              }).toString()}`;

              return (
                <Link
                  className={`grid h-12 w-12 place-items-center rounded-full text-sm font-black no-underline ${
                    pageNumber === result.page
                      ? "bg-[#c81422] text-white"
                      : "bg-[#f0f2f5] text-[#061338]"
                  }`}
                  href={href}
                  key={pageNumber}
                >
                  {String(pageNumber).padStart(2, "0")}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
