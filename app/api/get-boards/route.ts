"use server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await db.board.findMany({
      select: {
        id: true,
        createdAt: true,
        imageFullUrl: true,
        imageId: true,
        imageLinkHtml: true,
        imageThumbUrl: true,
        imageUserName: true,
        orgId: true,
        title: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
