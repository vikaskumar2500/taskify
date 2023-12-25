"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormSubmit } from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const proModal = useProModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success("Board created!");
      router.push(`/board/${data.id}`);
    },
    onError: (error: any) => {
      console.log("errors", error);

      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    console.log("image", image);

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant={"ghost"}
            ref={closeRef}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          <div className="space-y-4 mb-2">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
