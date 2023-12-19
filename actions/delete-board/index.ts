"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  console.log("organizatioId", orgId);

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { id } = data;
  let board: any;

  try {
    board = await db.board.delete({
      where: { id },
    });
  } catch (error) {
    return { error: "Failed to Delete" };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
