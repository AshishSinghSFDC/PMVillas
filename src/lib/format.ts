export function formatPrice(amount?: number | null, currency?: string | null) {
  if (amount === null || amount === undefined) return "";
  if (currency) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      // ignore and fall through to generic format
    }
  }
  return Number(amount).toLocaleString();
}

export function formatAreaSqFt(area?: number | null) {
  if (area === null || area === undefined) return "";
  return `${Number(area).toLocaleString()} sq ft`;
}
