import Image from "next/image";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { getSeoMetadata } from "@/lib/seo";
import { getResultDepartments, getSiteContent, searchResultRecords } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getSeoMetadata("result");
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    department?: string;
    year?: string;
    idNumber?: string;
    registrationNumber?: string;
  }>;
}) {
  const params = await searchParams;
  const content = await getSiteContent();
  const departments = getResultDepartments(content);
  const years = Array.from(new Set(content.resultPage.records.map((record) => record.year).filter(Boolean)));
  const result = searchResultRecords({
    content,
    department: params.department,
    year: params.year,
    idNumber: params.idNumber,
    registrationNumber: params.registrationNumber,
  });

  return (
    <main className="site-page bg-white">
      <SiteHeader content={content} />

      <section className="relative min-h-[380px] overflow-hidden">
        <Image
          src={content.resultPage.heroImage}
          alt={content.resultPage.title}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061338]/55" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white [clip-path:polygon(0_35%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto flex min-h-[380px] w-[min(1110px,calc(100%_-_48px))] flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-black md:text-7xl">{content.resultPage.title}</h1>
          <p className="mt-5 text-base font-bold">{content.resultPage.breadcrumb}</p>
        </div>
      </section>

      <section className="mx-auto w-[min(1110px,calc(100%_-_48px))] py-24 text-center">
        <h2 className="text-5xl font-black text-[#061338]">{content.resultPage.searchTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-[#667085]">
          {content.resultPage.intro}
        </p>

        <form className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-4" action="/result">
          <select className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 text-sm font-bold text-[#667085] outline-none" name="department" defaultValue={params.department || ""}>
            <option value="">{content.resultPage.departmentPlaceholder}</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 text-sm font-bold text-[#667085] outline-none" name="year" defaultValue={params.year || ""}>
            <option value="">{content.resultPage.yearPlaceholder}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <input
            className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 text-sm font-bold text-[#667085] outline-none"
            defaultValue={params.idNumber || ""}
            name="idNumber"
            placeholder={content.resultPage.idPlaceholder}
          />
          <input
            className="h-14 border border-[#dce3ee] bg-[#f5f6f8] px-4 text-sm font-bold text-[#667085] outline-none"
            defaultValue={params.registrationNumber || ""}
            name="registrationNumber"
            placeholder={content.resultPage.registrationPlaceholder}
          />
          <div className="md:col-span-4">
            <button className="bg-[#c81422] px-8 py-4 text-xs font-black uppercase text-white" type="submit">
              {content.resultPage.buttonText}
            </button>
          </div>
        </form>

        <div className="mx-auto my-20 h-px max-w-4xl bg-[#dce3ee]" />

        <h2 className="text-5xl font-black text-[#061338]">{content.resultPage.resultTitle}</h2>
        {result.searched ? (
          result.records.length ? (
            <div className="mx-auto mt-10 grid max-w-4xl gap-10">
              {result.records.map((record, recordIndex) => (
                <div className="overflow-x-auto" key={recordIndex}>
                  <div className="mb-4 grid grid-cols-1 gap-3 text-left text-sm font-black text-[#061338] md:grid-cols-4">
                    <span>Department: {record.department}</span>
                    <span>Year: {record.year}</span>
                    <span>ID: {record.idNumber}</span>
                    <span>Reg: {record.registrationNumber}</span>
                  </div>
                  <table className="w-full min-w-[680px] border-collapse border border-[#dce3ee] text-sm font-bold text-[#061338]">
                    <thead>
                      <tr className="bg-white">
                        <th className="border border-[#dce3ee] px-6 py-4">Course Title</th>
                        <th className="border border-[#dce3ee] px-6 py-4">Grade</th>
                        <th className="border border-[#dce3ee] px-6 py-4">Credits</th>
                        <th className="border border-[#dce3ee] px-6 py-4">Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.rows.map((row, index) => (
                        <tr className={index % 2 === 0 ? "bg-[#f5f6f8]" : "bg-white"} key={index}>
                          <td className="border border-[#dce3ee] px-6 py-4">{row.courseTitle}</td>
                          <td className="border border-[#dce3ee] px-6 py-4">{row.grade}</td>
                          <td className="border border-[#dce3ee] px-6 py-4">{row.credits}</td>
                          <td className="border border-[#dce3ee] px-6 py-4">{row.term}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p className="mx-auto mt-10 max-w-2xl border border-[#dce3ee] p-8 text-lg font-black text-[#061338]">
              No result found.
            </p>
          )
        ) : (
          <p className="mx-auto mt-10 max-w-2xl border border-[#dce3ee] p-8 text-lg font-black text-[#061338]">
            Search with department, year, ID number, and registration number.
          </p>
        )}
      </section>

      <SiteFooter content={content} />
    </main>
  );
}
