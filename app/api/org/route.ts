import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    throw new Error("a");
    // const data = await db.board.findMany({});
    return NextResponse.json("Return!");
  } catch (error) {
    return NextResponse.json("Error");
  }
};
