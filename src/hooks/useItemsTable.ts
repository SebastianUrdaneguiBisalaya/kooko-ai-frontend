import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";

type Item = {
  id: number;
  date: string;
  time: string;
  payment_date: string;
  currency_type: string;
  payment_method: string;
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

export const useItemsTable = () => {
  return useInfiniteQuery<ItemsResponse, Error>({
    queryKey: ["items"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      // const res = await axios.get<ItemsResponse>(
      //   `/api/items?page=${pageParam}&limit=10`
      // );
      console.log(pageParam);
      const data: ItemsResponse = {
        items: [
          {
            id: 1,
            date: "2023-01-01",
            time: "12:00",
            payment_date: "2023-01-01",
            currency_type: "EUR",
            payment_method: "Pago en efectivo",
            id_seller: "1",
            name_seller: "Seller 1",
            id_client: "1",
            name_client: "Client 1",
            address: "123 Main St",
            total: 100,
            recorded_operation: 10,
            igv: 10,
            isc: 10,
            unaffected: 10,
            exonerated: 10,
            export: 10,
            free: 10,
            discount: 10,
            others_charge: 10,
            others_taxes: 10,
          },
          {
            id: 2,
            date: "2023-01-01",
            time: "12:00",
            payment_date: "2023-01-01",
            currency_type: "EUR",
            payment_method: "Pago en efectivo",
            id_seller: "1",
            name_seller: "Seller 1",
            id_client: "1",
            name_client: "Client 1",
            address: "123 Main St",
            total: 100,
            recorded_operation: 10,
            igv: 10,
            isc: 10,
            unaffected: 10,
            exonerated: 10,
            export: 10,
            free: 10,
            discount: 10,
            others_charge: 10,
            others_taxes: 10,
          },
          {
            id: 3,
            date: "2023-01-01",
            time: "12:00",
            payment_date: "2023-01-01",
            currency_type: "EUR",
            payment_method: "Pago en efectivo",
            id_seller: "1",
            name_seller: "Seller 1",
            id_client: "1",
            name_client: "Client 1",
            address: "123 Main St",
            total: 100,
            recorded_operation: 10,
            igv: 10,
            isc: 10,
            unaffected: 10,
            exonerated: 10,
            export: 10,
            free: 10,
            discount: 10,
            others_charge: 10,
            others_taxes: 10,
          },
        ],
        hasMore: false,
      };
      // return res.data;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
};
