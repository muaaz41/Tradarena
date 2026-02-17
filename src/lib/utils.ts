export const formatCurrency = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);

export const formatPercent = (value: number, maximumFractionDigits = 2) =>
  `${value > 0 ? "+" : ""}${value.toFixed(maximumFractionDigits)}%`;

export const classNames = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

