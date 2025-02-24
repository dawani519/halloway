import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// ✅ Create a new order (POST)
export async function POST(req: Request) {
  try {
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

// ✅ Get all orders (GET)
export async function GET() {
  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
