import { useInfiniteQuery } from "@tanstack/react-query";
import requester from "@/utils/api/requester";

type Item = {
  id: number;
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

type ItemsResponse = {
  items: Item[];
  hasMore: boolean;
};

const PAGE_SIZE = 20;

export const useItemsTable = (
  user_id: string,
  dateRange?: { startDate: string | null; endDate: string | null }
) => {
  return useInfiniteQuery<ItemsResponse, Error>({
    queryKey: ["invoices", dateRange?.startDate, dateRange?.endDate],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const from = (pageParam as number) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      let url = `/table/${user_id}?from=${from}&to=${to}`;
      if (dateRange?.startDate && dateRange?.endDate) {
        url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }
      if (dateRange?.startDate && !dateRange?.endDate) {
        url += `&startDate=${dateRange.startDate}`;
      }
      const res = await requester.get<ItemsResponse>(url);
      console.log(res);
      console.log(pageParam);
      const hasMore = res.data.items.length === PAGE_SIZE;
      return {
        items: res.data.items,
        hasMore,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    refetchOnWindowFocus: false,
  });
};
