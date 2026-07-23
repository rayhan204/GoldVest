import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../api/auth.api";

const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: register,

        onSuccess: (response) => {
            toast.success(response.message);

            navigate("/login", {
                replace: true,
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Register gagal"
            );
        },
    });
};

export default useRegister;