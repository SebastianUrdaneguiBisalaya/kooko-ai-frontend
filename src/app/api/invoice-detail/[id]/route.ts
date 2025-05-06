import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("").select("");
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
