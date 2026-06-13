import Link from "next/link";
import { FileText, MapPin, Menu, Phone, Search } from "lucide-react";
import type { SiteContent } from "@/lib/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "#" },
  { label: "Students", href: "/students" },
  { label: "Result", href: "#" },
  { label: "Notice", href: "#" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader({ content }: { content: SiteContent }) {
  return (
    <header className="site-header">
      <div className="header-top">
        <Link className="brand" href="/">
          <span className="brand-mark">{content.logoMark}</span>
          <span>
            <strong>{content.brandName}</strong>
            <small>{content.brandTagline}</small>
          </span>
        </Link>

        <div className="header-info">
          <div className="info-item">
            <MapPin />
            <span>
              <strong>{content.locationLabel}</strong>
              <small>{content.locationText}</small>
            </span>
          </div>
          <div className="info-item">
            <Phone />
            <span>
              <strong>{content.phoneLabel}</strong>
              <small>{content.phoneText}</small>
            </span>
          </div>
          <a className="apply-btn" href="#contact">
            {content.applyText}
            <FileText size={18} />
          </a>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        <div className="nav-links">
          {nav.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-tools">
          <button aria-label="Search">
            <Search size={21} />
          </button>
          <button aria-label="Menu">
            <Menu size={26} />
          </button>
        </div>
      </nav>
    </header>
  );
}
