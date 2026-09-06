import { useInView } from "../hooks/useInView.js";

// Fades/rises an element in the first time it scrolls into view. Plain
// CSS transitions driven by a class toggle - no animation library.
function Reveal({ children, className = "", delay = 0, as: As = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <As
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </As>
  );
}

export default Reveal;
