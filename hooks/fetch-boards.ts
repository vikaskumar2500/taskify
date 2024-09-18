"use client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useFetchBoards = () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");
  return useQuery({
    queryKey: ["fetch", "boards"],
    queryFn: async () => {
      return db.board.findMany({
        where: {
          orgId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  });
};
