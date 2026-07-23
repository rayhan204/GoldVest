import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-ink-950 text-gold-300 hover:bg-ink-900 focus-visible:ring-ink-700 border border-ink-950",
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 focus-visible:ring-gold-600 border border-gold-600 font-semibold",
  outline:
    "bg-transparent text-ink-950 border border-ink-950/20 hover:bg-ink-950/5 focus-visible:ring-ink-700",
  ghost:
    "bg-transparent text-ink-800 hover:bg-ink-950/5 focus-visible:ring-ink-700 border border-transparent",
  danger:
    "bg-loss-600 text-white hover:bg-loss-500 focus-visible:ring-loss-600 border border-loss-600",
};

const sizes = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading = false,
  disabled,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
