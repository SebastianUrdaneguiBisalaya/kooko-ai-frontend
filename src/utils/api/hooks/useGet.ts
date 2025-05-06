import { useQuery } from "@tanstack/react-query";
import {
  getInvoiceDetailById,
  getInvoicesSummary,
} from "@/utils/api/endpoints/get";

type RequestGetInvoiceDetail = {
  id: string;
  enabled?: boolean;
};

type RequestGetInvoicesSummary = {
  user_id: string;
};

export const useGetInvoiceDetailById = ({
  id,
  enabled = true,
}: RequestGetInvoiceDetail) => {
  return useQuery({
    queryKey: ["invoice-detail", id],
    queryFn: () => getInvoiceDetailById({ id }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: enabled && !!id,
  });
};

export const useGetInvoicesSummary = ({
  user_id,
}: RequestGetInvoicesSummary) => {
  return useQuery({
    queryKey: ["invoices-summary", user_id],
    queryFn: () => getInvoicesSummary({ user_id: user_id }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
