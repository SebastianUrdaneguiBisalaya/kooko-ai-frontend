import { useQuery } from "@tanstack/react-query";
import { updateUserDataById } from "@/utils/api/endpoints/patch";

type RequestPatchUserData = {
  id: string;
  phoneNumber: string;
  countryCode: string;
};

export const usePatchUserDataById = ({
  id,
  phoneNumber,
  countryCode,
}: RequestPatchUserData) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => updateUserDataById({ id, phoneNumber, countryCode }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
