import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as userApi from "../../api/user.api";
import useAuthStore from "../../store/auth.store";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (res?.data) {
        setUser(res.data);
      }
    },
  });
};

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: userApi.updatePassword,
  });

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: userApi.updateAvatar,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (res?.data) {
        setUser(res.data);
      }
    },
  });
};
