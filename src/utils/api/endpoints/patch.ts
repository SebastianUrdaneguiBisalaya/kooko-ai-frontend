import requester from "@/utils/api/requester";

type RequestPatchUserData = {
  id: string;
  phoneNumber: string;
  countryCode: string;
};

export const updateUserDataById = async ({
  id,
  phoneNumber,
  countryCode,
}: RequestPatchUserData) => {
  await requester.patch(`users/${id}`, {
    phoneNumber,
    countryCode,
  });
};
