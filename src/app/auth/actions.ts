"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { config } from "@/config/config";

export async function SignInWithGoogle() {
  const supabase = await createClient();
  const auth_callback_url = `${config.path_development}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });
  if (error) {
    console.error(error);
    return redirect("/auth");
  }
  if (data && data.url) {
    return redirect(data.url);
  }
}

export async function SignOutWithGoogle() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth");
}
