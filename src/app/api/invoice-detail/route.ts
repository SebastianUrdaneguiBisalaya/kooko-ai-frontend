import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(
      JSON.stringify({ error: "No se ha encontrado el ID de la factura." }),
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
  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
