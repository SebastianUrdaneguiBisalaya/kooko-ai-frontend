import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function protectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/auth");
  }
  return data.user;
}
