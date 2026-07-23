import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  ArrowLeftRight,
  UserRound,
  Coins,
  X,
  LogOut,
} from "lucide-react";
import Logo from "../common/Logo";
import { cn } from "../../utils/cn";
import useAuthStore from "../../store/auth.store";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/portofolios", label: "Portofolios", icon: PieChart },
  { to: "/transactions", label: "Transaksi", icon: ArrowLeftRight },
  { to: "/profile", label: "Profil", icon: UserRound },
];

const adminItem = {
  to: "/admin/gold-prices",
  label: "Harga Emas",
  icon: Coins,
};

const Sidebar = ({ open, onClose, onLogout }) => {
  const user = useAuthStore((state) => state.user);
  const items =
    user?.role === "ADMIN" ? [...navItems, adminItem] : navItems;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ink-950 transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Logo dark />
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gold-200 hover:bg-white/5 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gold-500/15 text-gold-300"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <Icon className="size-4.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500/20 font-display text-sm font-semibold text-gold-300">
              {user?.fullName?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {user?.fullName || "Pengguna"}
              </p>
              <p className="truncate text-xs text-white/50">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-loss-500/10 hover:text-loss-500"
          >
            <LogOut className="size-4.5" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
