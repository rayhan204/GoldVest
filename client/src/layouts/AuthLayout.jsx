import { Outlet } from "react-router-dom";
import { ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import Logo from "../components/common/Logo";
import heroImg from "../assets/hero.png";

const points = [
  {
    icon: TrendingUp,
    title: "Investasi mulai dari gram kecil",
    desc: "Beli dan jual emas digital secara real-time mengikuti harga pasar.",
  },
  {
    icon: Wallet,
    title: "Wallet terintegrasi",
    desc: "Top up saldo dan kelola dana investasi dalam satu dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Aman & transparan",
    desc: "Setiap transaksi tercatat rapi dengan riwayat yang bisa dipantau kapan saja.",
  },
];

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-950 p-10 lg:flex">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-gold-400), transparent 70%)",
          }}
        />
        <Logo dark />

        <div className="relative z-10 flex flex-col items-start gap-8">
          <img src={heroImg} alt="" className="h-40 w-40 opacity-90" />
          <div>
            <p className="font-display text-3xl font-semibold leading-tight text-white">
              Simpan kekayaan Anda
              <br />
              dalam bentuk emas digital.
            </p>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              GoldVest membantu Anda menabung emas dengan mudah, aman, dan
              transparan — kapan saja, di mana saja.
            </p>
          </div>

          <div className="space-y-5">
            {points.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-white/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/30">
          © {new Date().getFullYear()} GoldVest. Portofolio project.
        </p>
      </div>

      <div className="flex items-center justify-center bg-cream-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
