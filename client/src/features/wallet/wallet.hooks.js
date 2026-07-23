import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as walletApi from "../../api/wallet.api";

export const useWallet = () =>
  useQuery({
    queryKey: ["wallet"],
    queryFn: walletApi.getWallet,
  });

export const useWalletHistory = (params) =>
  useQuery({
    queryKey: ["wallet", "history", params],
    queryFn: () => walletApi.getWalletHistory(params),
  });

export const useTopUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: walletApi.topUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: walletApi.withdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
