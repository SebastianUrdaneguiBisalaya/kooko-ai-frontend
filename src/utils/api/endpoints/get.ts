import { AxiosResponse } from "axios";
import requester from "@/utils/api/requester";

type RequestGetInvoiceDetail = {
  id: string;
};

type ResponseGetInvoiceDetail = {
  item:
    | {
        id: string;
        id_invoice: string;
        product_name: string;
        unit_price: number;
        quantity: number;
      }[]
    | null;
  isError: boolean;
};

type RequestGetInvoicesSummary = {
  user_id: string;
};

type ResponseGetInvoicesSummary = {
  item:
    | {
        title: string;
        description: string;
        total: number;
        percentage: number;
      }[]
    | null;
  isError: boolean;
};

export const getInvoiceDetailById = async ({
  id,
}: RequestGetInvoiceDetail): Promise<ResponseGetInvoiceDetail> => {
  const response: AxiosResponse<ResponseGetInvoiceDetail> = await requester.get(
    `/invoice-detail/${id}`
  );
  return response.data;
};

export const getInvoicesSummary = async ({
  user_id,
}: RequestGetInvoicesSummary): Promise<ResponseGetInvoicesSummary> => {
  const response: AxiosResponse<ResponseGetInvoicesSummary> =
    await requester.get(`/metrics/${user_id}`);
  return response.data;
};
