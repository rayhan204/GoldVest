import { Bell } from "lucide-react";

const Topbar = () => {
    return (
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">

            <div>

                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>

                <p className="text-gray-500">
                    Welcome back 👋
                </p>

            </div>

            <div className="flex items-center gap-5">

                <Bell className="cursor-pointer" />

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-yellow-400" />

                    <div>

                        <p className="font-semibold">

                            Rayhan

                        </p>

                        <span className="text-sm text-gray-500">

                            USER

                        </span>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Topbar;