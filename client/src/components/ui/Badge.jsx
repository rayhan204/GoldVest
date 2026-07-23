import { cn } from "../../utils/cn";

const variants = {
  neutral: "bg-ink-950/6 text-ink-800",
  gold: "bg-gold-100 text-gold-600",
  profit: "bg-profit-500/10 text-profit-600",
  loss: "bg-loss-500/10 text-loss-600",
  pending: "bg-amber-500/10 text-amber-600",
};

const Badge = ({ children, variant = "neutral", className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
      variants[variant],
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
