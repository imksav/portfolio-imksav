import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request) {
  try {
    // 1. Get the data sent from the frontend
    const body = await request.json();

    // 2. Destructure all fields, including the new 'phone'
    const { name, email, phone, message } = body;

    // 3. Validation: Check that required fields are present
    // Note: We do NOT check for 'phone' because it is optional
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // 4. Save to Supabase
    // We pass the object keys exactly matching the database column names
    const { error } = await supabase.from("messages").insert([
      {
        name,
        email,
        phone, // This will save null if the user didn't type anything
        message,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }

    // 5. Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
