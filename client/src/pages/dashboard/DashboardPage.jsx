import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import GoldPriceCard from "../../components/dashboard/GoldPriceCard";
import QuickActions from "../../components/dashboard/QuickActions";

import { useDashboard } from "../../hooks/useDashboard";

const DashboardPage = () => {

    const {

        data,

        isLoading,

        isError,

    } = useDashboard();

    if (isLoading)
        return <h1>Loading...</h1>;

    if (isError)
        return <h1>Error loading dashboard.</h1>;

    const dashboard = data.data;

    return (

        <div className="space-y-6">

            <DashboardHeader />

            <DashboardStats data={dashboard} />

            <div className="grid gap-6 lg:grid-cols-2">

                <GoldPriceCard data={dashboard} />

                <QuickActions />

            </div>

        </div>

    );

};

export default DashboardPage;