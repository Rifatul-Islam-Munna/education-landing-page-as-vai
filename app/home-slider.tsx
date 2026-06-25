"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/site";

export function HomeSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const move = (step: number) => {
    setActive((value) => (value + step + slides.length) % slides.length);
  };

  return (
    <section className="hero-slider" aria-label="Homepage slider">
      {slides.map((slide, index) => (
        <article className={index === active ? "hero-slide active" : "hero-slide"} key={index}>
          <div className="hero-image">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
            />
          </div>
          <div className="hero-content">
            <p>{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <span>{slide.subtitle}</span>
          </div>
        </article>
      ))}
      <button className="slider-btn prev" onClick={() => move(-1)} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className="slider-btn next" onClick={() => move(1)} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            className={index === active ? "active" : ""}
            key={index}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
