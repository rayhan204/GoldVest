import { cn } from "../../utils/cn";
import Card from "../ui/Card";

const StatCard = ({
    label,
    value,
    icon: Icon,
    hint,
    tone = "default",
    className,
}) => {

    const toneClasses = {
        default: "text-slate-900",
        profit: "text-green-600",
        loss: "text-red-600",
        gold: "text-yellow-600",
    };

    return (
        <Card
            className={cn(
                "p-4",
                className
            )}
        >

            <div className="flex items-center justify-between">

                <p className="text-xs font-medium text-slate-500">

                    {label}

                </p>

                {Icon && (

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">

                        <Icon size={18} />

                    </div>

                )}

            </div>

            <h2
                className={cn(
                    "mt-3 text-2xl font-bold",
                    toneClasses[tone]
                )}
            >

                {value}

            </h2>

            {hint && (

                <p className="mt-1 text-xs text-slate-500">

                    {hint}

                </p>

            )}

        </Card>
    );
};

export default StatCard;