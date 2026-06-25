"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, QrCode, X } from "lucide-react";
import type { Student } from "@/lib/site";

export function StudentCard({
  student,
  qrDataUrl,
}: {
  student: Student;
  qrDataUrl: string;
}) {
  const [open, setOpen] = useState(false);

  function downloadQR() {
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${student.name.replace(/\s+/g, "_")}_QR.png`;
    a.click();
  }

  return (
    <>
      <article className="border border-[#dce3ee] bg-white">
        <div className="relative aspect-[7/10] overflow-hidden">
          <Image
            src={student.image}
            alt={student.name}
            fill
            sizes="(max-width: 768px) calc(100vw - 48px), 360px"
            className="object-cover"
          />
        </div>
        <div className="p-7 text-center">
          <h2 className="text-xl font-black text-[#061338]">{student.name}</h2>
          <p className="mt-2 text-sm font-black uppercase text-[#061338]">
            Dep : <span className="text-[#667085]">{student.department}</span>
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mx-auto mt-4 grid size-9 cursor-pointer place-items-center rounded-md border border-[#dce3ee] text-[#667085] hover:border-[#c81422] hover:text-[#c81422] transition-colors"
            aria-label="Show QR code"
          >
            <QrCode size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 border-t border-[#dce3ee] px-5 py-5 text-xs font-black uppercase text-[#061338]">
          <span>ID: {student.id}</span>
          <span className="text-right">Class: {student.className}</span>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative rounded-xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -right-3 -top-3 grid size-8 cursor-pointer place-items-center rounded-full bg-[#c81422] text-white"
            >
              <X size={16} />
            </button>
            <Image src={qrDataUrl} alt={`${student.name} QR code`} width={220} height={220} />
            <p className="mt-4 text-center text-sm font-bold text-[#061338]">{student.name}</p>
            <button
              type="button"
              onClick={downloadQR}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#c81422] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#a0101b] transition-colors"
            >
              <Download size={16} />
              Download QR
            </button>
          </div>
        </div>
      )}
    </>
  );
}
