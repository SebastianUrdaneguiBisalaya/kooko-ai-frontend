"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import requester from "@/utils/api/requester";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        }
        const accessToken = session?.access_token;
        const response = await requester.post(
          "/register-user",
          {
            user_id: user.id,
            user_email: user.email,
            user_full_name: user.user_metadata.full_name,
            user_avatar: user.user_metadata.avatar_url,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.isError) {
          return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        }
        const isNewUser = response.data.status === 201;
        const forwardedHost = request.headers.get("X-Forwarded-Host");
        const isLocalEnvironment = process.env.NODE_ENV === "development";
        const redirectUrl = isNewUser ? "/onboarding" : "/home";
        if (isLocalEnvironment) {
          return NextResponse.redirect(`${origin}${redirectUrl}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`${forwardedHost}${redirectUrl}`);
        } else {
          return NextResponse.redirect(`${origin}${redirectUrl}`);
        }
      } catch (error: unknown) {
        console.error(error);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
