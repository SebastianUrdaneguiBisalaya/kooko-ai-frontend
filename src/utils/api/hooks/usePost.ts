import { useQuery } from "@tanstack/react-query";
import {
  postFiles,
  postInvoiceData,
  postInvoiceProductsData,
} from "@/utils/api/endpoints/post";

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

type RequestPostProductData = {
  id_invoice: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
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

export const usePostInvoiceProductsData = (data: RequestPostProductData) => {
  return useQuery({
    queryKey: ["invoice-products"],
    queryFn: () => postInvoiceProductsData(data),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
