import { cn } from "../../utils/cn";

export const Card = ({
    children,
    className,
    bullion = false,
    ...props
}) => (
    <div
        className={cn(
            "rounded-xl border border-slate-200 bg-white shadow-sm",
            bullion && "bullion-edge overflow-hidden",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export const CardHeader = ({
    children,
    className,
}) => (
    <div
        className={cn(
            "flex items-center justify-between px-5 pt-4",
            className
        )}
    >
        {children}
    </div>
);

export const CardBody = ({
    children,
    className,
}) => (
    <div
        className={cn(
            "p-4",
            className
        )}
    >
        {children}
    </div>
);

export default Card;