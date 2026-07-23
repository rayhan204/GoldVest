import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";

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
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const onSubmit = (data) => {
        registerMutation.mutate({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        });
    };

    return (
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">

            <div className="mb-8">

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
                    GoldVest
                </p>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">
                    Buat Akun Baru
                </h1>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                    Daftar sekarang dan mulai investasi emas
                    digital dengan mudah dan aman.
                </p>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* FULL NAME */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Nama Lengkap
                    </label>

                    <div className="relative">

                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Rayhan Ghozali"
                            autoComplete="name"
                            {...register("fullName", {
                                required:
                                    "Nama lengkap wajib diisi",
                            })}
                            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
                        />

                    </div>

                    {errors.fullName && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.fullName.message}
                        </p>
                    )}

                </div>

                {/* EMAIL */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email
                    </label>

                    <div className="relative">

                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="email"
                            placeholder="rayhan@gmail.com"
                            autoComplete="email"
                            {...register("email", {
                                required:
                                    "Email wajib diisi",
                            })}
                            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
                        />

                    </div>

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                </div>

                {/* PASSWORD */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            placeholder="••••••••"
                            {...register("password", {
                                required:
                                    "Password wajib diisi",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Minimal 8 karakter",
                                },
                            })}
                            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-yellow-500"
                        >

                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}

                        </button>

                    </div>

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Konfirmasi Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            placeholder="••••••••"
                            {...register(
                                "confirmPassword",
                                {
                                    required:
                                        "Konfirmasi password wajib diisi",
                                    validate: (
                                        value
                                    ) =>
                                        value ===
                                            password ||
                                        "Password tidak sama",
                                }
                            )}
                            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-yellow-500"
                        >

                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}

                        </button>

                    </div>

                    {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">
                            {
                                errors
                                    .confirmPassword
                                    .message
                            }
                        </p>
                    )}

                </div>

                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="flex w-full items-center justify-center rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-70"
                >

                    {registerMutation.isPending ? (
                        "Loading..."
                    ) : (
                        <>
                            Buat Akun
                            <ArrowRight
                                size={18}
                                className="ml-2"
                            />
                        </>
                    )}

                </button>

            </form>

            <p className="mt-8 text-center text-sm text-slate-500">

                Sudah punya akun?

                <Link
                    to="/login"
                    className="ml-1 font-semibold text-yellow-600 hover:underline"
                >
                    Login
                </Link>

            </p>

        </div>
    );
};

export default RegisterPage;