import { NextResponse } from "next/server";
import { createClientCustom } from "@/utils/supabase/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { user_id, user_email, user_full_name, user_avatar } = body;
  const token = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!user_id || !user_email || !user_full_name || !user_avatar || !token) {
    return NextResponse.json({
      error: "Faltan datos obligatorios.",
      status: 400,
      isError: true,
    });
  }
  try {
    const supabase = createClientCustom({ accessToken: token });
    const { data: userExist, error: userExistError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id);
    if (userExistError) {
      return NextResponse.json({
        error: userExistError.message,
        status: 500,
        isError: true,
      });
    }
    if (userExist.length > 0) {
      return NextResponse.json({
        message: "El usuario ya existe.",
        status: 200,
      });
    }
    const { error: createdUserError } = await supabase.from("users").insert({
      user_id,
      user_email,
      user_full_name,
      user_avatar,
    });
    if (createdUserError) {
      return NextResponse.json({
        error: createdUserError.message,
        status: 500,
        isError: true,
      });
    }
    return NextResponse.json({
      message: "Usuario creado con éxito.",
      status: 201,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message,
      status: 500,
      isError: true,
    });
  }
}
