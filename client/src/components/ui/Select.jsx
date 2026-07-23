import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

const Select = forwardRef(
  ({ label, error, className, children, id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-ink-800"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-9 text-sm text-ink-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40",
              error
                ? "border-loss-500 focus:border-loss-500"
                : "border-ink-950/15 focus:border-gold-500",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-600" />
        </div>
        {error && <p className="mt-1.5 text-xs text-loss-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
