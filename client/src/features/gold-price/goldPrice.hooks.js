import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as goldPriceApi from "../../api/goldPrice.api";

export const useLatestGoldPrice = () =>
  useQuery({
    queryKey: ["gold-price", "latest"],
    queryFn: goldPriceApi.getLatestGoldPrice,
    refetchInterval: 60_000,
  });

export const useGoldPriceHistory = () =>
  useQuery({
    queryKey: ["gold-price", "history"],
    queryFn: goldPriceApi.getGoldPriceHistory,
  });

const useInvalidateGoldPrice = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["gold-price"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    queryClient.invalidateQueries({ queryKey: ["portofolio"] });
  };
};

export const useCreateGoldPrice = () => {
  const invalidate = useInvalidateGoldPrice();
  return useMutation({
    mutationFn: goldPriceApi.createGoldPrice,
    onSuccess: invalidate,
  });
};

export const useUpdateGoldPrice = () => {
  const invalidate = useInvalidateGoldPrice();
  return useMutation({
    mutationFn: goldPriceApi.updateGoldPrice,
    onSuccess: invalidate,
  });
};

export const useDeleteGoldPrice = () => {
  const invalidate = useInvalidateGoldPrice();
  return useMutation({
    mutationFn: goldPriceApi.deleteGoldPrice,
    onSuccess: invalidate,
  });
};
