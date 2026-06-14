import type React from "react";
import type { SiteContent } from "@/lib/site";

type SocialKey = "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";

const icons: Record<SocialKey, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M14 8.6V6.8c0-.8.2-1.2 1.3-1.2h1.6V2.7c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v1.8H7.5v3.2h2.8v8.7H14v-8.7h2.7l.4-3.2H14Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.8 10.6 20.8 2h-1.7l-6 7.4L8.2 2H2.6l7.4 11.1L2.6 22h1.7l6.5-7.8 5.1 7.8h5.6l-7.7-11.4Zm-2.3 2.7-.7-1.1L4.8 3.3h2.6l4.8 7.2.7 1.1 6.3 9.2h-2.6l-5.1-7.5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.9 8.9H3.3V21h3.6V8.9ZM5.1 3C4 3 3.2 3.8 3.2 4.9s.8 1.9 1.9 1.9S7 6 7 4.9 6.2 3 5.1 3Zm15.7 11.1c0-3.2-1.7-5.2-4.5-5.2-1.8 0-2.9 1-3.3 1.7V8.9H9.5V21h3.6v-6.7c0-1.8.9-2.6 2.1-2.6 1.2 0 2 .8 2 2.7V21h3.6v-6.9Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm0 2A3.3 3.3 0 0 0 4 7.3v9.4A3.3 3.3 0 0 0 7.3 20h9.4a3.3 3.3 0 0 0 3.3-3.3V7.3A3.3 3.3 0 0 0 16.7 4H7.3Zm4.7 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5-2.5a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.7Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6ZM10.1 14.6V8.5l5.7 3-5.7 3.1Z" />
    </svg>
  ),
};

const labels: Record<SocialKey, string> = {
  facebook: "Facebook",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function SocialLinks({
  content,
  className = "flex gap-3",
  linkClassName = "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#c81422]",
}: {
  content: SiteContent;
  className?: string;
  linkClassName?: string;
}) {
  const keys: SocialKey[] = ["facebook", "twitter", "linkedin", "instagram", "youtube"];

  return (
    <div className={className}>
      {keys.map((key) => (
        <a className={linkClassName} href={content.footer[key] || "#"} aria-label={labels[key]} key={key}>
          {icons[key]}
        </a>
      ))}
    </div>
  );
}
