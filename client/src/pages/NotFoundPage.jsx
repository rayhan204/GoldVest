import { Link } from "react-router-dom";
import { Coins } from "lucide-react";
import Button from "../components/ui/Button";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-50 px-6 text-center">
    <div className="flex size-16 items-center justify-center rounded-full bg-gold-100 text-gold-600">
      <Coins className="size-8" />
    </div>
    <p className="font-display text-5xl font-bold text-ink-950">404</p>
    <p className="max-w-sm text-sm text-ink-600">
      Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.
    </p>
    <Link to="/">
      <Button variant="gold">Kembali ke Dashboard</Button>
    </Link>
  </div>
);

export default NotFoundPage;
