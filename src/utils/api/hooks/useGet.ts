import { useQuery } from "@tanstack/react-query";
import {
  getTableDataById,
  getTableDataByDateRange,
  getTableDataBySpecificRange,
  getInvoiceDetailById,
} from "@/utils/api/endpoints/get";

type RequestGetTableData = {
  id_user: string;
};

type RequestGetInvoiceDetail = {
  id: string;
};

type RequestGetTableDataByDateRange = {
  id_user: string;
  startDate: string;
  endDate: string;
};

type RequestGetTableDataBySpecificRange = {
  id_user: string;
  startDate: string;
};

export const useGetTableDataById = ({ id_user }: RequestGetTableData) => {
  return useQuery({
    queryKey: ["table", id_user],
    queryFn: () => getTableDataById({ id_user }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetTableDataByDateRange = ({
  id_user,
  startDate,
  endDate,
}: RequestGetTableDataByDateRange) => {
  return useQuery({
    queryKey: ["table", id_user, "date-range", startDate, endDate],
    queryFn: () => getTableDataByDateRange({ id_user, startDate, endDate }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetTableDataBySpecificRange = ({
  id_user,
  startDate,
}: RequestGetTableDataBySpecificRange) => {
  return useQuery({
    queryKey: ["table", id_user, "specific-range", startDate],
    queryFn: () => getTableDataBySpecificRange({ id_user, startDate }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceDetailById = ({ id }: RequestGetInvoiceDetail) => {
  return useQuery({
    queryKey: ["invoice-detail", id],
    queryFn: () => getInvoiceDetailById({ id }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
