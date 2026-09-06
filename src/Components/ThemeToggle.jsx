import { useState } from "react";
import { Button } from "react-bootstrap";
import { getCurrentTheme, applyTheme } from "../utils/theme.js";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 1v1.4M8 13.6V15M15 8h-1.4M2.4 8H1M12.7 3.3l-1 1M4.3 11.7l-1 1M12.7 12.7l-1-1M4.3 4.3l-1-1" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14 9.7A6.2 6.2 0 1 1 6.3 2a5 5 0 0 0 7.7 7.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeToggle() {
  // Reflects the *effective* theme (explicit choice, or the OS setting if
  // nothing's been chosen yet) but only writes to localStorage/data-theme
  // once the user actually clicks - until then the page keeps following
  // the OS setting live, same as before this toggle existed.
  const [theme, setTheme] = useState(() => getCurrentTheme());

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <Button
      variant="outline-dark"
      size="sm"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="d-inline-flex align-items-center justify-content-center"
      style={{ width: "2.1rem", height: "2.1rem", padding: 0 }}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export default ThemeToggle;
