import { useQuery } from "@tanstack/react-query";
import { getPortofolio } from "../../api/portofolio.api";

export const usePortofolio = () =>
  useQuery({
    queryKey: ["portofolio"],
    queryFn: getPortofolio,
  });
