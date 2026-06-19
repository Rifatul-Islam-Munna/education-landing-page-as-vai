"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Students", href: "/students" },
  { label: "Result", href: "/result" },
  { label: "Notice", href: "/notice" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const applyHref = content.applyHref || "/contact";
  const isExternalApply = /^https?:\/\//.test(applyHref);

  return (
    <header className="site-header">
      <div className="header-top">
        <Link className="brand" href="/">
          {content.logoImage && content.logoImage !== "#" ? (
            <span className="brand-logo">
              <Image src={content.logoImage} alt={content.brandName} fill sizes="64px" unoptimized />
            </span>
          ) : (
            <span className="brand-mark">{content.logoMark}</span>
          )}
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
          <Link
            className="apply-btn"
            href={applyHref}
            rel={isExternalApply ? "noreferrer" : undefined}
            target={isExternalApply ? "_blank" : undefined}
          >
            {content.applyText}
            <FileText size={18} />
          </Link>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        <button
          aria-expanded={open}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
          <span>Menu</span>
        </button>
        <div className={open ? "nav-links open" : "nav-links"}>
          {nav.map((item) => (
            <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
