import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const loginMutation = useLogin();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-(--radius) border border-(--border) bg-(--surface) p-8 shadow-(--shadow) sm:p-12">

        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] gold-text">GOLDVEST</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-(--text)">
            Selamat Datang Kembali
          </h1>
          <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
            Masuk untuk mengakses portofolio emas digitalmu.
          </p>
        </div>

        <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))} className="space-y-5">

          {/* EMAIL */}
          <label className="block">
            <span className="text-xs text-(--text-secondary)">Email</span>
            <div className="relative mt-2">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
              />
              <input
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                className="input input-icon"
                {...register("email")}
              />
            </div>
          </label>

          {/* PASSWORD */}
          <label className="block">
            <span className="text-xs text-(--text-secondary)">Password</span>
            <div className="relative mt-2">
              <Lock
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
              />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="input input-icon input-icon-right"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) transition hover:text-(--text)"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="btn-primary w-full"
          >
            {loginMutation.isPending ? (
              "Memuat..."
            ) : (
              <>
                Masuk <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-(--text-secondary)">
          Belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-(--primary) hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;