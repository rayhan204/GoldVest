import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Wallet,
} from "lucide-react";

import Card from "../ui/Card";

const QuickActions = () => {

    return (

        <Card>

            <h2 className="mb-6 text-xl font-bold">

                Quick Actions

            </h2>

            <div className="grid grid-cols-3 gap-4">

                <button className="rounded-xl bg-yellow-500 p-5 text-white transition hover:scale-105">

                    <ArrowDownToLine className="mx-auto mb-3" />

                    Buy

                </button>

                <button className="rounded-xl bg-blue-500 p-5 text-white transition hover:scale-105">

                    <ArrowUpFromLine className="mx-auto mb-3" />

                    Sell

                </button>

                <button className="rounded-xl bg-emerald-500 p-5 text-white transition hover:scale-105">

                    <Wallet className="mx-auto mb-3" />

                    Top Up

                </button>

            </div>

        </Card>

    );

};

export default QuickActions;