import Decimal from "decimal.js";

export const formatCurrency = (amount: number | string | Decimal): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount instanceof Decimal ? amount.toNumber() : amount;
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
};