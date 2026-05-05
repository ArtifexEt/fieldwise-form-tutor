export function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatDate(isoValue, locale = "pl-PL") {
  if (!isoValue) {
    return locale === "pl-PL" ? "pustą wartość" : "an empty value";
  }

  const date = new Date(`${isoValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return escapeHtml(isoValue);
  }

  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
