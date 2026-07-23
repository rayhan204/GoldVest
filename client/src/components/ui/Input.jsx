import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

const Input = forwardRef(
  (
    { label, error, icon: Icon, type = "text", className, id, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink-800"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-600" />
          )}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-600/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40",
              Icon && "pl-9.5",
              isPassword && "pr-10",
              error
                ? "border-loss-500 focus:border-loss-500"
                : "border-ink-950/15 focus:border-gold-500",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-ink-950"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-loss-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
