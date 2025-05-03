import { useQuery } from "@tanstack/react-query";
import { postFiles, postInvoiceData } from "@/utils/api/endpoints/post";

type RequestPostInvoiceData = {
  id_invoice: string;
  date: string;
  time: string;
  payment_date: string;
  currency_type: string;
  payment_method: string;
  category_type: string;
  id_seller: string;
  name_seller: string;
  id_client: string;
  name_client: string;
  address: string;
  total: number;
  recorded_operation: number;
  igv: number;
  isc: number;
  unaffected: number;
  exonerated: number;
  export: number;
  free: number;
  discount: number;
  others_charge: number;
  others_taxes: number;
};

export const usePostFiles = (files: File) => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => postFiles(files),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const usePostInvoiceData = (data: RequestPostInvoiceData) => {
  return useQuery({
    queryKey: ["invoice"],
    queryFn: () => postInvoiceData(data),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
