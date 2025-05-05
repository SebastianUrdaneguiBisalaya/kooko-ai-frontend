import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ user_id: string }>;
  }
) {
  const { user_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const from = Number(searchParams.get("from"));
  const to = Number(searchParams.get("to"));
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (!user_id) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = await createClient();
    let query = supabase.from("invoices").select("*").eq("user_id", user_id);
    if (startDate && endDate) {
      query = query.gte("date", startDate).lte("date", endDate);
    }
    query = query.range(from, to).order("date", { ascending: false });
    const { data, error } = await query;
    if (error) {
      return NextResponse.json({
        error: error.message,
        status: 500,
        isError: true,
      });
    }
    return NextResponse.json({
      items: data || [],
      hasMore: data && data.length === to - from + 1,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message,
      status: 500,
      isError: true,
    });
  }
}
