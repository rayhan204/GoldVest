import {
    LayoutDashboard,
    Wallet,
    Gem,
    ArrowLeftRight,
    User,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Wallet",
        path: "/wallet",
        icon: Wallet,
    },
    {
        name: "Portfolio",
        path: "/portofolios",
        icon: Gem,
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: ArrowLeftRight,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: User,
    },
];

const Sidebar = () => {
    return (
        <aside className="w-72 bg-slate-900 text-white flex flex-col">

            <div className="h-20 flex items-center justify-center border-b border-slate-800">

                <h1 className="text-2xl font-bold text-yellow-400">
                    GoldVest
                </h1>

            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition
                                ${
                                    isActive
                                        ? "bg-yellow-500 text-black"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >
                            <Icon size={20} />

                            {menu.name}
                        </NavLink>
                    );
                })}
            </nav>

            <button className="m-4 flex items-center gap-3 rounded-xl bg-red-500 px-4 py-3 hover:bg-red-600">

                <LogOut size={20} />

                Logout

            </button>

        </aside>
    );
};

export default Sidebar;