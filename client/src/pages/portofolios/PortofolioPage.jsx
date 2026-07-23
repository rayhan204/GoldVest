import { Link } from "react-router-dom";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Scale,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/common/StatCard";
import { PageLoader } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { usePortofolio } from "../../features/portofolio/portofolio.hooks";
import {
  formatCurrency,
  formatGram,
  formatPercent,
} from "../../utils/format";

const PortofolioPage = () => {
  const { data, isLoading, isError } = usePortofolio();
  const portofolio = data?.data;

  if (isLoading) return <PageLoader label="Memuat portofolio..." />;

  if (isError || !portofolio) {
    return (
      <EmptyState
        icon={Coins}
        title="Gagal memuat portofolio"
        description="Terjadi kesalahan saat mengambil data portofolio Anda."
      />
    );
  }

  const isProfit = portofolio.profitLoss >= 0;

  if (Number(portofolio.totalGram) === 0) {
    return (
      <EmptyState
        icon={Coins}
        title="Anda belum memiliki emas"
        description="Mulai investasi emas pertama Anda sekarang dan pantau pertumbuhannya di sini."
        action={
          <Link to="/transactions">
            <Button variant="gold">
              <ArrowDownToLine className="size-4" />
              Beli Emas Sekarang
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card bullion className="bg-ink-950 text-white">
        <CardBody className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/50">
                <Coins className="size-4" />
                <p className="text-sm">Total Emas Dimiliki</p>
              </div>
              <p className="font-mono-num mt-2 text-3xl font-bold text-gold-300 sm:text-4xl">
                {formatGram(portofolio.totalGram)}
              </p>
              <p className="mt-1 text-sm text-white/50">
                Setara {formatCurrency(portofolio.currentValue)}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/transactions">
                <Button variant="gold">
                  <ArrowDownToLine className="size-4" />
                  Beli
                </Button>
              </Link>
              <Link to="/transactions">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowUpFromLine className="size-4" />
                  Jual
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Harga Beli Rata-rata"
          value={formatCurrency(portofolio.averageBuyPrice)}
          icon={Scale}
        />
        <StatCard
          label="Total Investasi"
          value={formatCurrency(portofolio.totalInvestment)}
          icon={Coins}
        />
        <StatCard
          label="Nilai Saat Ini"
          value={formatCurrency(portofolio.currentValue)}
          icon={TrendingUp}
          tone="gold"
        />
        <StatCard
          label="Untung / Rugi"
          value={formatCurrency(portofolio.profitLoss)}
          icon={isProfit ? TrendingUp : TrendingDown}
          tone={isProfit ? "profit" : "loss"}
          hint={
            <Badge variant={isProfit ? "profit" : "loss"}>
              {formatPercent(portofolio.profitLossPercentage)}
            </Badge>
          }
        />
      </div>

      <Card>
        <CardBody>
          <p className="font-display text-base font-semibold text-ink-950">
            Harga Pasar Saat Ini
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-cream-100 p-4">
              <p className="text-xs text-ink-600">Harga Beli</p>
              <p className="font-mono-num mt-1 text-lg font-semibold text-ink-950">
                {formatCurrency(portofolio.currentBuyPrice)}
              </p>
            </div>
            <div className="rounded-xl bg-cream-100 p-4">
              <p className="text-xs text-ink-600">Harga Jual</p>
              <p className="font-mono-num mt-1 text-lg font-semibold text-ink-950">
                {formatCurrency(portofolio.currentSellPrice)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PortofolioPage;
