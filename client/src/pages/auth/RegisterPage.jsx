import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

import useRegister from "../../hooks/useRegister";

const RegisterPage = () => {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    registerMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className=" flex items-left justify-center px-6 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-(--radius) border border-(--border) bg-(--surface) p-8 shadow-(--shadow) sm:p-12">

        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] gold-text">GOLDVEST</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-(--text)">
            Buat Akun Baru
          </h1>
          <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
            Daftar sekarang dan mulai investasi emas digital dengan mudah dan aman.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* FULL NAME */}
          <label className="block">
            <span className="text-xs text-(--text-secondary)">Nama Lengkap</span>
            <div className="relative mt-2">
              <User
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
              />
              <input
                type="text"
                autoComplete="name"
                placeholder="Rayhan"
                className="input input-icon"
                {...register("fullName", { required: "Nama lengkap wajib diisi" })}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-(--danger)">{errors.fullName.message}</p>
            )}
          </label>

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
                {...register("email", { required: "Email wajib diisi" })}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-(--danger)">{errors.email.message}</p>
            )}
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
                autoComplete="new-password"
                placeholder="••••••••"
                className="input input-icon input-icon-right"
                {...register("password", {
                  required: "Password wajib diisi",
                  minLength: { value: 8, message: "Minimal 8 karakter" },
                })}
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
            {errors.password && (
              <p className="mt-1.5 text-xs text-(--danger)">{errors.password.message}</p>
            )}
          </label>

          {/* CONFIRM PASSWORD */}
          <label className="block">
            <span className="text-xs text-(--text-secondary)">Konfirmasi Password</span>
            <div className="relative mt-2">
              <Lock
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="input input-icon input-icon-right"
                {...register("confirmPassword", {
                  required: "Konfirmasi password wajib diisi",
                  validate: (value) => value === password || "Password tidak sama",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) transition hover:text-(--text)"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-(--danger)">{errors.confirmPassword.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="btn-primary w-full"
          >
            {registerMutation.isPending ? (
              "Memuat..."
            ) : (
              <>
                Buat Akun <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-(--text-secondary)">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-semibold text-(--primary) hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;