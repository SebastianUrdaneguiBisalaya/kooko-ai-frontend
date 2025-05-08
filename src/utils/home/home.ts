import * as XLSX from "xlsx";
import { createClient } from "../supabase/client";

function roundedFloat(value: number, decimals: number) {
  return value.toFixed(decimals);
}

function downloadExcelFile<T>(data: T[], fileName: string) {
  if (data.length === 0) {
    alert("No hay datos para descargar.");
    return;
  }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

async function downloadStorageFile(
  url: string | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!url) {
    throw new Error("No se puede descargar el archivo. La URL no es válida.");
  }
  try {
    setIsLoading(true);
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("invoices")
      .download(`${url}`);
    if (error) {
      throw new Error(`No se puede descargar el archivo. ${error.message}`);
    }
    const blobUrl = window.URL.createObjectURL(data);
    const downloadFileName = "data.jpg";
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (error: unknown) {
    throw new Error(`Error al descargar archivo. ${error}`);
  } finally {
    setIsLoading(false);
  }
}

export { roundedFloat, downloadExcelFile, downloadStorageFile };
