import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ user_id: string }>;
  }
) {
  const { user_id } = await params;
  if (!user_id) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_invoice_summary", {
      user_id: user_id,
    });
    if (error) {
      return NextResponse.json({
        error: error.message,
        status: 500,
        isError: true,
      });
    }
    return NextResponse.json({
      item: data,
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
