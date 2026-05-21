"use client";

import { useEffect, useState } from "react";

// Cycles through the consultation photos, one every 4 seconds.
const IMAGES = ["/consult.jpg", "/consult1.jpg", "/consult2.jpg"];

export default function ConsultSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line bg-background">
      {IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="A free consultation with Dr. Trevino"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
