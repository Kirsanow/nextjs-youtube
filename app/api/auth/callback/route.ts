import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(
    request.nextUrl.searchParams.get("code") ?? ""
  );

  if (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.redirect(new URL("/tools", request.url));
}
