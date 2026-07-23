import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as transactionApi from "../../api/transaction.api";

export const useTransactionHistory = (params) =>
  useQuery({
    queryKey: ["transactions", params],
    queryFn: () => transactionApi.getTransactionHistory(params),
  });

export const useBuyGold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionApi.buyGold,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["portofolio"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useSellGold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionApi.sellGold,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["portofolio"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
