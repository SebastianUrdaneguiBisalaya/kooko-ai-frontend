import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = process.env.API_KEY_ZOOTOOLS;
  let user;
  try {
    user = await request.json();
  } catch (error: unknown) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error al parsear el cuerpo del JSON." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
  const requestBody = {
    properties: {
      email: user.email,
    },
  };

  try {
    const response = await fetch("https://api.zootools.co/v1/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
    });
  } catch (error: unknown) {
    console.error("Error en la solicitud API.", error);
    return new Response(
      JSON.stringify({
        error: "Error en la solicitud API.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
