import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = await createClient();
    const { data: upload, error: errorUpload } = await supabase.storage
      .from("invoices")
      .upload(file, "invoices");
    if (errorUpload) {
      return NextResponse.json({
        error: errorUpload.message,
        status: 500,
        isError: true,
      });
    }
    const { data: register, error: errorRegister } = await supabase.rpc("", {});
    if (errorRegister) {
      return NextResponse.json({
        error: errorRegister.message,
        status: 500,
        isError: true,
      });
    }
    return NextResponse.json({
      isError: false,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message,
      status: 500,
      isError: true,
    });
  }
}
