import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type Item = {
  id: number;
  title: string;
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
      const res = await axios.get<ItemsResponse>(
        `/api/items?page=${pageParam}&limit=10`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
};
