import React, { useState } from "react";
import { asset } from "../context.js";
import { ASSETS } from "../data/cecilia.js";

const ELEMENTS = {
  fire: "Fire",
  ice: "Ice",
  wind: "Earth",
  light: "Light",
  dark: "Dark",
};
export default function ElementIcon({ element, className = "" }) {
  const [failed, setFailed] = useState(null);
  const key = element === "earth" ? "wind" : element;
  const label = ELEMENTS[key] || "Unknown";
  const filename = `cm_icon_prom${key}.png`;
  return (
    <span className={`element-icon ${className}`} role="img" aria-label={`${label} element`} title={`${label} element`}>
      <img
        src={failed === key ? asset(`data/element-icons/${filename}`) : `${ASSETS}/img/${filename}`}
        alt=""
        onError={() => setFailed(key)}
      />
    </span>
  );
}
