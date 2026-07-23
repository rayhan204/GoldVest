import { Menu, Coins } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLatestGoldPrice } from "../../api/goldPrice.api";
import { formatCurrency } from "../../utils/format";

const Topbar = ({ title, onMenuClick }) => {
  const { data } = useQuery({
    queryKey: ["gold-price", "latest"],
    queryFn: getLatestGoldPrice,
    refetchInterval: 60_000,
  });

  const price = data?.data;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-950/8 bg-cream-50/90 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-800 hover:bg-ink-950/5 lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="font-display text-xl font-semibold text-ink-950 sm:text-2xl">
          {title}
        </h1>
      </div>

      {price && (
        <div className="hidden items-center gap-2 rounded-full border border-gold-500/30 bg-gold-100/60 px-3.5 py-1.5 sm:flex">
          <Coins className="size-3.5 text-gold-600" />
          <span className="text-xs text-ink-600">Jual</span>
          <span className="font-mono-num text-xs font-semibold text-ink-950">
            {formatCurrency(price.sellPrice)}
          </span>
          <span className="mx-1 h-3 w-px bg-ink-950/15" />
          <span className="text-xs text-ink-600">Beli</span>
          <span className="font-mono-num text-xs font-semibold text-ink-950">
            {formatCurrency(price.buyPrice)}
          </span>
        </div>
      )}
    </header>
  );
};

export default Topbar;
