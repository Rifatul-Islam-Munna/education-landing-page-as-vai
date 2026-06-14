import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { getSeoMetadata } from "@/lib/seo";
import { getSiteContent } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("notice");
}

const monthIndex: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function noticeTime(notice: { day: string; month: string; year?: string }) {
  const year = Number(notice.year) || 0;
  const month = monthIndex[notice.month.toLowerCase()] ?? 0;
  const day = Number(notice.day) || 1;
  return new Date(year, month, day).getTime();
}

export default async function NoticePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const content = await getSiteContent();
  const pageSize = 4;
  const sortedNotices = [...content.noticePage.notices].sort((a, b) => noticeTime(b) - noticeTime(a));
  const page = Math.max(1, Number(params.page || "1") || 1);
  const totalPages = Math.max(1, Math.ceil(sortedNotices.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const notices = sortedNotices.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="relative min-h-[380px] overflow-hidden">
        <Image
          src={content.noticePage.heroImage}
          alt={content.noticePage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto flex min-h-[380px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.noticePage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.noticePage.breadcrumb}</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(960px,calc(100%_-_48px))] gap-10 py-24">
        {notices.map((notice, index) => (
          <article
            className="grid grid-cols-1 items-center gap-8 border border-[#dce3ee] bg-white p-7 md:grid-cols-[110px_1fr_150px]"
            key={index}
          >
            <div className="grid h-28 w-28 place-items-center border-2 border-[#c81422] text-center text-[#c81422]">
              <span>
                <strong className="block text-5xl font-black leading-none">{notice.day}</strong>
                <small className="mt-2 block text-base font-black">{notice.month}</small>
                <small className="block text-xs font-black">{notice.year}</small>
              </span>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#667085]">
                <FileText size={15} />
                {notice.category}
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#061338]">{notice.title}</h2>
            </div>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 border-2 border-[#c81422] px-5 text-xs font-black uppercase text-[#c81422] no-underline transition hover:bg-[#c81422] hover:text-white"
              href={notice.pdf || "#"}
              download={notice.pdf && notice.pdf !== "#" ? "" : undefined}
            >
              <Download size={16} />
              Download
            </a>
          </article>
        ))}

        {totalPages > 1 ? (
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Link
                className={`grid h-12 w-12 place-items-center rounded-full text-sm font-black no-underline ${
                  pageNumber === safePage
                    ? "bg-[#c81422] text-white"
                    : "bg-[#f0f2f5] text-[#061338]"
                }`}
                href={`/notice?page=${pageNumber}`}
                key={pageNumber}
              >
                {String(pageNumber).padStart(2, "0")}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
