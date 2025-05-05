import { AxiosResponse } from "axios";
import requester from "@/utils/api/requester";

type RequestGetInvoiceDetail = {
  id: string;
};

type ResponseGetInvoiceDetail = {
  id: string;
};

export const getInvoiceDetailById = async ({
  id,
}: RequestGetInvoiceDetail): Promise<ResponseGetInvoiceDetail> => {
  const response: AxiosResponse<ResponseGetInvoiceDetail> = await requester.get(
    `invoice-detail/${id}`
  );
  return response.data;
};
