"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-model";
import { fetcher } from "@/lib/fetcher";
import { CardWithLists } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CardHeader } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
  const { id, isOpen, onClose, onOpen } = useCardModal((state) => state);
  console.log("id", id);

  const { data: cardData } = useQuery<CardWithLists>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <CardHeader data={cardData} /> : <CardHeader.Skeleton />}
        <div className="grid grid-cols-4 gap-6 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          <div className="col-span-1">
            {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
