import type { NextRequest } from "next/server";
import { validateEmailJoinWaitlist } from "@/utils/validate-email-joinwaitlist";

export async function POST(request: NextRequest) {
  const token = process.env.API_KEY_ZOOTOOLS;
  let user;
  try {
    user = await request.json();
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: `Error al parsear el cuerpo del JSON. ${error}`,
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
  if (!user.email) {
    return new Response(
      JSON.stringify({ error: "El campo 'email' es requerido." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  if (!validateEmailJoinWaitlist(user.email)) {
    return new Response(
      JSON.stringify({ error: "El correo ingresado no es válido." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
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
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: `Error en la solicitud API. ${error}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
