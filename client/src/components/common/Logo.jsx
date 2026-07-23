import { cn } from "../../utils/cn";

const Logo = ({ className, dark = false }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-gold-300 via-gold-500 to-gold-600 shadow-inner">
      <span className="font-display text-sm font-bold text-ink-950">G</span>
    </div>
    <span
      className={cn(
        "font-display text-lg font-semibold tracking-tight",
        dark ? "text-white" : "text-ink-950"
      )}
    >
      GoldVest
    </span>
  </div>
);

export default Logo;
