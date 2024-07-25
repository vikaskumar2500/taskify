"use client";

import { List } from "@prisma/client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { execute: deleteExecute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`this ${data.title} deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: copyExecute } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`this ${data.title} deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    deleteExecute({ id, boardId });
  };

  const onCopyList = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    copyExecute({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3 bg-white" side="bottom">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          list Actions
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            asChild
            variant="ghost"
            size="sm"
          >
            <X className="w-3 h-3" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm "
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopyList}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
