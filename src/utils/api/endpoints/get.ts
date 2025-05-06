import { AxiosResponse } from "axios";
import requester from "@/utils/api/requester";

type RequestGetInvoiceDetail = {
  id: string;
};

type ResponseGetInvoiceDetail = {
  id: string;
  id_invoice: string;
  product_name: string;
  unit_price: number;
  quantity: number;
};

type RequestGetInvoicesSummary = {
  user_id: string;
};

type ResponseGetInvoicesSummary = {
  category_type: string;
  now_data: number;
  prev_data: number;
  pct_change: number;
};

export const getInvoiceDetailById = async ({
  id,
}: RequestGetInvoiceDetail): Promise<ResponseGetInvoiceDetail[]> => {
  const response: AxiosResponse<ResponseGetInvoiceDetail[]> =
    await requester.get(`/invoice-detail/${id}`);
  return response.data;
};

export const getInvoicesSummary = async ({
  user_id,
}: RequestGetInvoicesSummary): Promise<ResponseGetInvoicesSummary[]> => {
  const response: AxiosResponse<ResponseGetInvoicesSummary[]> =
    await requester.get(`/metrics/${user_id}`);
  return response.data;
};
