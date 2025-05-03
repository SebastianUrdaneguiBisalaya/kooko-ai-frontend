import requester from "@/utils/api/requester";

type RequestPostInvoiceData = {
  id_invoice: string;
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

export const postFiles = async (files: File) => {
  const formData = new FormData();
  formData.append("file", files);
  await requester.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postInvoiceData = async ({ ...data }: RequestPostInvoiceData) => {
  await requester.post("/invoice", data);
};
