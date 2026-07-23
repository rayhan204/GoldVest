import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import useAuthStore from "../store/auth.store";
import { useLogout } from "../features/auth/auth.hooks";

const titleMap = [
  { match: /^\/$/, title: "Dashboard" },
  { match: /^\/wallet/, title: "Wallet" },
  { match: /^\/portofolios/, title: "Portofolio" },
  { match: /^\/transactions/, title: "Transaksi" },
  { match: /^\/profile/, title: "Profil" },
  { match: /^\/admin\/gold-prices/, title: "Kelola Harga Emas" },
];

const getTitle = (pathname) =>
  titleMap.find(({ match }) => match.test(pathname))?.title || "GoldVest";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshToken, logout } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(refreshToken, {
      onSettled: () => {
        logout();
        toast.success("Anda telah keluar");
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-cream-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={getTitle(location.pathname)}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
