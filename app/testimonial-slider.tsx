"use client";

import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/site";

export function TestimonialSlider({
  items,
  variant = "cards",
}: {
  items: Testimonial[];
  variant?: "cards" | "single";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % items.length),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (variant === "single") {
    const item = items[active] || items[0];

    return (
      <div className="about-testimonial-slider">
        <span>
          <Quote fill="currentColor" size={28} />
        </span>
        <p>{item.quote}</p>
        <strong>{item.name}</strong>
        <small>{item.role}</small>
        <div>
          {items.map((_, index) => (
            <button
              aria-label={`Show testimonial ${index + 1}`}
              className={index === active ? "active" : ""}
              key={index}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="testimonial-slider">
      <div
        className="testimonial-track"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map((item, index) => (
          <article className="testimonial-card" key={index}>
            <span className="quote-badge">
              <Quote size={24} fill="currentColor" />
            </span>
            <p>{item.quote}</p>
            <strong>
              {item.name}; <small>{item.role}</small>
            </strong>
          </article>
        ))}
      </div>
      <div className="testimonial-dots">
        {items.map((_, index) => (
          <button
            aria-label={`Show testimonial ${index + 1}`}
            className={index === active ? "active" : ""}
            key={index}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
