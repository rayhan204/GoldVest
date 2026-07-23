import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../api/auth.api";
import useAuthStore from "../store/auth.store";

const useLogin = () => {
    const navigate = useNavigate();

    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: login,

        onSuccess: (response) => {
            const { user, accessToken, refreshToken } = response.data;

            setAuth({
                user,
                accessToken,
                refreshToken,
            });

            toast.success(response.message);

            navigate("/dashboard", {
                replace: true,
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Login gagal"
            );
        },
    });
};

export default useLogin;