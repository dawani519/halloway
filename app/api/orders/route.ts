import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseBrowserClient(); // ✅ Use the Server Client
    const { user_id, tracking_number, destination } = await req.json();

    const { data, error } = await supabase.from("orders").insert([
      { user_id, tracking_number, destination, status: "Pending" },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.from("orders").select("*");

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
