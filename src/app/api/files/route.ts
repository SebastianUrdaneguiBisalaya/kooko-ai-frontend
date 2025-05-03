import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) {
    return new Response(
      JSON.stringify({ error: "No se ha encontrado el archivo." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST",
        },
      }
    );
  }
  return new Response(JSON.stringify({ file: file }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "POST",
    },
  });
}
