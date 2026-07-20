import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from "recharts";

import Card from "../ui/Card";

const data = [
    { day: "Mon", price: 1900 },
    { day: "Tue", price: 1920 },
    { day: "Wed", price: 1915 },
    { day: "Thu", price: 1940 },
    { day: "Fri", price: 1975 },
];

const GoldChart = () => {
    return (
        <Card>

            <h2 className="mb-6 text-xl font-bold">

                Gold Price

            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <XAxis dataKey="day" />

                    <Tooltip />

                    <Line
                        dataKey="price"
                        stroke="#EAB308"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </Card>
    );
};

export default GoldChart;