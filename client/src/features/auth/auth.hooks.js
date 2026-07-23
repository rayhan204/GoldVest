import { useMutation } from "@tanstack/react-query";
import * as authApi from "../../api/auth.api";

export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: authApi.register,
  });

export const useLogout = () =>
  useMutation({
    mutationFn: authApi.logout,
  });
