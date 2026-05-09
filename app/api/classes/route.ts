export const dynamic = 'force-dynamic';

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { name, order } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Class name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("classes")
      .insert([{ name, order: order || 0 }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}