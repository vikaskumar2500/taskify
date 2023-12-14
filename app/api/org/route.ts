import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await db.board.findFirst({
    where: { title: "Test" },
  });
  return NextResponse.json(data, { status: 200 });
};
