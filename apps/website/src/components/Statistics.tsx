"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@sevp/ui";

const statsData = [
  { key: "districts" as const, value: 12, suffix: "" },
  { key: "population" as const, value: 7.5, suffix: "M" },
  { key: "projects" as const, value: 150, suffix: "+" },
  { key: "budget" as const, value: 4.2, suffix: "B" },
  { key: "institutions" as const, value: 85, suffix: "+" },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  const display = end >= 1 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span ref={ref} className="text-3xl font-bold text-white sm:text-4xl">
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export default function Statistics() {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-16 z-10 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-8 py-10 shadow-xl sm:py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {statsData.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-zinc-300">
                  {t.home[stat.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
