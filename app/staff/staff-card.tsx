import Image from "next/image";
import type { Staff } from "@/lib/site";

export function StaffCard({ staff }: { staff: Staff }) {
  return (
    <article className="border border-[#dce3ee] bg-white">
      <div className="relative aspect-[7/10] overflow-hidden">
        <Image
          src={staff.image}
          alt={staff.name}
          fill
          sizes="(max-width: 768px) calc(100vw - 48px), 360px"
          className="object-cover"
        />
      </div>
      <div className="p-7 text-center">
        <h2 className="text-xl font-black text-[#061338]">{staff.name}</h2>
        <p className="mt-2 text-sm font-black uppercase text-[#061338]">
          Role : <span className="text-[#667085]">{staff.role}</span>
        </p>
      </div>
    </article>
  );
}
