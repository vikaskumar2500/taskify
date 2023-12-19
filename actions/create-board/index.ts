"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHtml] =
    image.split("|");

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHtml,
  });
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHtml
  )
    return {
      error: "Missing fileds, Failed to create board.",
    };

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        imageFullUrl,
        imageId,
        imageLinkHtml,
        imageThumbUrl,
        imageUserName,
        orgId,
      },
    });
  } catch (error) {
    return {
      error: "DataBase Error!",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
