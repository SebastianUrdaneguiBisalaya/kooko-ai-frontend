import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id_user = searchParams.get("id_user");
  if (!id_user) {
    return new Response(
      JSON.stringify({ error: "No se ha encontrado el ID del usuario." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
  return new Response(JSON.stringify({ id_user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
