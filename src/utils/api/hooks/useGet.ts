import { useQuery } from "@tanstack/react-query";
import { getInvoiceDetailById } from "@/utils/api/endpoints/get";

type RequestGetInvoiceDetail = {
  id: string;
  enabled?: boolean;
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
