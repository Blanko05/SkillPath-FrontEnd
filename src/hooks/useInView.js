import { useEffect, useRef, useState } from "react";

// Fires once, the first time the ref'd element enters the viewport - used
// to trigger scroll-reveal animations and the stat counter without a
// scroll-animation library.
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
