import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Coins } from "lucide-react";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import {
  useGoldPriceHistory,
  useCreateGoldPrice,
  useUpdateGoldPrice,
  useDeleteGoldPrice,
} from "../../features/gold-price/goldPrice.hooks";
import { goldPriceSchema } from "../../features/gold-price/goldPrice.schema";
import { zodResolver } from "../../utils/zodResolver";
import { formatCurrency, formatDateTime } from "../../utils/format";

const toDateInputValue = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return new Date(value).toISOString().slice(0, 10);
};

const GoldPricePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useGoldPriceHistory();
  const createMutation = useCreateGoldPrice();
  const updateMutation = useUpdateGoldPrice();
  const deleteMutation = useDeleteGoldPrice();

  const history = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(goldPriceSchema) });

  useEffect(() => {
    if (modalOpen) {
      reset({
        buyPrice: editing?.buyPrice ?? "",
        sellPrice: editing?.sellPrice ?? "",
        effectiveDate: toDateInputValue(editing?.effectiveDate),
      });
    }
  }, [modalOpen, editing, reset]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setModalOpen(true);
  };

  const onSubmit = (values) => {
    const payload = {
      ...values,
      effectiveDate: new Date(values.effectiveDate).toISOString(),
    };

    const mutation = editing ? updateMutation : createMutation;
    const args = editing ? { id: editing.id, data: payload } : payload;

    mutation.mutate(args, {
      onSuccess: () => {
        toast.success(
          editing ? "Harga emas berhasil diperbarui" : "Harga emas berhasil ditambahkan"
        );
        setModalOpen(false);
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Gagal menyimpan harga emas"),
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Hapus data harga emas ini?")) return;

    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Harga emas berhasil dihapus"),
      onError: (err) =>
        toast.error(err.response?.data?.message || "Gagal menghapus data"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-600">
          Kelola harga beli dan jual emas yang berlaku di platform.
        </p>
        <Button variant="gold" onClick={openCreate}>
          <Plus className="size-4" />
          Tambah Harga
        </Button>
      </div>

      <Card>
        <CardBody>
          {isLoading ? (
            <PageLoader label="Memuat data harga..." />
          ) : history.length === 0 ? (
            <EmptyState
              icon={Coins}
              title="Belum ada data harga emas"
              description="Tambahkan harga emas pertama untuk mulai mengaktifkan transaksi."
              action={
                <Button variant="gold" onClick={openCreate}>
                  <Plus className="size-4" />
                  Tambah Harga
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-950/8 text-xs uppercase tracking-wide text-ink-600">
                    <th className="py-2.5 font-medium">Harga Beli</th>
                    <th className="py-2.5 font-medium">Harga Jual</th>
                    <th className="py-2.5 font-medium">Berlaku</th>
                    <th className="py-2.5 font-medium">Dibuat</th>
                    <th className="py-2.5 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-ink-950/5 last:border-0"
                    >
                      <td className="font-mono-num py-3 text-ink-950">
                        {formatCurrency(item.buyPrice)}
                      </td>
                      <td className="font-mono-num py-3 text-ink-950">
                        {formatCurrency(item.sellPrice)}
                      </td>
                      <td className="py-3 text-ink-600">
                        {formatDateTime(item.effectiveDate)}
                      </td>
                      <td className="py-3 text-ink-600">
                        {formatDateTime(item.createdAt)}
                      </td>
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="rounded-lg p-2 text-ink-600 hover:bg-gold-100 hover:text-gold-600"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg p-2 text-ink-600 hover:bg-loss-500/10 hover:text-loss-600"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Ubah Harga Emas" : "Tambah Harga Emas"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Harga Beli (IDR)"
            type="number"
            error={errors.buyPrice?.message}
            {...register("buyPrice")}
          />
          <Input
            label="Harga Jual (IDR)"
            type="number"
            error={errors.sellPrice?.message}
            {...register("sellPrice")}
          />
          <Input
            label="Tanggal Berlaku"
            type="date"
            error={errors.effectiveDate?.message}
            {...register("effectiveDate")}
          />
          <Button
            type="submit"
            variant="gold"
            className="w-full"
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            {editing ? "Simpan Perubahan" : "Tambah Harga"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default GoldPricePage;
