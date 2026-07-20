import useAuthStore from "../../store/auth.store";

const DashboardHeader = () => {

    const user = useAuthStore(state => state.user);

    const firstName =
        user?.fullName?.split(" ")[0] || "User";

    return (

        <div className="rounded-3xl bg-linear-to-r from-yellow-400 to-amber-500 p-8 text-white">

            <h1 className="text-4xl font-bold">

                Good Morning, {firstName} 👋

            </h1>

            <p className="mt-2">

                Welcome back to GoldVest Dashboard

            </p>

        </div>

    );

};

export default DashboardHeader;