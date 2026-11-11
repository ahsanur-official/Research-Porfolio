import { useEffect } from "react";

export function useGlobalScrollAnimation(dependency?: any) {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 240px 0px", // Generous pre-render threshold for buttery 120fps scrolling
      }
    );

    // Target content cards and interactive items
    const elementsToAnimate = document.querySelectorAll<HTMLElement>(
      "section, article, .interactive-card"
    );

    elementsToAnimate.forEach((el, index) => {
      // If already within or close to initial viewport, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.25 && rect.bottom > -50) {
        el.classList.add("reveal-on-scroll", "is-revealed");
      } else {
        el.classList.add("reveal-on-scroll");
        if (el.classList.contains("interactive-card") || el.tagName === "ARTICLE") {
          const delayClass = `reveal-delay-${(index % 4) + 1}`;
          el.classList.add(delayClass);
        }
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
