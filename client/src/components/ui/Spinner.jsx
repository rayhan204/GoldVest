import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const Spinner = ({ className }) => (
  <Loader2 className={cn("size-5 animate-spin text-gold-500", className)} />
);

export const PageLoader = ({ label = "Memuat data..." }) => (
  <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 text-ink-600">
    <Spinner className="size-8" />
    <p className="text-sm">{label}</p>
  </div>
);

export default Spinner;
