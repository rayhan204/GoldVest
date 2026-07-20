import Card from "./Card";

const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "bg-yellow-500",
}) => {
    return (
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">

                        {value}

                    </h2>

                </div>

                <div
                    className={`${color} flex h-14 w-14 items-center justify-center rounded-2xl`}
                >
                    <Icon
                        size={28}
                        className="text-white"
                    />
                </div>

            </div>
        </Card>
    );
};

export default StatCard;