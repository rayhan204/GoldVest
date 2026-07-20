import {
    Wallet,
    Gem,
    Coins,
    Landmark,
} from "lucide-react";

import StatCard from "../ui/StatCard";

const DashboardStats = ({ data }) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Total Wealth"
                value={`Rp ${Number(
                    data.totalWealth
                ).toLocaleString("id-ID")}`}
                icon={Landmark}
            />

            <StatCard
                title="Wallet Balance"
                value={`Rp ${Number(
                    data.walletBalance
                ).toLocaleString("id-ID")}`}
                icon={Wallet}
            />

            <StatCard
                title="Gold Owned"
                value={`${data.goldOwned} gram`}
                icon={Gem}
            />

            <StatCard
                title="Asset Value"
                value={`Rp ${Number(
                    data.assetValue
                ).toLocaleString("id-ID")}`}
                icon={Coins}
            />

        </div>
    );
};

export default DashboardStats;