"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function WelcomeSlider({ images, title }: { images: string[]; title: string }) {
  const clean = images.filter(Boolean);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!clean.length) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % clean.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, [clean.length]);

  if (!clean.length) return null;

  return (
    <div className="welcome-media">
      {clean.map((image, index) => (
        <Image
          alt={title}
          className={index === active ? "welcome-slide active" : "welcome-slide"}
          fill
          key={`${image}-${index}`}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 900px) 100vw, 46vw"
          src={image}
        />
      ))}
      <div className="welcome-slide-dots">
        {clean.map((_, index) => (
          <button
            aria-label={`Show welcome image ${index + 1}`}
            className={index === active ? "active" : ""}
            key={index}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>
      <span className="welcome-slide-count">
        {String(active + 1).padStart(2, "0")} / {String(clean.length).padStart(2, "0")}
      </span>
    </div>
  );
}
