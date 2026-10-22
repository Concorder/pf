import React from "react";

const ELEMENTS = {
  fire: { label: "Fire", color: "#ff825d", path: "M12 2c2 5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-7 0 3 1 4 2 4 2-2 2-5 1-8Z" },
  ice: { label: "Ice", color: "#73d9ff", path: "m12 2-7 10 7 10 7-10-7-10Zm0 0v20M5 12h14M8 8l8 8M16 8l-8 8" },
  wind: { label: "Earth", color: "#9cde76", path: "M20 4C8 2 3 9 5 15c2 6 12 5 15-11ZM5 20 17 7M9 16l-1-5M12 13h5" },
  light: { label: "Light", color: "#ffe28c", path: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" },
  dark: { label: "Dark", color: "#c69cff", path: "M16 3a9 9 0 1 0 5 14A9 9 0 0 1 16 3Z" },
};
export default function ElementIcon({ element, className = "" }) {
  const info = ELEMENTS[element] || ELEMENTS[element === "earth" ? "wind" : "ice"];
  return (
    <span className={`element-icon ${className}`} role="img" aria-label={`${info.label} element`} title={`${info.label} element`} style={{ color: info.color }}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d={info.path} /></svg>
    </span>
  );
}
