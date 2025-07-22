import { useMutation } from "@tanstack/react-query";
import { updateUserDataById } from "@/utils/api/endpoints/patch";

export const usePatchUserDataById = () => {
  return useMutation({
    mutationFn: updateUserDataById,
  });
};
