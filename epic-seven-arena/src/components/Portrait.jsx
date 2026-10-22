import React, { useState } from "react";
import { useLab, asset } from "../context.js";
export default function Portrait({ name, ...props }) {
  const { heroes } = useLab();
  const [failed, setFailed] = useState(null);
  const fallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90"><rect width="90" height="90" fill="#273a34"/><text x="45" y="57" text-anchor="middle" font-size="30" fill="#c4ed9b">${name.slice(0, 1).replace(/[^a-zA-Z]/g, "✧")}</text></svg>`,
    );
  return (
    <img
      {...props}
      alt={name}
      src={
        failed === name
          ? fallback
          : asset(`data/portraits/${heroes[name].code}.png`)
      }
      onError={() => setFailed(name)}
    />
  );
}
