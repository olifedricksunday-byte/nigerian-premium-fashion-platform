/** Format a NGN amount using the Nigerian locale. */
export function formatNaira(amount: number | string | null | undefined): string {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount ?? 0
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? (value as number) : 0)
}

export function discountPercent(price: number, compareAt?: number | null): number | null {
  if (!compareAt || compareAt <= price) return null
  return Math.round(((compareAt - price) / compareAt) * 100)
}
