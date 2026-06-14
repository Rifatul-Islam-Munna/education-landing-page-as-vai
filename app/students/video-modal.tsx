"use client";

import { useMemo, useState } from "react";
import { CirclePlay, X } from "lucide-react";

function youtubeId(url: string) {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

export function VideoModal({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  const id = useMemo(() => youtubeId(url), [url]);
  const thumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";

  if (!id) return null;

  return (
    <>
      <button
        aria-label="Play video"
        className="student-video"
        onClick={() => setOpen(true)}
        type="button"
      >
        <img alt={title} src={thumbnail} />
        <span>
          <CirclePlay size={58} />
        </span>
      </button>

      {open ? (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={title}>
          <button className="video-modal-close" onClick={() => setOpen(false)} type="button" aria-label="Close video">
            <X size={22} />
          </button>
          <div className="video-modal-frame">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              title={title}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
