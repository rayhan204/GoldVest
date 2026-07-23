import { Link } from "react-router-dom";
import {
  Wallet as WalletIcon,
  Coins,
  TrendingUp,
  Sparkles,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatCard from "../../components/common/StatCard";
import { PageLoader } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { useDashboard } from "../../features/dashboard/dashboard.hooks";
import { useGoldPriceHistory } from "../../features/gold-price/goldPrice.hooks";
import useAuthStore from "../../store/auth.store";
import { formatCurrency, formatGram, formatDate } from "../../utils/format";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-ink-950/10 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs text-ink-600">{label}</p>
      <p className="font-mono-num text-sm font-semibold text-ink-950">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useDashboard();
  const { data: historyRes } = useGoldPriceHistory();

  const summary = data?.data;

  const chartData = (historyRes?.data || [])
    .slice(0, 14)
    .slice()
    .reverse()
    .map((item) => ({
      date: formatDate(item.effectiveDate || item.createdAt).replace(
        /\s\d{4}$/,
        ""
      ),
      sellPrice: Number(item.sellPrice),
    }));

  if (isLoading) return <PageLoader label="Menyiapkan dashboard..." />;

  if (isError || !summary) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Gagal memuat dashboard"
        description="Terjadi kesalahan saat mengambil ringkasan akun Anda. Silakan muat ulang halaman."
      />
    );
  }

  return (
    <div className="space-y-4">
      <Card bullion className="relative overflow-hidden bg-ink-950 text-white">
        <CardBody className="relative z-10 flex flex-col gap-4 py-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-white/50">Selamat datang,</p>
            <p className="font-display text-2xl font-semibold">
              {user?.fullName || "Investor"}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide text-white/40">
              Total kekayaan
            </p>
            <p className="font-mono-num text-3xl font-bold text-gold-300 sm:text-4xl">
              {formatCurrency(summary.totalWealth)}
            </p>
          </div>
          <Link to="/transactions">
            <Button variant="gold">
              <ArrowDownToLine className="size-4" />
              Beli Emas
            </Button>
          </Link>
        </CardBody>
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-gold-400), transparent 70%)",
          }}
        />
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Saldo Wallet"
          value={formatCurrency(summary.walletBalance)}
          icon={WalletIcon}
        />
        <StatCard
          label="Emas Dimiliki"
          value={formatGram(summary.goldOwned)}
          icon={Coins}
          tone="gold"
        />
        <StatCard
          label="Nilai Aset Emas"
          value={formatCurrency(summary.assetValue)}
          icon={TrendingUp}
        />
        <StatCard
          label="Harga Jual Hari Ini"
          value={formatCurrency(summary.sellPrice)}
          icon={Sparkles}
          hint={`Beli: ${formatCurrency(summary.buyPrice)}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold text-ink-950">
                  Tren Harga Emas
                </p>
                <p className="text-xs text-ink-600">
                  Harga jual dari catatan terbaru
                </p>
              </div>
            </div>
            {chartData.length > 1 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-gold-500)"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-gold-500)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(11,18,32,0.06)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#34456b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#34456b" }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tickFormatter={(v) =>
                        new Intl.NumberFormat("id-ID", {
                          notation: "compact",
                        }).format(v)
                      }
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="sellPrice"
                      stroke="var(--color-gold-600)"
                      strokeWidth={2}
                      fill="url(#goldFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                icon={Sparkles}
                title="Belum ada riwayat harga"
                description="Grafik tren akan muncul setelah tersedia lebih dari satu catatan harga emas."
              />
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="font-display text-base font-semibold text-ink-950">
                Aksi Cepat
              </p>
              <p className="text-xs text-ink-600">
                Kelola investasi emas Anda
              </p>
            </div>
            <div className="space-y-3">
              <Link to="/transactions" className="block">
                <Button variant="gold" className="w-full justify-start">
                  <ArrowDownToLine className="size-4" />
                  Beli Emas
                </Button>
              </Link>
              <Link to="/transactions" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpFromLine className="size-4" />
                  Jual Emas
                </Button>
              </Link>
              <Link to="/wallet" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <WalletIcon className="size-4" />
                  Top Up Wallet
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
