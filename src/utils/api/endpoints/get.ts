import { AxiosResponse } from "axios";
import requester from "@/utils/api/requester";

type RequestGetTableData = {
  id_user: string;
};

type ResponseGetTableData = {
  id: string;
};

type RequestGetInvoiceDetail = {
  id: string;
};

type ResponseGetInvoiceDetail = {
  id: string;
};

type RequestGetTableDataByDateRange = {
  id_user: string;
  startDate: string;
  endDate: string;
};

type ResponseGetTableDataByDateRange = {
  id: string;
};

type RequestGetTableDataBySpecificRange = {
  id_user: string;
  startDate: string;
};

type ResponseGetTableDataBySpecificRange = {
  id: string;
};

export const getTableDataById = async ({
  id_user,
}: RequestGetTableData): Promise<ResponseGetTableData[]> => {
  const response: AxiosResponse<ResponseGetTableData[]> = await requester.get(
    `table/${id_user}`
  );
  return response.data;
};

export const getTableDataByDateRange = async ({
  id_user,
  startDate,
  endDate,
}: RequestGetTableDataByDateRange): Promise<
  ResponseGetTableDataByDateRange[]
> => {
  const response: AxiosResponse<ResponseGetTableDataByDateRange[]> =
    await requester.get(`table/${id_user}/date-range/${startDate}/${endDate}`);
  return response.data;
};

export const getTableDataBySpecificRange = async ({
  id_user,
  startDate,
}: RequestGetTableDataBySpecificRange): Promise<
  ResponseGetTableDataBySpecificRange[]
> => {
  const response: AxiosResponse<ResponseGetTableDataBySpecificRange[]> =
    await requester.get(`table/${id_user}/specific-range/${startDate}`);
  return response.data;
};

export const getInvoiceDetailById = async ({
  id,
}: RequestGetInvoiceDetail): Promise<ResponseGetInvoiceDetail> => {
  const response: AxiosResponse<ResponseGetInvoiceDetail> = await requester.get(
    `invoice-detail/${id}`
  );
  return response.data;
};
