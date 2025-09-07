function formatPriceNGN(price: number): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    console.error("Error formatting price:", error);
    return price.toString();
  }
}
export { formatPriceNGN };
