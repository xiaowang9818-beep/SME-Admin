export type StockLevel = "CRITICAL" | "WARNING" | "NORMAL";

export function getStockLevel(quantity: number, safetyStock: number): StockLevel {
  if (safetyStock <= 0) return "NORMAL";
  if (quantity <= 0) return "CRITICAL";
  if (quantity < safetyStock * 0.5) return "CRITICAL";
  if (quantity < safetyStock) return "WARNING";
  return "NORMAL";
}

export function getStockLevelLabel(level: StockLevel) {
  return {
    CRITICAL: "严重不足",
    WARNING: "低库存",
    NORMAL: "正常",
  }[level];
}

export function getStockLevelColor(level: StockLevel) {
  return {
    CRITICAL: "bg-rose-100 text-rose-700",
    WARNING: "bg-amber-100 text-amber-700",
    NORMAL: "bg-emerald-100 text-emerald-700",
  }[level];
}
