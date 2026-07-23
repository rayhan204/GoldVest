import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    Mail,
    Lock,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";

import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
    const loginMutation = useLogin();

    const { register, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-xl md:p-10">

            <div className="mb-8">

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
                    GoldVest
                </p>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">
                    Selamat Datang
                    <br />
                    Kembali
                </h1>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                    Masuk untuk mengakses portofolio emas digitalmu.
                </p>

            </div>

            <form
                onSubmit={handleSubmit((data) =>
                    loginMutation.mutate(data)
                )}
                className="space-y-6"
            >

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
                            {...register("email")}
                            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100"
                        />

                    </div>

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
                            autoComplete="current-password"
                            placeholder="••••••••"
                            {...register("password")}
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

                </div>

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="flex w-full items-center justify-center rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-70"
                >

                    {loginMutation.isPending ? (
                        "Loading..."
                    ) : (
                        <>
                            Masuk
                            <ArrowRight
                                size={18}
                                className="ml-2"
                            />
                        </>
                    )}

                </button>

            </form>

            <p className="mt-8 text-center text-sm text-slate-500">

                Belum punya akun?

                <Link
                    to="/register"
                    className="ml-1 font-semibold text-yellow-600 hover:underline"
                >
                    Daftar
                </Link>

            </p>

        </div>
    );
};

export default LoginPage;