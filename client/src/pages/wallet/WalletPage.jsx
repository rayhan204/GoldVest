import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Wallet as WalletIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
} from "lucide-react";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import Pagination from "../../components/common/Pagination";
import {
  useWallet,
  useWalletHistory,
  useTopUp,
  useWithdraw,
} from "../../features/wallet/wallet.hooks";
import { walletAmountSchema } from "../../features/wallet/wallet.schema";
import { zodResolver } from "../../utils/zodResolver";
import { formatCurrency, formatDateTime } from "../../utils/format";

const quickAmounts = [50000, 100000, 250000, 500000];

const AmountForm = ({ onSubmit, isLoading, submitLabel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(walletAmountSchema) });

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentAmount = watch("amount");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nominal (IDR)"
        type="number"
        placeholder="Contoh: 100000"
        error={errors.amount?.message}
        {...register("amount")}
      />
      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((amount) => (
          <button
            type="button"
            key={amount}
            onClick={() => setValue("amount", amount)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              Number(currentAmount) === amount
                ? "border-gold-500 bg-gold-100 text-gold-600"
                : "border-ink-950/15 text-ink-600 hover:border-gold-500"
            }`}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>
      <Button
        type="submit"
        variant="gold"
        className="w-full"
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

const typeBadge = {
  TOPUP: { label: "Top Up", variant: "profit" },
  WITHDRAW: { label: "Withdraw", variant: "loss" },
};

const WalletPage = () => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const limit = 10;

  const { data: walletRes, isLoading } = useWallet();
  const { data: historyRes, isLoading: isHistoryLoading } = useWalletHistory({
    page,
    limit,
  });

  const topUpMutation = useTopUp();
  const withdrawMutation = useWithdraw();

  const wallet = walletRes?.data;
  const history = historyRes?.data?.transactions || [];
  const total = historyRes?.data?.total || 0;
  const totalPage = Math.ceil(total / limit) || 1;

  const handleTopUp = (values) => {
    topUpMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Top up berhasil");
        setModal(null);
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Top up gagal"),
    });
  };

  const handleWithdraw = (values) => {
    withdrawMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Withdraw berhasil");
        setModal(null);
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Withdraw gagal"),
    });
  };

  if (isLoading) return <PageLoader label="Memuat wallet..." />;

  return (
    <div className="space-y-6">
      <Card bullion className="bg-ink-950 text-white">
        <CardBody className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-white/50">
              <WalletIcon className="size-4" />
              <p className="text-sm">Saldo Wallet</p>
            </div>
            <p className="font-mono-num mt-2 text-3xl font-bold text-gold-300 sm:text-4xl">
              {formatCurrency(wallet?.balance)}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="gold" onClick={() => setModal("topup")}>
              <ArrowDownToLine className="size-4" />
              Top Up
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setModal("withdraw")}
            >
              <ArrowUpFromLine className="size-4" />
              Withdraw
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="size-4 text-gold-600" />
            <p className="font-display text-base font-semibold text-ink-950">
              Riwayat Wallet
            </p>
          </div>

          {isHistoryLoading ? (
            <PageLoader label="Memuat riwayat..." />
          ) : history.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="Belum ada riwayat"
              description="Top up saldo pertama Anda untuk mulai berinvestasi emas."
            />
          ) : (
            <div className="space-y-1">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink-950/8 text-xs uppercase tracking-wide text-ink-600">
                      <th className="py-2.5 font-medium">Tipe</th>
                      <th className="py-2.5 font-medium">Nominal</th>
                      <th className="py-2.5 font-medium">Saldo Akhir</th>
                      <th className="py-2.5 font-medium">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-ink-950/5 last:border-0"
                      >
                        <td className="py-3">
                          <Badge variant={typeBadge[item.type]?.variant}>
                            {typeBadge[item.type]?.label || item.type}
                          </Badge>
                        </td>
                        <td className="font-mono-num py-3 text-ink-950">
                          {item.type === "WITHDRAW" ? "-" : "+"}
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="font-mono-num py-3 text-ink-600">
                          {formatCurrency(item.balance)}
                        </td>
                        <td className="py-3 text-ink-600">
                          {formatDateTime(item.createdAt)}
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

      <Modal
        open={modal === "topup"}
        onClose={() => setModal(null)}
        title="Top Up Saldo"
      >
        <AmountForm
          onSubmit={handleTopUp}
          isLoading={topUpMutation.isPending}
          submitLabel="Top Up Sekarang"
        />
      </Modal>

      <Modal
        open={modal === "withdraw"}
        onClose={() => setModal(null)}
        title="Tarik Saldo"
      >
        <AmountForm
          onSubmit={handleWithdraw}
          isLoading={withdrawMutation.isPending}
          submitLabel="Tarik Saldo"
        />
      </Modal>
    </div>
  );
};

export default WalletPage;
