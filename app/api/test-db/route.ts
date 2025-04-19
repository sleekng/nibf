import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();
    try {
      // Test the connection by executing a simple query
      const [result] = await connection.execute("SELECT 1 as test");
      
      return NextResponse.json(
        { 
          message: "Database connection successful",
          result
        },
        { status: 200 }
      );
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    );
  }
} 