import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const body = await request.json();
  const { user_id } = await params;
  const { phoneNumber, countryCode } = body;
  if (!user_id || !phoneNumber || !countryCode) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = await createClient();
    const { error: userExistError } = await supabase
      .from("users")
      .update({ user_phone: phoneNumber, user_country: countryCode })
      .eq("user_id", user_id);
    if (userExistError) {
      return NextResponse.json({
        error: userExistError.message,
        status: 500,
        isError: true,
      });
    }
    return NextResponse.json({
      message: "Datos actualizados con éxito.",
      status: 204,
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
