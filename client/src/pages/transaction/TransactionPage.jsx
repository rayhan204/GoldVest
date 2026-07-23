import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Coins,
} from "lucide-react";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import Pagination from "../../components/common/Pagination";
import { cn } from "../../utils/cn";
import { zodResolver } from "../../utils/zodResolver";
import { tradeGramSchema } from "../../features/transaction/transaction.schema";
import {
  useBuyGold,
  useSellGold,
  useTransactionHistory,
} from "../../features/transaction/transaction.hooks";
import { useLatestGoldPrice } from "../../features/gold-price/goldPrice.hooks";
import { usePortofolio } from "../../features/portofolio/portofolio.hooks";
import {
  formatCurrency,
  formatGram,
  formatDateTime,
} from "../../utils/format";

const tabs = [
  { key: "BUY", label: "Beli Emas", icon: ArrowDownToLine },
  { key: "SELL", label: "Jual Emas", icon: ArrowUpFromLine },
];

const typeBadge = {
  BUY: { label: "Beli", variant: "profit" },
  SELL: { label: "Jual", variant: "loss" },
};

const TradeForm = ({ mode }) => {
  const { data: priceRes } = useLatestGoldPrice();
  const { data: portoRes } = usePortofolio();
  const buyMutation = useBuyGold();
  const sellMutation = useSellGold();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(tradeGramSchema) });

  // eslint-disable-next-line react-hooks/incompatible-library
  const gram = Number(watch("gram")) || 0;
  const price = priceRes?.data;
  const unitPrice = mode === "BUY" ? price?.buyPrice : price?.sellPrice;
  const estimatedTotal = gram * Number(unitPrice || 0);
  const ownedGold = Number(portoRes?.data?.totalGram || 0);

  const mutation = mode === "BUY" ? buyMutation : sellMutation;

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(
          mode === "BUY" ? "Pembelian emas berhasil" : "Penjualan emas berhasil"
        );
        reset({ gram: "" });
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Transaksi gagal"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between rounded-xl bg-cream-100 px-4 py-3 text-sm">
        <span className="text-ink-600">
          Harga {mode === "BUY" ? "beli" : "jual"} per gram
        </span>
        <span className="font-mono-num font-semibold text-ink-950">
          {formatCurrency(unitPrice)}
        </span>
      </div>

      {mode === "SELL" && (
        <div className="flex items-center justify-between rounded-xl bg-cream-100 px-4 py-3 text-sm">
          <span className="text-ink-600">Emas dimiliki</span>
          <span className="font-mono-num font-semibold text-ink-950">
            {formatGram(ownedGold)}
          </span>
        </div>
      )}

      <Input
        label="Berat emas (gram)"
        type="number"
        step="0.01"
        placeholder="Contoh: 1.5"
        error={errors.gram?.message}
        {...register("gram")}
      />

      <div className="rounded-xl border border-gold-500/30 bg-gold-100/50 px-4 py-3">
        <p className="text-xs text-ink-600">Estimasi total</p>
        <p className="font-mono-num text-xl font-bold text-ink-950">
          {formatCurrency(estimatedTotal)}
        </p>
      </div>

      <Button
        type="submit"
        variant="gold"
        className="w-full"
        isLoading={mutation.isPending}
      >
        {mode === "BUY" ? "Beli Sekarang" : "Jual Sekarang"}
      </Button>
    </form>
  );
};

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState("BUY");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const limit = 10;

  const { data: historyRes, isLoading } = useTransactionHistory({
    page,
    limit,
    ...(type && { type }),
  });

  const transactions = historyRes?.data?.transactions || [];
  const totalPage = historyRes?.data?.totalPage || 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 h-fit">
          <CardBody>
            <div className="mb-5 flex rounded-lg bg-cream-100 p-1">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors",
                    activeTab === key
                      ? "bg-white text-ink-950 shadow-sm"
                      : "text-ink-600 hover:text-ink-950"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
            <TradeForm mode={activeTab} />
          </CardBody>
        </Card>

        <Card className="lg:col-span-3">
          <CardBody>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <History className="size-4 text-gold-600" />
                <p className="font-display text-base font-semibold text-ink-950">
                  Riwayat Transaksi
                </p>
              </div>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
                className="w-40"
              >
                <option value="">Semua Tipe</option>
                <option value="BUY">Beli</option>
                <option value="SELL">Jual</option>
              </Select>
            </div>

            {isLoading ? (
              <PageLoader label="Memuat riwayat..." />
            ) : transactions.length === 0 ? (
              <EmptyState
                icon={Coins}
                title="Belum ada transaksi"
                description="Riwayat pembelian dan penjualan emas Anda akan muncul di sini."
              />
            ) : (
              <div className="space-y-1">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-950/8 text-xs uppercase tracking-wide text-ink-600">
                        <th className="py-2.5 font-medium">Tipe</th>
                        <th className="py-2.5 font-medium">Gram</th>
                        <th className="py-2.5 font-medium">Harga/gram</th>
                        <th className="py-2.5 font-medium">Total</th>
                        <th className="py-2.5 font-medium">Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-ink-950/5 last:border-0"
                        >
                          <td className="py-3">
                            <Badge variant={typeBadge[tx.type]?.variant}>
                              {typeBadge[tx.type]?.label || tx.type}
                            </Badge>
                          </td>
                          <td className="font-mono-num py-3 text-ink-950">
                            {formatGram(tx.gram)}
                          </td>
                          <td className="font-mono-num py-3 text-ink-600">
                            {formatCurrency(tx.pricePerGram)}
                          </td>
                          <td className="font-mono-num py-3 font-semibold text-ink-950">
                            {formatCurrency(tx.totalPrice)}
                          </td>
                          <td className="py-3 text-ink-600">
                            {formatDateTime(tx.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={page}
                  totalPage={totalPage}
                  onPageChange={setPage}
                />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TransactionPage;
