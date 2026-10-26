const number = new Intl.NumberFormat("en-US", {useGrouping: false, maximumFractionDigits: 4});

// CeciliaBot stores percentages in fractional rows formatted with ×1000;
// Fighting Spirit, turn counts, etc. use integer rows without a percent sign.
export function formatSkillDescription(text, rows = [], {level = Infinity, overrides = {}} = {}) {
  let variable = 0;
  return String(text || "").replace(/\{\{\s*variable\s*\}\}/g, () => {
    const index = variable++;
    if (Object.hasOwn(overrides, index)) return String(overrides[index]);
    const row = rows?.[index];
    if (!Array.isArray(row) || !row.length || (level !== Infinity && (!Number.isInteger(level) || level < 0)))
      return "value unavailable";
    const selected = row.slice(0, level + 1);
    if (!selected.some(v => Number.isFinite(v)) || selected.some(v => v !== null && !Number.isFinite(v)))
      return "value unavailable";
    const total = selected.reduce((sum, value) => sum + (value || 0), 0);
    const percentage = row.some(value => Number.isFinite(value) && !Number.isInteger(value));
    return number.format(percentage ? total * 1000 : total) + (percentage ? "%" : "");
  });
}
