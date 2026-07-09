/** Formats a number as Indian rupees, e.g. 1299 -> "₹1,299". */
export function formatCurrency(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
